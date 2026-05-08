#!/usr/bin/env node
/**
 * Refresh publications.bib by re-fetching metadata from DBLP (primary) and arXiv (fallback).
 *
 * Logic per entry:
 *   - If a comment line containing "LOCK" appears directly before the entry, skip it.
 *   - If the entry has an `eprint` field (arXiv ID):
 *       1. Query DBLP for that arXiv ID.
 *       2. If DBLP has a non-CoRR (i.e. published) record, refresh title + author + booktitle + year + doi + url.
 *       3. If DBLP only has the CoRR record, refresh title + author only (preserve booktitle/year override).
 *       4. If DBLP returns nothing, fall back to arXiv API for title + author.
 *   - Otherwise leave the entry alone.
 *
 * Usage:  node scripts/update-bib.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BIB_PATH = path.resolve("publications.bib");
const USER_AGENT = "XiangLiuHomepageBibUpdater/1.0 (+https://github.com/Dominic789654)";

// ---------- Bib parsing ----------

function parseBib(content) {
  const lines = content.split("\n");
  const blocks = []; // { leading: string[], headerLine: string, type, key, bodyLines } | { leadingOnly: string[] }
  let i = 0;
  while (i < lines.length) {
    const leading = [];
    while (i < lines.length && !lines[i].startsWith("@")) {
      leading.push(lines[i]);
      i++;
    }
    if (i >= lines.length) {
      blocks.push({ leadingOnly: leading });
      break;
    }
    const headerLine = lines[i];
    const headerMatch = headerLine.match(/^@(\w+)\s*\{\s*([^,\s]+)\s*,?\s*$/);
    if (!headerMatch) {
      // Unrecognized header, swallow as raw
      leading.push(headerLine);
      i++;
      continue;
    }
    const [, type, key] = headerMatch;
    i++;
    const bodyLines = [];
    let depth = 1;
    while (i < lines.length && depth > 0) {
      const line = lines[i];
      for (const c of line) {
        if (c === "{") depth++;
        else if (c === "}") depth--;
      }
      if (depth === 0) {
        // This line ends the entry
        bodyLines.push(line);
        i++;
        break;
      }
      bodyLines.push(line);
      i++;
    }
    blocks.push({ leading, headerLine, type, key, bodyLines });
  }
  return { blocks };
}

function extractFields(bodyLines) {
  // Parses field = {value} pairs; values may contain balanced braces.
  const text = bodyLines.join("\n");
  const fields = {};
  const re = /(\w+)\s*=\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    fields[m[1].toLowerCase()] = m[2];
  }
  return fields;
}

function hasLockMarker(leadingLines) {
  if (!leadingLines) return false;
  return leadingLines.some(
    (l) => l.startsWith("%") && /\bLOCK\b/i.test(l),
  );
}

// ---------- Network helpers ----------

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

// ---------- DBLP ----------

async function dblpLookup(arxivId) {
  // Search DBLP for the arXiv ID. Returns { published: bibEntry|null, corr: bibEntry|null }.
  const searchUrl = `https://dblp.org/search/publ/api?q=${encodeURIComponent(arxivId)}&format=json&h=10`;
  let json;
  try {
    json = await fetchJson(searchUrl);
  } catch (e) {
    console.warn(`  [dblp] search failed for ${arxivId}: ${e.message}`);
    return { published: null, corr: null };
  }
  const hits = json?.result?.hits?.hit ?? [];
  if (!hits.length) return { published: null, corr: null };

  // Filter to records that actually reference this arxiv ID via the `ee` field.
  const filtered = hits.filter((h) => {
    const ee = h?.info?.ee;
    if (!ee) return true; // be lenient
    const eeStr = Array.isArray(ee) ? ee.join("|") : String(ee);
    return eeStr.includes(arxivId);
  });

  const candidates = filtered.length ? filtered : hits;
  let published = null;
  let corr = null;
  for (const h of candidates) {
    const key = h?.info?.key;
    if (!key) continue;
    if (key.startsWith("journals/corr/")) {
      if (!corr) corr = h.info;
    } else {
      if (!published) published = h.info;
    }
  }
  return { published, corr };
}

async function dblpFetchBib(dblpKey) {
  // dblpKey example: conf/nips/PanLDPZH024 or journals/corr/abs-2502-00299
  const url = `https://dblp.org/rec/${dblpKey}.bib?param=1`;
  return fetchText(url);
}

function parseSingleBibEntry(bibText) {
  // Parse a single @type{key, ... } block returned by DBLP. Returns { type, fields }.
  const headerMatch = bibText.match(/@(\w+)\s*\{\s*([^,]+)\s*,/);
  if (!headerMatch) return null;
  const type = headerMatch[1].toLowerCase();
  const fields = {};
  const re = /(\w+)\s*=\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g;
  let m;
  while ((m = re.exec(bibText)) !== null) {
    if (m[1] === "type") continue;
    fields[m[1].toLowerCase()] = m[2].replace(/\s+/g, " ").trim();
  }
  return { type, fields };
}

// ---------- arXiv ----------

async function arxivLookup(arxivId) {
  const url = `https://export.arxiv.org/api/query?id_list=${arxivId}`;
  let xml;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      xml = await fetchText(url);
      break;
    } catch (e) {
      if (/HTTP 429/.test(e.message) && attempt < 2) {
        const wait = 3000 * (attempt + 1);
        console.warn(`  [arxiv] 429 for ${arxivId}, retrying in ${wait}ms`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      console.warn(`  [arxiv] failed for ${arxivId}: ${e.message}`);
      return null;
    }
  }
  if (!xml) return null;
  const titleMatch = xml.match(/<entry>[\s\S]*?<title>([\s\S]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : null;
  const authors = [];
  const authorRe = /<author>\s*<name>([^<]+)<\/name>/g;
  let am;
  while ((am = authorRe.exec(xml)) !== null) authors.push(am[1].trim());
  const yearMatch = xml.match(/<published>(\d{4})/);
  const year = yearMatch ? yearMatch[1] : null;
  if (!title || !authors.length) return null;
  return { title, authors: authors.join(" and "), year };
}

// ---------- Brace-protection preservation ----------

/**
 * Re-apply BibTeX brace protection from oldTitle to newTitle.
 * If oldTitle has `{ChunkKV}`, `{KV}`, etc., wrap those tokens in newTitle too,
 * even if DBLP/arXiv returned them unbraced.
 */
