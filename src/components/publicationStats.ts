export const PUBLICATION_CATEGORIES = [
  "Main conferences",
  "Findings",
  "Workshops",
  "Journals",
  "Blog tracks",
  "Technical reports",
  "Preprints",
  "Other",
] as const;

type PublicationCategory = (typeof PUBLICATION_CATEGORIES)[number];

interface PublicationRecord {
  venue: string;
  isPreview?: boolean;
}

export function publicationCategory(venue: string): PublicationCategory {
  // Specific tracks take precedence over a conference name inside the label.
  if (/\bworkshop\b/i.test(venue)) return "Workshops";
  if (/\bfindings\b/i.test(venue)) return "Findings";
  if (/\bblog track\b/i.test(venue)) return "Blog tracks";
  if (/\btechnical report\b/i.test(venue)) return "Technical reports";
  if (/\b(arxiv|preprint|corr)\b/i.test(venue)) return "Preprints";
  if (/\b(transactions|journal)\b/i.test(venue)) return "Journals";
  if (/^(ICLR|ICML|NeurIPS|ACL|EMNLP|NAACL|AACL-IJCNLP|ACM-MM|AAAI)\s+\d{4}\b/i.test(venue)) {
    return "Main conferences";
  }
  // New/unrecognized venues must not silently inflate main-conference counts.
  return "Other";
}

export function summarizePublications(publications: readonly PublicationRecord[]) {
  return PUBLICATION_CATEGORIES.map((category) => {
    const entries = publications.filter(
      (publication) => !publication.isPreview && publicationCategory(publication.venue) === category,
    );
    const venues = new Map<string, number>();
    if (["Main conferences", "Findings", "Workshops", "Blog tracks"].includes(category)) {
      for (const entry of entries) {
        const venue = entry.venue.split(" ")[0];
        venues.set(venue, (venues.get(venue) ?? 0) + 1);
      }
    }
    return {
      category,
      count: entries.length,
      venues: [...venues.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
    };
  }).filter(({ count }) => count > 0);
}
