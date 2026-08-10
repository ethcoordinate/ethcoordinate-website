# The page flashes unstyled on refresh because the CSS is external

## Symptom

On load, the page shows plain HTML without CSS for a moment. Firefox on a
deploy preview also flashes the light theme, then flips to dark. The hero
band flashes white before the artwork loads.

## Cause

Three causes stack:

1. Netlify served every asset with `cache-control: public, max-age=0,
   must-revalidate`, including the hashed `/_astro/*.css` files. The
   render-blocking stylesheet re-fetched on every refresh.
2. A cache header does not help a cold cache. A first visit, a hard refresh,
   or a new deploy preview always fetches the CSS. Firefox paints the page
   before a slow stylesheet arrives, and paints again mid-parse. A partial
   parse applies the light `:root` tokens before the
   `prefers-color-scheme: dark` block, so the page flashes light.
3. The dark look of the hero comes only from `hero-glow.webp` (155 KB). The
   band shows the surface color until that image loads.

## Fix

1. Keep `public/_headers` with long-lived caching on `/_astro/*`. Hashed
   file names make this safe.
2. Set `build: { inlineStylesheets: 'always' }` in `astro.config.mjs`. The
   site is one page and the CSS gzips to ~7 KB. The HTML carries the CSS, so
   no fetch, no flash, in any browser.
3. Give the hero glow box `bg-hero-base`, a token that holds the dark base
   of the artwork in both themes. The band paints dark at once, and the
   artwork covers it when it loads.