function preserveBraces(oldTitle, newTitle) {
  if (!oldTitle || !newTitle) return newTitle;
  const protectedTokens = new Set();
  const re = /\{([^{}]+)\}/g;
  let m;
  while ((m = re.exec(oldTitle)) !== null) {
    const inner = m[1].trim();
    // Skip math, accent, or punctuation-only tokens.
    if (!/[A-Za-z]/.test(inner)) continue;
    if (inner.length > 40) continue;
    protectedTokens.add(inner);
  }
  let out = newTitle;
  for (const tok of protectedTokens) {
    // Find the token as a standalone word (allowing trailing : or , or .) and brace if not already braced.
    const escaped = tok.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    // Match the token NOT already inside braces.
    const pattern = new RegExp(`(?<!\\{)\\b${escaped}\\b(?!\\})`, "g");
    out = out.replace(pattern, `{${tok}}`);
  }
  return out;
}

// ---------- Field updates ----------

function updateBodyField(bodyLines, fieldName, newValue) {
  // Replace `field = {...}` (possibly multi-line). Returns new bodyLines array.
  const text = bodyLines.join("\n");
  const re = new RegExp(`(\\b${fieldName}\\s*=\\s*\\{)((?:[^{}]|\\{[^{}]*\\})*)(\\})`, "i");
  if (re.test(text)) {
    const replaced = text.replace(re, `$1${newValue}$3`);
    return replaced.split("\n");
  }
  // Field absent: insert before closing brace line.
  const out = [...bodyLines];
  let insertIdx = out.length - 1;
  while (insertIdx >= 0 && !out[insertIdx].includes("}")) insertIdx--;
  // Match indentation of an existing field line if possible
  let indent = "  ";
  for (const l of out) {
    const im = l.match(/^(\s+)\w+\s*=/);
    if (im) {
      indent = im[1];
      break;
    }
  }
  out.splice(insertIdx, 0, `${indent}${fieldName.padEnd(13)} = {${newValue}},`);
  return out;
}

// ---------- Main ----------

