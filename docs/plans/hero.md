# Hero

Build the landing page hero from Figma file `EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part           |
| ---------- | -------------- |
| `56:30890` | Hero, light    |
| `52:26054` | Hero, dark     |
| `56:32747` | Hero, mobile   |

## Steps

1. Export the glow and the Ethereum mark as SVG. Save both to `public/`.
2. Add the hero copy to `src/site.ts`.
3. Add the gradient tokens to `src/styles/global.css`. See `docs/tokens.md`.
4. Build `Hero.astro`. Mount it at the top of `<main>` in `index.astro`.
5. Widen the Inter weight range to `400 800`. The first heading line is
   extra bold.

## Decisions

- **One glow file.** The light node and the dark node hold the same artwork at
  two scales. The two files differ only in the frame size, so one file serves
  both themes. The theme changes because the page background behind the glow
  changes.
- **One mark file.** The light mark and the dark mark are identical.
- **The glow sizes from the section height.** Figma draws the glow at a fixed
  width and shows the top half. That width is 100% of the frame on desktop and
  281% on mobile, so width is not a stable rule. Height is: the visible band is
  always half the glow width. `background-size: auto 198%` reproduces both.
- **One breakpoint.** `lg` (1024px) switches the whole hero between the mobile
  frame and the desktop frame. The desktop heading needs about 900px of line
  width, so a smaller breakpoint would overflow.
- **The dots and the mark hide below `lg`.** The mobile Figma frame has neither.
- **The dots are DOM, not artwork.** Figma draws them as separate nodes, so
  they are eight spans, not part of `hero-glow.svg`. Each one drifts on its own
  clock. Size drives the drift: a small dot travels further and faster, which
  reads as depth. Tailwind holds the `translate` and the `rotate` of a dot, so
  the drift uses `transform`, which the browser applies last.

## Open items

- The dot blur radius is an estimate. Figma holds it in an effect style that
  the MCP server does not report. The current value is 15% of the dot size.
- The section uses a fixed `min-height` per breakpoint, because the glow sizes
  from that height. Replace it if the copy grows.
