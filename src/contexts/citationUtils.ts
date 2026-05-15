export function normalizeCitationTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

export function getCitationCountForPaper(
  paperCitations: Map<string, number>,
  title: string,
): number | undefined {
  const normalized = normalizeCitationTitle(title);
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
