# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:4321
npm run build    # build to ./dist
npm run preview  # preview the build locally
```

No linter or test suite is configured.

## Architecture

Static personal portfolio site. Two pages: `/` (home) and `/404`.

**Framework:** Astro (static output) with one Svelte island — `ThemeToggle.svelte` — hydrated via `client:load`. Everything else is zero-JavaScript `.astro` components.

**Theme switching:** A `<script is:inline>` in `BaseLayout.astro`'s `<head>` runs synchronously before paint to apply `.dark` on `<html>` from `localStorage`, preventing flash. `ThemeToggle.svelte` reads/writes `localStorage` and toggles the class on click; it also syncs with `prefers-color-scheme` changes when no explicit choice is stored. Tailwind's `darkMode: 'selector'` targets this `.dark` class.

**Styling:** Tailwind CSS 3 with a custom font-size scale (`tailwind.config.ts`) and an extended typography config (`typography.ts`) for prose/MDX content. Global CSS entry point is `src/styles/global.css`, imported once in `BaseLayout.astro`. Syntax highlighting styles are in `src/styles/prism.css`.

**Images:** Static assets live in `public/images/` and are referenced by path (e.g. `/images/avatar.jpeg`, `/images/logos/aon.svg`). No Astro image optimization is used.

**Layout hierarchy:** `BaseLayout.astro` → `Header.astro` + slot + `Footer.astro`. Container components (`ContainerOuter`, `ContainerInner`, `Container`) provide the max-width/padding shell used across pages and the footer.

**Deployment:** GitHub Actions (`.github/workflows/publish.yml`) runs `astro build` on push to `main` and deploys `./dist` to GitHub Pages.
