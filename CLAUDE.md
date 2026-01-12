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
- Use `PublicationCard` with `index` prop for staggered animations
