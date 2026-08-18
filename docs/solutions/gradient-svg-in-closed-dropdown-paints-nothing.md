# Gradient SVG in a closed dropdown paints nothing

## Symptom

The EthStaker mark rendered inside the open Products dropdown but painted
nothing in the "What we run" grid on the home page. The box held its space;
the glyph was invisible.

## Cause

The mark was an inline SVG component, so every column inlined its own copy
with the same gradient id. `url(#...)` resolves to the first id in the
document. That first copy sat inside the closed nav panel, which is
`display: none`, and a paint server inside a `display: none` subtree is
unusable. Every later copy referenced it and painted nothing.

## Fix

The mark lives in `logo-sprite.astro` as a `<symbol>` with a unique gradient
id, and the columns render `<use href="#es-mark">`. The sprite is hidden with
zero size, not `display: none`, so its paint servers resolve. This is the
same rule the EC logo already follows; see
`svg-sprite-hidden-with-display-none.md`.

## Check

Open the home page without touching the nav. The EthStaker mark must show
beside the column title in both themes.
