# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start Vite dev server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to gh-pages branch manually

## Deployment

Two deployment methods exist - **use only one**:
1. **GitHub Actions** (recommended): `.github/workflows/deploy.yml` auto-deploys on push to master
2. **Manual**: `npm run deploy` uses `gh-pages` package to deploy dist/ to gh-pages branch

## Architecture

This is a single-page React + TypeScript + Vite academic personal website for Xiang Liu (PhD researcher at HKUST-GZ).

### Component Structure

- **App.tsx** - Main layout assembling all sections
- **components/Publications.tsx** - Contains ALL publication data in `fullPublications` array (~28 papers). When adding a new publication, add to this array.
- **components/PublicationCard.tsx** - Displays individual papers with hover animations. Uses regex to highlight "Xiang Liu" in author names.

### Key Styling Features

- **ParticlesBackground.tsx** - Canvas-based connected particle network animation (60 particles)
- **Header.tsx** - Contains typewriter effect cycling through research focus areas
- **FadeIn.tsx** - Scroll-based fade-in wrapper component
- **index.css** - Global gradients, custom scrollbar, glass morphism utilities

### Vite Configuration

`vite.config.ts` has `base: './'` set - this enables relative paths for GitHub Pages compatibility. Do not remove this.

### Publication Data Organization

Publications are organized by category in `Publications.tsx`:
- `selectedPublications` - Featured papers shown on main list
- `preprints` - Recent preprints
- `fullPublications` - Complete list (expanded when user clicks "+" button)

When adding new publications:
1. Add to `fullPublications` array with proper id, title, authors, venue, and links
2. Optionally add to `selectedPublications` if it should appear in main view
3. For `preprints` and `fullPublications`, update BOTH arrays when changing venue/status
- Use `PublicationCard` with `index` prop for staggered animations

## Personal Preferences for Xiang Liu

### Publications Display Rules

**Selected Publications Criteria:**
- ONLY include papers where Xiang Liu is **first author** or **co-first author** (marked with *)
- DO NOT include papers where Xiang Liu is not first/co-first author
- DO NOT include arXiv preprints that haven't been accepted by a conference yet
- Prioritize recent and impactful venues (ICLR, NeurIPS, ICML, etc.)

**Example**: When a paper is accepted:
1. Update venue in both `preprints` and `fullPublications` arrays from "arXiv preprint" to "Conference Year"
2. If Xiang Liu is first/co-first author, add to `selectedPublications` at the top
3. Add a news item in `components/News.tsx` with date and celebration emoji

### About/Bio Section Rules

- Use **past tense** for visiting positions that have ended (e.g., "I was a visiting student")
- Keep current positions in present tense
- Update when roles change

### News Section Guidelines

- Add news items for significant achievements (paper acceptances, awards, etc.)
- Use "New!" badge for recent items (isNew: true)
- Format: "Month Year" + description + optional emoji
- Place most recent news at the top

### Paper Updates Workflow

When a paper gets accepted:
1. ✅ Update venue in `Publications.tsx` (both `preprints` and `fullPublications`)
2. ✅ If first/co-first author, add to `selectedPublications`
3. ✅ Add news item in `News.tsx`
4. ✅ Run `npm run build` to verify
5. ✅ Commit and push to deploy
