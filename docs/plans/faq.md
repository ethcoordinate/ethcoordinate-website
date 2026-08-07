# FAQ

Build the fourth section below the team band from Figma file
`EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part           |
| ---------- | -------------- |
| `56:30996` | Header, light  |
| `56:31004` | List, light    |
| `52:26166` | Header, dark   |
| `52:26174` | List, dark     |
| `56:32831` | FAQ, small     |

The two light nodes are one section. `56:30996` is the header block and
`56:31004` is the list block. They are not two states of the same block.

The section is number `04.`, under the heading `FAQ`.

## Layout

Desktop is one row of three blocks: the label column, the lead, and the intro.
The label column is 312px wide. A spacer repeats that width above the list, so
the list starts under the copy.

The lead sits in a wide column but wraps at a narrow line. That pair is what
breaks it into two lines.

Small screens stack the three blocks and then the list.

## Rows

A native `<details>` carries each row. All five share one `name`, so the group
opens one row at a time. The section therefore needs no script. The first row
opens on load, which is the state Figma draws.

Figma writes only the first answer. The other four hold lorem ipsum until the
copy arrives.

## Motion

The row animates its own height through `::details-content`. That needs
`interpolate-size: allow-keywords`, which `global.css` holds. A browser without
`::details-content` still opens the row, it only jumps.

The copy fades and rises on a shorter clock with a small delay. The row makes
room first, so the copy never rises into a box that is still opening.

The toggle is an inline SVG of two strokes. The upright stroke turns flat onto
the other one, so a plus becomes a minus without ever leaving the screen.

Reduced motion keeps the fade, which explains the change, and drops every move.

## Token

The section adds no token. The toggle reads `currentColor`, which resolves to
`--body`.

Figma binds the toggle mark to a grayscale value that does not flip with the
theme. The mark is therefore invisible on the dark surface. The code binds it to
`--body` instead. This is a fix of a design bug, not a port of the design.

## Decoration

The section holds none. No dots, no dashed shapes.

## Steps

1. Put the number, the heading, the lead, the intro, and the five items in
   `src/site.ts`.
2. Add `interpolate-size: allow-keywords` to `:root` in `global.css`.
3. Build `faq.astro`. Static markup, no script.
4. Mount it in `index.astro`, after the team section. Drop `#faq` from the
   placeholder loop.
