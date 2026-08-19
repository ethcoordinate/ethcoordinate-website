# Color tokens

`src/styles/global.css` is the only source of truth for color. It holds three
layers.

1. **Palette.** The raw Figma colors. These never change with the theme. Use
   them only to build semantic tokens.
2. **Semantic tokens.** One value per role. These flip with the theme.
3. **Tailwind map.** An `@theme inline` block that turns each semantic token
   into a Tailwind utility.

Use the utility in a component. Never write a hex value in a component.

## Palette

| Name            | Value     |
| --------------- | --------- |
| `--blue-200`    | `#b4c6ed` |
| `--blue-400`    | `#5d8ef1` |
| `--blue-500`    | `#133cd0` |
| `--blue-900`    | `#040530` |
| `--ink-900`     | `#171716` |
| `--ink-950`     | `#171724` |
| `--indigo-800`  | `#222275` |
| `--white`       | `#ffffff` |

## Third party brands

A brand color fills or rules inside the frame of that brand. It never carries
text, and it never flips with the theme. Cyan on EthStaker is the clearest
case: it is a rule only, which is what keeps that pair at AA.

| Name                 | Value                     | Where                        |
| -------------------- | ------------------------- | ---------------------------- |
| `--ethstaker-blue`   | `#0071bc`                 | Bar above the EthStaker column |
| `--ethstaker-cyan`   | `#00ffff`                 | Left rule of the handoff panel |
| `--forkcast-from`    | `#00d4ff`                 | Forkcast gradient, near stop |
| `--forkcast-to`      | `#a855f7`                 | Forkcast gradient, far stop  |
| `--forkcast-surface` | `#0b0e14`                 | Background of the Forkcast frame |
| `--forkcast-ink`     | `--white`                 | Text inside that frame       |
| `--forkcast-edge`    | `rgb(0 212 255 / 0.28)`   | Border of that frame         |
| `--forkcast-rule`    | `rgb(255 255 255 / 0.1)`  | Hairlines inside that frame  |
| `--forkcast-body`    | `rgb(255 255 255 / 0.55)` | Secondary text in that frame |
| `--forkcast-strong`  | `rgb(255 255 255 / 0.75)` | The attribution line         |
| `--forkcast-scan`    | `rgb(255 255 255 / 0.045)`| The scanline texture         |

## Semantic tokens

| Token          | Utility           | Role                       | Light          | Dark            |
| -------------- | ----------------- | -------------------------- | -------------- | --------------- |
| `--surface`    | `bg-surface`      | Page and shell background  | `--white`      | `--ink-950`     |
| `--body`       | `text-body`       | All body text              | `--ink-900`    | `--white`       |
| `--subtle`     | `border-subtle`   | Hairline borders           | `--blue-200`   | `--indigo-800`  |
| `--accent`     | `text-accent`     | Hover and focus ring       | `--blue-500`   | `--blue-200`    |
| `--logo-ink`   | used by the logo  | Dark half of the wordmark  | `--blue-900`   | `--blue-200`    |
| `--logo-glow`  | used by the logo  | Soft halo behind the mark  | `--blue-200`   | `--ink-950`     |
| `--heading-from` | used by `text-gradient` | Hero heading, near stop | `--blue-500` | `--blue-500` |
| `--heading-to`   | used by `text-gradient` | Hero heading, far stop  | `--blue-900` | `--blue-200` |
| `--cta-from`   | used by `bg-cta`  | CTA pill, left stop        | `--ink-950`    | `--white`       |
| `--cta-to`     | used by `bg-cta`  | CTA pill, right stop       | `--indigo-800` | `--blue-400`    |
| `--cta-body`   | `text-cta-body`   | CTA pill label             | `--white`      | `--ink-900`     |
| `--dot-blue`   | `bg-dot-blue`     | Blue hero dot              | `--blue-500`   | `--blue-500`    |
| `--dot-light`  | `bg-dot-light`    | Light hero dot             | `--white`      | `--white`       |
| `--glow` | used by the glow utilities | Blob color of every glow | `--blue-400` | `--indigo-800` |
| `--dash`       | `text-dash`       | Dashed circle and line     | `--blue-200`   | `--blue-500`    |
| `--cta-dash`   | `text-cta-dash`   | Dashed ellipse of the CTA  | `--blue-500`   | `--blue-500`    |

