# Safari paints a box behind the about icons

## Symptom

The three super icons of the about section showed a hard edged box in Safari.
The box held the blue halo that must fade out. Chrome rendered the icons
correctly. WebKit trunk did not reproduce the bug.

## Cause

The Figma SVG export wraps a `feGaussianBlur` filter inside an SVG `mask`
with an alpha gradient. Safari drops the mask on a group that holds a filter.
The blur then paints to the edge of its filter region, which shows as a box.

## Fix

Do not put an SVG `mask` above an SVG filter. Split the icon into two SVG
files: a blurred back copy and a sharp front copy with the halo. Stack them
and apply the vertical fade of each copy as a CSS mask on the `svg` element.
CSS masks composite after SVG filters in every engine.

- The layer files live in `src/icons/*-back.svg` and `src/icons/*-front.svg`.
- The fades are the `mask-icon-*` utilities in `src/styles/global.css`.
- `src/components/about.astro` stacks the two layers.

Apply this to every Figma asset that stacks a mask on a blur filter. Do not
flatten such an asset to a PNG instead: the halo colors flip with the theme
through the `--icon-glow-*` tokens, and a PNG cannot follow them.
