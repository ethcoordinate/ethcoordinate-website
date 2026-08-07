# An SVG sprite hidden with `display: none` renders nothing

## Symptom

`Logo.astro` renders `<use href="#ec-logo">`. The logo took no space and showed
nothing. The same artwork rendered correctly as a standalone `.svg` file and as
an inline `<svg>`.

## Cause

Two separate faults.

1. The sprite `<svg>` used the Tailwind `hidden` class, which is
   `display: none`. Chrome does not build the render tree for that subtree. The
   logo uses `<filter>` and `<linearGradient>` elements. Chrome cannot resolve
   those references from a `display: none` subtree, so `<use>` drew nothing.
2. `Logo.astro` set `class="h-9 w-auto"` on an `<svg>` that had a `viewBox` but
   no `width` and `height` attributes. The element then had no intrinsic size,
   so `w-auto` computed to `0`.

## Fix

1. Hide the sprite with `width="0" height="0"` instead of `display: none`.
2. Set `width="189" height="44"` on the `<svg>` in `Logo.astro`. The intrinsic
   ratio then makes `w-auto` work with any `h-*` class.
