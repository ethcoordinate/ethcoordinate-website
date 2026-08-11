# The hero band stays dark in the light theme

## Symptom

In the light theme, the hero shows the dark background. The light-theme text
tokens still apply, so the dark heading is unreadable on the dark band. A
theme change does not repaint the band. It looks like a caching bug. It is
not.

## Cause

`hero-glow.webp` is transparent where its glows fade out. The visible base of
the band is `--hero-base` painted under the artwork. That token was pinned to
`--ink-950` in both themes, on the wrong assumption that the artwork is dark
in both themes. In Figma, both themes share the same glow artwork. Only the
base under it differs: white in light, ink-950 in dark.

## Fix

Flip `--hero-base` with the theme in `src/styles/global.css`: `--white` in
the light theme, `--ink-950` in both dark blocks. No new artwork is needed.

Rule of thumb: before you pin a token as theme-invariant, check whether the
artwork above it has an alpha channel. A transparent artwork takes its theme
from the base color under it.