Figma holds one blue in the dashed ellipse of the closing CTA in both themes, so
`--cta-dash` never flips. `--dash` does flip, which is why the two are separate.

`logo-sprite.astro` reads `--logo-ink` and `--logo-glow` inside the SVG, so the
logo follows the theme without a second asset.

## Gradients

A gradient is color, so it lives in `global.css` as a fourth layer. Two
utilities read the tokens above.

| Utility         | Role                                        |
| --------------- | ------------------------------------------- |
| `text-gradient` | Paints the gradient on the heading glyphs.   |
| `text-gradient-cta` | Paints the gradient on the closing CTA heading. |
| `bg-cta`        | Paints the gradient on the CTA pill.         |
| `bg-glow` | Paints the blob at each side edge of a band. |
| `bg-cta-glow`   | Paints the blob below the closing CTA band.  |
| `bg-avatar-glow` | Paints the blob behind a team avatar.       |

| `bg-forkcast-bar` | Paints the Forkcast rule above a menu column. |
| `text-gradient-forkcast` | Paints the Forkcast wordmark. |
| `bg-forkcast-mark` | Paints the Forkcast dot and its glow. |
| `bg-scanlines`  | Paints the scanline texture of the Forkcast frame. |
| `bg-tier-1` to `bg-tier-4` | Paints the bar on the left edge of a product card. |
| `logo-on-dark`  | Holds the dark theme logo colors inside a dark frame. |

The four tier bars read `--accent` and differ only in the dash. The dash grows
as the tie to the product loosens: solid owns its domain, and the widest gaps
mark a product we only catalogue.

`text-gradient` and `text-gradient-cta` read the same two stops. Only the angle
and the stop positions differ, so both headings flip with the theme.

`bg-cta-glow` and `bg-avatar-glow` read `--glow`. Figma exports one blurred
blob per place, but every export bakes the light color, so a committed asset
could not flip. A radial gradient carries the same soft falloff and reads the
token instead.

`--heading-angle` tilts the heading gradient. It is `-35deg` on the one column
layout and `-14deg` from `64rem` up.

`public/hero-glow.svg` and `public/hero-mark.svg` are pure gradient artwork.
Both serve the light theme and the dark theme. The page background behind them
supplies the theme. See `docs/plans/hero.md`.

`src/icons/*.svg` is artwork too, so it may hold a hex value.

Every token inside an SVG carries the light hex as a fallback, so the file also
reads on its own. See
`docs/solutions/svg-var-without-fallback-paints-black.md`.

## Figma source

| Figma variable                  | Token         | Light     | Dark      |
| ------------------------------- | ------------- | --------- | --------- |
| `General background`            | `--surface`   | `#ffffff` | `#171724` |
| `Texts/text-color-body-primary` | `--body`      | `#171716` | `#ffffff` |
| `Borders/subtle`                | `--subtle`    | `#b4c6ed` | `#222275` |
| `Gradient control/Gradient 200` | `--logo-glow` | `#b4c6ed` | `#171724` |
| `Primary 500`                   | `--accent`    | `#133cd0` | —         |
| `Primary 900`                   | `--logo-ink`  | `#040530` | —         |

Figma has no dark value for `Primary 500` and `Primary 900`. The dark values
for `--accent` and `--logo-ink` come from the dark logo wordmark, which reads
`#b4c6ed`.

Light nodes: `56:30883` nav, `56:31060` footer, `56:30890` hero.
Dark nodes: `52:26047` nav, `52:26230` footer, `52:26054` hero.

Figma has no variable for the dashed circle and the line. Both read `#b4c6ed`
in the light node and `#133cd0` in the dark one, which is `--dash`.

## Themes

The theme follows the operating system. A `data-theme` attribute on `<html>`
overrides it. Set `data-theme="dark"` or `data-theme="light"`. There is no
theme switch yet.

## Adding a token

1. Add the semantic token to `:root` in `global.css`.
2. Add the dark value to both dark blocks.
3. Map it in the `@theme inline` block.
4. Add a row to the tables above.
