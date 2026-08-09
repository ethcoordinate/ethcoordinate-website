# The hero paints slowly because its SVGs carry live filters

## Symptom

On load, the hero paints a washed-out grey frame for a split second. Load and
resize feel sluggish.

## Cause

`public/hero-glow.svg` and `public/hero-mark.svg` were Figma exports with live
SVG filters: `feTurbulence` fractal noise (3 octaves) plus `feGaussianBlur`
(stdDeviation 32) over a filter region up to 3420×2558. The glow painted at
200% of the hero height with `bg-cover`. The browser rasterizes SVG filters on
the CPU at device-pixel scale on every load and resize. That took hundreds of
milliseconds.

## Fix

Pre-render both SVGs once with headless Chrome at 2x. Save them as webp in
`src/assets/`. The hero imports the webp files and uses them as background
images. The pixels are identical. The filter cost is gone.

Rule of thumb: never ship a Figma SVG export that contains `feTurbulence` or a
large-region `feGaussianBlur`. Rasterize it.
