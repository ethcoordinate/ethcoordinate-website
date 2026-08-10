# Single page

Undo the multi-page split from `docs/plans/split-pages.md`. The site is one
page again. A nav link is a `#` anchor to a section id.

1. Point `src/routes.ts` at anchors: `#about`, `#what-we-do`, `#team`, `#faq`.
2. Render every section in `src/pages/index.astro`. Restore the head meta and
   the JSON-LD there. Delete `src/layouts/base.astro` and the four page files.
3. Give each section its id and `scroll-mt` back.
4. Delete `src/pages/og/[slug].png.ts`. Remove `satori` and
   `@astrojs/sitemap`. Remove the `Sitemap` line from `robots.txt`.

Keep from the multi-page work: the bio links, the `image` or `imageUrl`
member photo, the `bg-glow` bands, the svg cta arrow, and the hero dot fix.
