# What we do

Build the second section below the about band from Figma file
`EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part               |
| ---------- | ------------------ |
| `56:30957` | What we do, light  |
| `52:26123` | What we do, dark   |
| `56:32799` | What we do, small  |

The dark node holds the same layout as the light one. The text color flips
through `--body`. Only the dashed artwork needs a new token.

## Layout

Desktop is one row. The label column is 312px wide. The list takes the rest.
Each list item puts a 240px right aligned title beside the body copy, with a
60px gap. Figma draws the body at 386px. The code caps it there and lets it
shrink below 1440px, so the row never overflows a narrow laptop.

No title carries a newline. Every title wraps on its own at 240px, which gives
the same break as Figma.

Small screens stack the label, then each title over its body.

## Decoration

Figma draws a dashed circle and a dashed line that crosses it, both near the
right edge, plus seven blurred dots.

The circle and the line are one inline SVG that carries the 1440x690 Figma
frame. `preserveAspectRatio="xMaxYMid slice"` keeps the circle round and pins
it to the right edge, whatever height the copy gives the section. An inline SVG
also reads `--dash`, so one element serves both themes. A committed PNG could
not flip.

Every decoration is `hidden lg:block`, because the small node has none.

## Dots

`dots.astro` holds the dots of both the hero and this section. It takes a frame
and a list of centers. It carries three motions.

1. **The drift.** Two clocks per dot, one per axis, on `transform`. This came
   from the hero. See `docs/plans/hero.md`.
2. **The pointer parallax.** One `pointermove` listener writes `--pointer-x`
   and `--pointer-y` on `<html>`, each from -1 to 1 across the viewport. Every
   dot scales the pair by its own `--push`, so the field parallaxes instead of
   sliding as one block. A small dot pushes further, the same depth rule the
   drift uses.
3. **The centering.** Tailwind holds it.

Each motion needs its own CSS property, because a property holds one value. The
outer span spends `translate` on the centering and `transform` on the x drift.
The inner span spends `transform` on the y drift, which leaves its `translate`
free for the parallax. There is no fourth motion without a fourth element.

The listener is bound once per page, because Astro hoists the script even when
the component renders twice. It only binds on a fine pointer, so a touch drag
never moves the field. `prefers-reduced-motion` drops both the drift and the
parallax, but not the centering.

## Token

| Token    | Role                    | Light        | Dark         |
| -------- | ----------------------- | ------------ | ------------ |
| `--dash` | Dashed circle and line  | `--blue-200` | `--blue-500` |

## Steps

1. Put the number, the heading, and the five items in `src/site.ts`.
2. Add `--dash` to `global.css` and to `docs/tokens.md`.
3. Build `what-we-do.astro`. Static markup, no script.
4. Mount it in `index.astro`, after the about section. Drop `#what-we-do` from
   the placeholder loop.
