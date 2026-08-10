# Team photos flash an empty circle before load

## Symptom

Open the site at `/#team`. For a split second each avatar shows an empty
`bg-subtle` circle with the alt text on top. The photo then pops in.

## Cause

The team photos load with `loading="lazy"`. The page paints before the
image bytes arrive. While an image is empty, the browser renders its alt
text in `currentColor` over the placeholder circle.

## Fix

`src/components/team.astro` builds a tiny blurred copy of each photo at
build time with `sharp` (already installed as a dependency of Astro). It
resizes the photo to 24px, encodes it as webp, and inlines it as a base64
`background-image` on the circle. The real image covers it when it loads.
Each blur is about 360 bytes, so it ships inside the HTML and paints on
first render. `text-transparent` on the `Image` hides the alt text while
the image is empty; screen readers still read it.

Note: `sharp` needs the file path of the asset. `ImageMetadata` carries it
in `fsPath`, which exists at runtime but is not in the public type. Cast to
`typeof image & { fsPath: string }`.
