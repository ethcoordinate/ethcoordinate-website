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
4. Build `hero.astro`. Mount it at the top of `<main>` in `index.astro`.
5. Widen the Inter weight range to `400 800`. The first heading line is
   extra bold.

## Decisions

- **One glow file.** The light node and the dark node hold the same artwork at
  two scales. The two files differ only in the frame size, so one file serves
  both themes. The theme changes because the page background behind the glow
  changes.
- **One mark file.** The light mark and the dark mark are identical.
- **The hero fills the screen under the nav.** `100svh` minus `--nav-height`.
  `svh` is the small viewport, so the mobile address bar cannot push the call
  to action off screen.
- **The glow box is twice as tall as the section.** Figma draws the glow at a
  fixed width and shows the top half of it. The glow box holds that rule, and
  the section clips it. `background-size: cover` then fills the box at any
  aspect ratio, so a wide short window never leaves an unpainted edge.
- **One breakpoint.** `lg` (1024px) switches the whole hero between the mobile
  frame and the desktop frame. The desktop heading needs about 900px of line
  width, so a smaller breakpoint would overflow.
- **The dots and the mark hide below `lg`.** The mobile Figma frame has neither.
- **The dots are DOM, not artwork.** Figma draws them as separate nodes, so
  they are eight spans, not part of `hero-glow.svg`. Each one drifts on its own
  clock. Size drives the drift: a small dot travels further and faster, which
  reads as depth. Tailwind holds the `translate` and the `rotate` of a dot, so
  the drift uses `transform`, which the browser applies last.
- **A dot drifts on two clocks, one per axis.** An element has one `transform`,
  so the dot carries the x drift and an inner span carries the y drift. The two
  periods never divide into each other, so one axis is always mid travel while
  the other turns. A single axis with `alternate` stops twice per cycle, which
  reads as static.

## Open items

- The dot blur radius is an estimate. Figma holds it in an effect style that
  the MCP server does not report. The current value is 15% of the dot size.
- The hero is one screen tall. Nothing of the next section peeks above the
  fold. Subtract a few rem from the `min-height` if that reads as a dead end.
