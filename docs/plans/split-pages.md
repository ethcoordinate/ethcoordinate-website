# Split the one-page site into pages

## Tasks

1. Delete the mission, vision, and value cards from the about section.
   Delete the six icon files and the mask utilities they used.
2. Delete the ticker component, its copy, and its color tokens.
3. Split each section into its own page: `/` (hero), `/about`,
   `/initiatives`, `/team`, `/faq`. Add a shared layout with per-page
   SEO tags. Generate an OG image per page with satori at build time
   (`/og/[slug].png`). The home page keeps the Figma `og.jpg` export.
   Add `@astrojs/sitemap`.
4. Linkify bare domains in a team bio. Render them as links that open
   in a new tab.
5. Let a team member set `image` (local import) or `imageUrl` (remote).
   Exactly one of the two.