async function main() {
  const original = await fs.readFile(BIB_PATH, "utf8");
  const { blocks } = parseBib(original);

  let changed = 0;
  let skippedLock = 0;
  let unchanged = 0;
  const failures = [];

  for (const block of blocks) {
    if (!block.headerLine) continue;
    if (hasLockMarker(block.leading)) {
      skippedLock++;
      continue;
    }
    const fields = extractFields(block.bodyLines);
    const arxivId = (fields.eprint || "").trim();
    if (!arxivId) continue;
    if (!/^\d{4}\.\d{4,6}$/.test(arxivId)) continue;

    console.log(`refresh ${block.key} (arXiv:${arxivId})`);
    const { published, corr } = await dblpLookup(arxivId);

    let newTitle = null;
    let newAuthor = null;
    let newBooktitle = null;
    let newJournal = null;
    let newYear = null;
    let newDoi = null;
    let newPages = null;

    if (published) {
      try {
        const bibText = await dblpFetchBib(published.key);
        const parsed = parseSingleBibEntry(bibText);
        if (parsed) {
          newTitle = parsed.fields.title || null;
          newAuthor = parsed.fields.author || null;
          newBooktitle = parsed.fields.booktitle || null;
          newJournal = parsed.fields.journal || null;
          newYear = parsed.fields.year || null;
          newDoi = parsed.fields.doi || null;
          newPages = parsed.fields.pages || null;
          console.log(`  [dblp] published record found: ${published.key}`);
        }
      } catch (e) {
        console.warn(`  [dblp] fetch bib failed: ${e.message}`);
      }
    }

    if (!newTitle && corr) {
      try {
        const bibText = await dblpFetchBib(corr.key);
        const parsed = parseSingleBibEntry(bibText);
        if (parsed) {
          newTitle = parsed.fields.title || null;
          newAuthor = parsed.fields.author || null;
          // Do NOT take booktitle/year from CoRR — keep user override.
          console.log(`  [dblp] only CoRR record: ${corr.key}`);
        }
      } catch (e) {
        console.warn(`  [dblp] CoRR fetch failed: ${e.message}`);
      }
    }

    if (!newTitle) {
      const arx = await arxivLookup(arxivId);
      if (arx) {
        newTitle = arx.title;
        newAuthor = arx.authors;
        console.log(`  [arxiv] fallback metadata used`);
      } else {
        failures.push(block.key);
        console.warn(`  ! no metadata found for ${block.key}`);
        continue;
      }
    }

    let entryChanged = false;
    if (newTitle) {
      newTitle = preserveBraces(fields.title || "", newTitle);
    }
    if (newTitle && newTitle !== fields.title) {
      block.bodyLines = updateBodyField(block.bodyLines, "title", newTitle);
      entryChanged = true;
    }
    if (newAuthor && newAuthor !== fields.author) {
      block.bodyLines = updateBodyField(block.bodyLines, "author", newAuthor);
      entryChanged = true;
    }
    // Only update venue/year/doi/pages when DBLP has a published record AND existing entry isn't a user-overridden venue.
    // Heuristic: if existing booktitle differs from DBLP and we have a published record, update.
    if (published && newBooktitle && newBooktitle !== fields.booktitle && fields.booktitle !== undefined) {
      block.bodyLines = updateBodyField(block.bodyLines, "booktitle", newBooktitle);
      entryChanged = true;
    }
    if (published && newYear && newYear !== fields.year) {
      block.bodyLines = updateBodyField(block.bodyLines, "year", newYear);
      entryChanged = true;
    }
    if (published && newDoi && newDoi !== fields.doi) {
      block.bodyLines = updateBodyField(block.bodyLines, "doi", newDoi);
      entryChanged = true;
    }
    if (published && newPages && newPages !== fields.pages) {
      block.bodyLines = updateBodyField(block.bodyLines, "pages", newPages);
      entryChanged = true;
    }

    if (entryChanged) {
      changed++;
      console.log(`  ✓ updated`);
    } else {
      unchanged++;
    }

    // small delay to be polite to DBLP
    await new Promise((r) => setTimeout(r, 250));
  }

  // Reconstruct file
  const out = [];
  for (const block of blocks) {
    if (block.leadingOnly) {
      out.push(block.leadingOnly.join("\n"));
      continue;
    }
    if (block.leading && block.leading.length) {
      out.push(block.leading.join("\n"));
    }
    out.push(block.headerLine);
    out.push(block.bodyLines.join("\n"));
  }
  const finalContent = out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
  await fs.writeFile(BIB_PATH, finalContent, "utf8");

  console.log("");
  console.log(`Summary: ${changed} updated, ${unchanged} unchanged, ${skippedLock} skipped (LOCK), ${failures.length} failed`);
  if (failures.length) {
    console.log(`Failed: ${failures.join(", ")}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
