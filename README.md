# sp1le.tech

Portfolio and engineering notes for Dmytro Stasiuk. Static site, English and Ukrainian.

Live: https://sp1le.tech

## Why it is built this way

The audience is other engineers, so the site is built the way I would want to find it
if I were the one opening DevTools:

- **No client framework.** Astro renders every page at build time. The only JavaScript
  that reaches the browser is the theme toggle and the copy-to-clipboard button -
  about 1 KB, inlined, with no external JS file at all.
- **No third-party requests.** Fonts are self-hosted (`scripts/fetch-fonts.mjs` pulls
  the exact woff2 subsets and generates `src/styles/fonts.css`). No analytics, no
  cookie banner, nothing to consent to.
- **Content is typed data, not markup.** Every case study is a `Project` in
  `src/content/projects.ts`, so a missing translation or a malformed decision record
  is a type error rather than a hole in a page.
- **The numbers are measured.** Line counts, test-module counts and route counts in
  the case studies come from the repositories they describe, not from memory.

Page weight, gzipped: ~6 KB of HTML per page plus a ~6 KB stylesheet that caches
across navigations. Fonts add ~83 KB on first visit.

## Structure

```
src/
  content/projects.ts    the five case studies: constraint, decisions, metrics, retro
  content/site.ts        contact details, stack groups, service offers, principles
  lib/i18n.ts            locale helpers and every UI string, in both languages
  layouts/Base.astro     head, metadata, hreflang, theme bootstrap
  components/            Section (the annotation rail), Manifest, DecisionCard, ...
  views/                 one view per page type, shared by both locales
  pages/                 thin routes: /… for English, /uk/… for Ukrainian
scripts/fetch-fonts.mjs  regenerates the self-hosted font files
```

The design's one structural idea is the **annotation rail**: a sticky left margin
carrying the notes an engineer would pencil into a spec - dates, counts, caveats.
Below 1024px it folds above its own content instead of disappearing, because the
notes are content.

Colour carries meaning rather than decoration. Ultramarine marks anything currently
running, amber marks work that is unfinished, and handed-over work gets no colour at
all. That is the whole palette.

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check, then build to dist/
npm run preview    # serve the built output
npm run check      # astro check only
```

`node scripts/fetch-fonts.mjs` re-downloads the fonts and rewrites `src/styles/fonts.css`.
Only run it when the typeface choice changes.

## Deploying

The site is static. `npm run build` produces `dist/`, which nginx serves from
`/var/www/portfolio` - see `deploy/nginx.conf` for the server block and
`deploy/README.md` for the upload step.
