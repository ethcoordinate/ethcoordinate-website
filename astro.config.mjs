// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Canonical origin. Meta tags and JSON-LD build absolute URLs from it.
  site: 'https://ethcoordinate.org',
  build: {
    // Inline all CSS into the page. The site is one page, and the CSS gzips
    // to ~7 KB. No external stylesheet means no unstyled flash while the
    // browser waits for it. See docs/solutions/fouc-on-refresh-uncacheable-css.md.
    inlineStylesheets: 'always'
  },
  image: {
    // A team member photo can be a remote `imageUrl` on any https host.
    remotePatterns: [{ protocol: 'https' }]
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 800'],
      subsets: ['latin'],
      styles: ['normal']
    }
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});