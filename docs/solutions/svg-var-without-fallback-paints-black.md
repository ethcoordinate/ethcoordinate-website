# A `var()` with no fallback paints an SVG black

## Symptom

The super icons of the about section read correctly on the page. The same files
opened on their own, or through an `<img src="...">`, carried a grey haze and
showed the square edge of the alpha mask.

## Cause

The halo gradient of each icon reads `stop-color="var(--icon-glow-from)"`. The
token lives on `:root` in `global.css`. A file opened on its own has no page
CSS, and an external SVG in an `<img>` is a separate document that cannot read
the CSS of its host either. The `var()` then resolves to nothing, which makes
the declaration invalid at computed value time. `stop-color` falls back to its
initial value, which is black. The mask that the gradient feeds turns opaque,
so the mask square appears.

## Fix

Give every token in an SVG a fallback. Use the light hex.

```svg
stop-color="var(--icon-glow-from, #b4c6ed)"
```

The page still overrides the fallback with the token, so the icon keeps
following the theme.

This applies to any SVG that carries a token. Check a new asset by opening it
on its own.
