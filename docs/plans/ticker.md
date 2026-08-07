# Ticker

Build the ticker bar below the hero from Figma file `EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part          |
| ---------- | ------------- |
| `56:30921` | Ticker, light |
| `52:26087` | Ticker, dark  |
| `56:32761` | Ticker, small |

All three nodes hold the same fill, the same type, and the same phrases. The
ticker therefore keeps one look in both themes.

## Steps

1. Put the four phrases in `src/site.ts`.
2. Add the `--ticker-*` tokens and the `bg-ticker` utility to
   `src/styles/global.css`. Keep them out of the theme blocks, because the bar
   does not flip.
3. Build `ticker.astro`. Use CSS only. No script.
4. Mount it in `index.astro`, between the hero and the first section.

## Motion

The track holds two identical lists. It slides left by half its own width,
which is exactly one list. The second list then sits where the first one
started, so the loop has no seam. Each list carries a trailing gap, which keeps
the two halves equal in width.

`prefers-reduced-motion: reduce` stops the track.
