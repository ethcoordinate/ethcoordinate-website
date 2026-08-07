# A Figma noise effect renders as speckle in the browser

## Symptom

The three super icons of the about section looked dirty. The blue faces of the
`Vision` and `Value` icons carried a coarse grey speckle that the Figma frame
does not show. The icons read as a low quality image, not as vector art.

## Cause

Figma exports its `NOISE` effect as an `feTurbulence` chain inside the SVG
filter. Chrome resolves that chain at its own resolution. The grain then comes
out much coarser than the grain Figma paints, so it reads as artifacting
instead of texture.

## Fix

Delete the noise chain from each exported icon. Keep the `feGaussianBlur`,
which is the part of the effect that carries the look.

```sh
perl -0pi -e 's{<feTurbulence.*?</feMerge>}{}gs' src/icons/*.svg
```

The `feGaussianBlur` that follows the chain has no `in` attribute, so it falls
back to the last result, which is the `feBlend` above it. The blur therefore
keeps working after the delete.

Apply this to every icon exported from Figma.
