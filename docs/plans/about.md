# About

Build the first section below the ticker from Figma file
`EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part         |
| ---------- | ------------ |
| `56:30927` | About, light |
| `52:26093` | About, dark  |
| `56:32767` | About, small |

The dark node holds the same layout as the light one. Only the text color
changes, and the `--body` token already flips it. The section needs no new
color.

## Layout

Desktop is one row. The label column is 480px wide. The copy column takes the
rest and splits into two paragraphs. The gap is 20px, the same as the gap
between the two paragraphs is 24px. Small screens stack all three blocks in one
column.

## Steps

1. Put the heading and the two paragraphs in `src/site.ts`. The heading holds a
   newline after each word, because Figma breaks it that way.
2. Build `about.astro`. Static markup, no script, no new token.
3. Mount it in `index.astro`, after the ticker. Drop `#about` from the
   placeholder loop.

## Purpose cards

The second band of the section holds three cards: `Mission`, `Vision`, and
`Value`.

| Node       | Part         |
| ---------- | ------------ |
| `56:30937` | Cards, light |
| `52:26103` | Cards, dark  |
| `56:32777` | Cards, small |

Desktop is one row of three equal cards. Each card puts a 116px icon beside a
244px column of text. Small screens stack the three cards and drop the icon to
80px.

### Icons

Each icon lives in `src/icons/` as an SVG. `about.astro` imports the file, so
Astro writes the SVG into the page. The icon then reads the theme tokens. One
file serves both themes.

Export each icon from its own node, not from the node inside the section. The
standalone nodes are the source of truth for the artwork.

| Node       | Icon    |
| ---------- | ------- |
| `91:36415` | Vision  |
| `91:36416` | Mission |
| `91:36417` | Value   |

Four edits turn a raw export into an asset.

1. Delete the three background rectangles that Figma adds around the node.
2. Delete the noise filter. See
   `docs/solutions/figma-noise-filter-renders-as-speckle.md`.
3. Rename every id from `_52_22923` to the name of the icon. Ids are global to
   the page, and the logo sprite already uses the Figma suffix.
4. Point the three stops of the halo gradient at `--icon-glow-*`. Give every
   one of them the light hex as a fallback. Without the fallback the file is
   black outside the page, because a `var()` that resolves to nothing makes
   `stop-color` fall back to its initial value. Every other color in the icon
   is `#133cd0` in both themes.

One command does all four. Run it on a fresh export.

```sh
perl -0pi -e '
  s{<rect width="\d+" height="\d+" fill="#1E1E1E"/>}{}g;
  s{<rect width="\d+" height="\d+" transform="translate\([^)]*\)" fill="(black|white)"/>}{}g;
  s{<feTurbulence.*?</feMerge>}{}gs;
  s{_52_22923}{_NAME}g;
  s{stop-color="#B4C6ED" stop-opacity="0"}{stop-color="var(--icon-glow-to, #b4c6ed)" stop-opacity="0"}g;
  s{stop-color="#B4C6ED"}{stop-color="var(--icon-glow-from, #b4c6ed)"}g;
  s{stop-color="#5D8EF1"}{stop-color="var(--icon-glow-mid, #5d8ef1)"}g;
' src/icons/NAME.svg
```

Open the file on its own to check it. It must read the same there as on the
page.

### Side glow

Figma draws a blurred ellipse just off each side edge of the band. A radial
gradient carries the same falloff, so the band needs no artwork. The
`bg-about-glow` utility holds both blobs. Their centers sit outside the box, so
only the tail of each one reaches the text.

## Bold words

Each paragraph names `EthCoordinate` in bold. The copy carries the `<b>` tag
and the component renders it with `set:html`. The copy stays in one file, which
is the rule, and the component stays free of literal text.
