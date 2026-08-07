# CTA

Build the closing band from Figma file `EPr1BWJ9CL7obLdsPAOKlE`. It sits between
the FAQ and the footer.

## Source nodes

| Node       | Part       |
| ---------- | ---------- |
| `56:31032` | CTA, light |
| `52:26202` | CTA, dark  |
| `56:32863` | CTA, small |

## Layout

One centered column of four blocks: the logo mark, the eyebrow, the heading, and
the email link. Figma draws no button. The link carries the whole call to
action.

Small screens hold the same column. Only the type sizes and the padding change.

## Mark

The mark is a crop of the wordmark sprite. The `use` element carries the full
size of the sprite and the `viewBox` shows only its first 44 units. The band
therefore needs no second asset.

## Decoration

1. **The glow.** A blob centered below the left of the band, so the light climbs
   from that corner and fades to the right.
2. **The dashed ellipse.** One inline SVG per breakpoint. Figma halves the
   ellipse on a small screen but keeps the same dash, so one frame cannot serve
   both. `preserveAspectRatio="xMidYMid slice"` pins each one to the middle,
   whatever height the copy gives the section.
3. **The dot field.** `dots.astro` holds it. See `docs/plans/what-we-do.md`.

One dot stands on its corner. That is why `dots.astro` gained the `diamond`
option.

## Token

The heading gradient reads `--heading-from` and `--heading-to` at its own angle
and its own stops, so it flips with the theme like the hero heading does.

| Token        | Role                       | Light        | Dark         |
| ------------ | -------------------------- | ------------ | ------------ |
| `--cta-dash` | Dashed ellipse of the band | `--blue-500` | `--blue-500` |

Figma holds one blue in the dashed ellipse in both themes, so `--cta-dash` never
flips. `--dash` does flip, which is why the two are separate.

The glow reads `--about-glow` through `bg-cta-glow`.

## Steps

1. Put the eyebrow, the heading, and the email link in `src/site.ts`.
2. Add `--cta-dash`, `text-gradient-cta`, and `bg-cta-glow` to `global.css` and
   to `docs/tokens.md`.
3. Add the `diamond` option to `dots.astro`.
4. Build `cta.astro`. Static markup, no script.
5. Mount it in `index.astro`, after the FAQ section and before the footer.
