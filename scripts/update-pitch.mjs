#!/usr/bin/env node
/**
 * Refresh citation counts in public/talks/interview-pitch.html from the latest
 * scholar_tracker snapshot.
 *
 * What it updates:
 *   - <div class="stat">N</div> next to <div class="stat-label">Citations</div>     (total)
 *   - <div class="stat">N / N</div> next to "H-index / i10-index"                   (h/i10)
 *   - <strong>LISA</strong> (N cites)                                               (education inline)
 *   - Each <a class="paper-row">…<span class="lead">ShortName</span>…· N cites…</a> (per-paper)
 *
 * What it does NOT do:
 *   - Add cite counts to paper rows that didn't have one before (manual choice).
 *   - Touch anything else in the HTML.
 */

import fs from "node:fs/promises";
import path from "node:path";

const HTML_PATH = path.resolve("public/talks/interview-pitch.html");
const SCHOLAR_URL =
  "https://raw.githubusercontent.com/Dominic789654/scholar_tracker/main/data/citation_history.json";

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": "XiangLiuPitchUpdater/1.0" } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

// Map deck lead (lowercased, trimmed, trailing punctuation stripped) to the
// canonical Scholar title fragment used for matching. Only needed when the
// deck's short name is an abbreviation that does not literally appear in the
// Scholar title (e.g. "CoT" vs "chain-of-thought", "LM" vs "Language Model").
const LEAD_ALIASES = {
  "active prompting with cot": "active prompting with chain-of-thought",
  "reasoning lm inference serving unveiled":
    "reasoning language model inference serving unveiled",
};

function findCitesByLead(titleCitesMap, lead) {
  const raw = lead.toLowerCase().trim().replace(/[:.,]+$/, "");
  const k = LEAD_ALIASES[raw] ?? raw;
  // Exact short-name match (title starts with "<lead> " or "<lead>:")
  for (const [title, cites] of titleCitesMap) {
    if (
      title.startsWith(k + " ") ||
      title.startsWith(k + ":") ||
      title.startsWith(k + ",") ||
      title === k
    ) {
      return cites;
    }
  }
  // Fallback: substring match
  for (const [title, cites] of titleCitesMap) {
    if (title.includes(k)) return cites;
  }
  return null;
}

async function main() {
  const history = await fetchJson(SCHOLAR_URL);
  if (!Array.isArray(history) || !history.length) {
    throw new Error("scholar_tracker history JSON is empty or malformed");
  }
  const latest = history[history.length - 1];
  console.log(
    `Snapshot ${latest.date}  total=${latest.total_citations}  h=${latest.h_index}  i10=${latest.i10_index}`,
  );

  const titleCites = new Map();
  for (const p of latest.papers) titleCites.set(p.title.toLowerCase(), p.citations);

  let html = await fs.readFile(HTML_PATH, "utf8");
  const before = html;
  const changes = [];

  // 1. Total citations
  const totalFormatted = latest.total_citations.toLocaleString("en-US");
  html = html.replace(
    /(<div class="stat">)([\d,]+)(<\/div>\s*<div class="stat-label">Citations<\/div>)/,
    (_, a, oldVal, b) => {
      if (oldVal !== totalFormatted) {
        changes.push(`Total citations: ${oldVal} → ${totalFormatted}`);
      }
      return `${a}${totalFormatted}${b}`;
    },
  );

  // 2. H-index / i10-index
  const hVal = `${latest.h_index} / ${latest.i10_index}`;
  html = html.replace(
    /(<div class="stat">)([^<]+)(<\/div>\s*<div class="stat-label">H-index \/ i10-index<\/div>)/,
    (_, a, oldVal, b) => {
      const oldTrim = oldVal.trim();
      if (oldTrim !== hVal) {
        changes.push(`H-index / i10: ${oldTrim} → ${hVal}`);
      }
      return `${a}${hVal}${b}`;
    },
  );

  // 3. Inline LISA mention in education paragraph
  const lisaCites = findCitesByLead(titleCites, "LISA");
  if (lisaCites != null) {
    html = html.replace(
      /(<strong>LISA<\/strong>\s*\()(\d+)(\s*cites\))/,
      (_, a, oldVal, b) => {
        if (parseInt(oldVal, 10) !== lisaCites) {
          changes.push(`LISA (education inline): ${oldVal} → ${lisaCites}`);
        }
        return `${a}${lisaCites}${b}`;
      },
    );
  }

  // 4. Per-paper rows
  html = html.replace(
    /<a class="paper-row"[\s\S]*?<\/a>/g,
    (row) => {
      const leadMatch = row.match(/<span class="lead">([^<]+)<\/span>/);
      if (!leadMatch) return row;
      const lead = leadMatch[1].trim();
      const cites = findCitesByLead(titleCites, lead);
      if (cites == null) return row;

      return row.replace(
        /· (<strong>)?(\d+)\s*cites?(<\/strong>)?/i,
        (_, strongOpen, oldVal) => {
          const oldNum = parseInt(oldVal, 10);
          if (oldNum !== cites) {
            changes.push(`${lead}: ${oldNum} → ${cites} cites`);
          }
          const inner = `${cites} cite${cites === 1 ? "" : "s"}`;
          return strongOpen ? `· <strong>${inner}</strong>` : `· ${inner}`;
        },
      );
    },
  );

  if (html === before) {
    console.log("No changes.");
    return;
  }

  await fs.writeFile(HTML_PATH, html, "utf8");
  console.log(`\n${changes.length} updates:`);
  for (const c of changes) console.log(`  ${c}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
