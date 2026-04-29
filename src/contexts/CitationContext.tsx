import React, { createContext, useContext, useState, useEffect } from "react";

interface CitationData {
  citations: number | null;
  hIndex: number | null;
  paperCitations: Map<string, number>;
}

const CitationContext = createContext<CitationData>({
  citations: null,
  hIndex: null,
  paperCitations: new Map(),
});

const FALLBACK_CITATIONS = 1041;
const FALLBACK_HINDEX = 14;
const CACHE_KEY = "cached_citations";
const CACHE_HINDEX_KEY = "cached_hindex";
const CACHE_PAPERS_KEY = "cached_paper_citations";
const CACHE_TIME_KEY = "cached_citations_updated_at";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function parseCitationsMarkdown(text: string) {
  const totalMatch = text.match(/Total Citations:\s*(\d+)/);
  const hIndexMatch = text.match(/H-index:\s*(\d+)/);
  const total = totalMatch ? parseInt(totalMatch[1], 10) : NaN;
  const hIndex = hIndexMatch ? parseInt(hIndexMatch[1], 10) : NaN;

  const paperMap = new Map<string, number>();
  const tableRegex = /\|\s*(.+?)\s*\|\s*(\d+)\s*\|\s*\d{4}\s*\|/g;
  let match;
  while ((match = tableRegex.exec(text)) !== null) {
    const paperTitle = match[1].trim();
    const citations = parseInt(match[2], 10);
    if (paperTitle && paperTitle !== "Paper") {
      paperMap.set(normalizeTitle(paperTitle), citations);
    }
  }

  return { total, hIndex, paperMap };
}

export function getCitationCountForPaper(
  paperCitations: Map<string, number>,
  title: string,
): number | undefined {
  const normalized = normalizeTitle(title);
  if (paperCitations.has(normalized)) {
    return paperCitations.get(normalized);
  }
  for (const [key, value] of paperCitations) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  return undefined;
}

export const CitationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<CitationData>(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    const parsed = cached ? parseInt(cached, 10) : NaN;

    const cachedH = localStorage.getItem(CACHE_HINDEX_KEY);
    const parsedH = cachedH ? parseInt(cachedH, 10) : NaN;

    let cachedPapers = new Map<string, number>();
    try {
      const raw = localStorage.getItem(CACHE_PAPERS_KEY);
      if (raw) cachedPapers = new Map(JSON.parse(raw));
    } catch {
      // ignore
    }

    return {
      citations: Number.isFinite(parsed) ? parsed : null,
      hIndex: Number.isFinite(parsedH) ? parsedH : null,
      paperCitations: cachedPapers,
    };
  });

  useEffect(() => {
    // Always fetch if no cached data at all
    const cachedAt = parseInt(localStorage.getItem(CACHE_TIME_KEY) ?? "0", 10);
    const hasCached = data.citations !== null;
    if (hasCached && Number.isFinite(cachedAt) && Date.now() - cachedAt < CACHE_TTL_MS) {
      return;
    }

    const controller = new AbortController();

    const fetchCitations = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Dominic789654/scholar_tracker/main/data/citations.md",
          { signal: controller.signal, cache: "no-store" },
        );
        if (!response.ok) return;

        const text = await response.text();
        const { total, hIndex, paperMap } = parseCitationsMarkdown(text);

        if (Number.isFinite(total)) {
          localStorage.setItem(CACHE_KEY, String(total));
          localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        }
        if (Number.isFinite(hIndex)) {
          localStorage.setItem(CACHE_HINDEX_KEY, String(hIndex));
        }
        if (paperMap.size > 0) {
          localStorage.setItem(
            CACHE_PAPERS_KEY,
            JSON.stringify([...paperMap]),
          );
        }

        setData({
          citations: Number.isFinite(total) ? total : FALLBACK_CITATIONS,
          hIndex: Number.isFinite(hIndex) ? hIndex : FALLBACK_HINDEX,
          paperCitations: paperMap.size > 0 ? paperMap : data.paperCitations,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to fetch citations:", error);
        }
      }
    };
    fetchCitations();

    return () => controller.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CitationContext.Provider value={data}>
      {children}
    </CitationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCitations = () => useContext(CitationContext);
