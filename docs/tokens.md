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
| `--blue-500`    | `#133cd0` |
| `--blue-900`    | `#040530` |
| `--ink-900`     | `#171716` |
| `--ink-950`     | `#171724` |
| `--indigo-800`  | `#222275` |
| `--white`       | `#ffffff` |

## Semantic tokens

| Token          | Utility           | Role                       | Light          | Dark            |
| -------------- | ----------------- | -------------------------- | -------------- | --------------- |
| `--surface`    | `bg-surface`      | Page and shell background  | `--white`      | `--ink-950`     |
| `--body`       | `text-body`       | All body text              | `--ink-900`    | `--white`       |
| `--subtle`     | `border-subtle`   | Hairline borders           | `--blue-200`   | `--indigo-800`  |
| `--accent`     | `text-accent`     | Hover and focus ring       | `--blue-500`   | `--blue-200`    |
| `--logo-ink`   | used by the logo  | Dark half of the wordmark  | `--blue-900`   | `--blue-200`    |
| `--logo-glow`  | used by the logo  | Soft halo behind the mark  | `--blue-200`   | `--ink-950`     |

`LogoSprite.astro` reads `--logo-ink` and `--logo-glow` inside the SVG, so the
logo follows the theme without a second asset.

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

Light nodes: `56:30883` nav, `56:31060` footer.
Dark nodes: `52:26047` nav, `52:26230` footer.

## Themes

The theme follows the operating system. A `data-theme` attribute on `<html>`
overrides it. Set `data-theme="dark"` or `data-theme="light"`. There is no
theme switch yet.

## Adding a token

1. Add the semantic token to `:root` in `global.css`.
2. Add the dark value to both dark blocks.
3. Map it in the `@theme inline` block.
4. Add a row to the tables above.
