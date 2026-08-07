# Nav and footer

Build the site shell from Figma file `EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part    |
| ---------- | ------- |
| `56:30883` | Nav     |
| `56:30884` | Logo    |
| `56:31060` | Footer  |
| `56:31040` | Favicon |

## Steps

1. Export the logo and the favicon as SVG. Strip the canvas background layers
   that Figma adds to the export. Save both to `public/`.
2. Define the color tokens in `src/styles/global.css`. Map them to Tailwind
   utilities with `@theme inline`. See `docs/tokens.md`.
3. Load Inter with the Astro fonts API. Do not add a font dependency.
4. Build `Logo.astro`, `Nav.astro`, and `Footer.astro`.
5. Add the four deep link sections to `index.astro`. Use native smooth scroll.
6. Keep all copy in `src/site.ts`.

## Open items

- The dark theme values are a first pass. Replace them when the dark Figma
  nodes arrive.
- The nav opens a menu below `640px`. Figma node `56:32743` draws the trigger
  as two bars and gives no open state. The two bars cross into an X on open.
  The menu is a native popover, so Escape and a tap outside close it. The
  `84px` offset in `Nav.astro` must follow the height of the mobile bar.
- A popover holds no open state in the DOM. The header reads it with `:has()`
  to turn the bars, and a script copies it to `aria-expanded` on the button.
  The same script closes the menu on a link tap, because a popover stays open
  when a link inside it fires.
- The section bodies are stubs. Only the shell is in scope.
