// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  image: {
    // PokeAPI serves the official artwork from this host.
    domains: ['raw.githubusercontent.com']
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