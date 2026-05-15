# Xiang Liu Homepage

Personal academic website for Xiang Liu, built with React, TypeScript, Vite,
Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

The Vite dev server runs at `http://localhost:5173` by default.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` builds the production site into `dist/`.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint.
- `npm run deploy` manually publishes `dist/` with `gh-pages`.

## Project Structure

- `src/App.tsx` assembles the page sections.
- `src/components/` contains the homepage sections and publication cards.
- `src/components/Publications.tsx` contains the curated publication lists shown
  on the homepage.
- `src/contexts/CitationContext.tsx` loads citation data from the
  `scholar_tracker` repository and caches it in `localStorage`.
- `public/publications.bib` is the downloadable BibTeX file.
- `scripts/update-bib.mjs` refreshes BibTeX metadata from DBLP and arXiv.
- `scripts/update-pitch.mjs` refreshes citation counts in the public interview
  pitch deck.

## Publication Display Rules

Selected publications should include accepted papers where Xiang Liu is first
author or co-first author. Preprints should include papers that have not yet
been formally accepted or published.

When updating a paper status:

1. Update the relevant entry in `src/components/Publications.tsx`.
2. Update `public/publications.bib` if the BibTeX status changed.
3. Add a news item in `src/components/News.tsx` for major acceptances.
4. Run `npm run build`, `npm run lint`, and `npx tsc -b`.

## Deployment

GitHub Actions deploys the site to GitHub Pages on pushes to `master` using
`.github/workflows/deploy.yml`. The Vite config intentionally uses
`base: './'` for GitHub Pages-compatible relative paths.

Generated output (`dist/`), dependencies (`node_modules/`), system files, local
environment files, and TypeScript build info are ignored by Git.
