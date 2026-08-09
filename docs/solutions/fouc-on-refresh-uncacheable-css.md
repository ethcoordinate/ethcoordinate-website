# The page flashes unstyled on refresh because the CSS is not cacheable

## Symptom

On refresh, the page shows plain HTML without CSS for a moment. Refreshes feel
slow.

## Cause

Netlify served every asset with `cache-control: public, max-age=0,
must-revalidate`, including the hashed `/_astro/*.css` files. The site sits
behind Netlify password protection, so every asset request also passes the JWT
gate (~300 ms TTFB, measured). The render-blocking stylesheet re-fetched on
every refresh. When that request failed or returned 401, the browser rendered
the page unstyled.

## Fix

Add `public/_headers` that sets long-lived caching on the hashed assets:

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

Hashed file names make this safe. A content change produces a new file name.
The browser then keeps the CSS in cache and never revalidates it.
