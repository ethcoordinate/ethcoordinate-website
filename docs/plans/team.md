# Team

Build the third section below the what we do band from Figma file
`EPr1BWJ9CL7obLdsPAOKlE`.

## Source nodes

| Node       | Part        |
| ---------- | ----------- |
| `56:30979` | Team, light |
| `52:26145` | Team, dark  |
| `56:32819` | Team, small |

The section is number `03.`, under the heading `Who's / Here`.

## Layout

Desktop is a four column grid. Eight cards fill two rows of four. The columns
carry no gap. Each card holds its own left border and its own bottom border, so
the two rules meet across the grid and read as one unbroken line.

The card is fluid. The circle takes the width the column gives it and shrinks
below the Figma width of 181.667px. A narrow laptop column therefore never
pushes the number out of the card. The name uses `clamp`, so it holds one line
at every width. Every bio in a row then starts at the same height.

Small screens scroll the row sideways. `snap-x snap-mandatory` makes each card a
stop. The row carries a left padding of 60px and takes the same amount back with
`scroll-pl-15`. Without the padding the scroll box cuts the marker and the glow,
because both sit outside the card. Without `scroll-pl-15` a stop lands 60px off
the margin of the page. The row bleeds off the right edge, so the next card
shows that there is more.

The bottom rule of the small layout belongs to the wrapper, not to the row. A
scrolling box carries its own border away.

## Decoration

Every decoration belongs to the card, so it follows the card at every width.

1. **The dashed square.** One inline SVG behind the circle, turned on its
   corner. It rides the circle, so it follows every width.
2. **The markers.** Two markers of nested squares sit on the left border. The
   second one belongs to the text block, so it holds its place beside the name.
3. **The glow.** A soft blob left of and below the circle. It bleeds over the
   border of the card.

This section holds no dot field.

## Photos

The photos live in `src/assets/team/` as placeholders from picsum.photos. A glob
loads them and sorts by file name, so `member-1.jpg` pairs with the first
member. Replace the files and keep the names.

Each photo renders through the `Image` component of `astro:assets` with
`loading="lazy"`, because the section sits below the fold.

## Token

The section adds no token. `bg-avatar-glow` reads `--about-glow`, which the
about band already holds.

## Steps

1. Put the number, the heading, the intro, the networks, and the eight members
   in `src/site.ts`.
2. Add `bg-avatar-glow` to `global.css` and to `docs/tokens.md`.
3. Save the eight placeholder photos to `src/assets/team/`.
4. Build `team.astro`. Static markup, no script.
5. Mount it in `index.astro`, after the what we do section. Drop `#team` from
   the placeholder loop.

## Networks

Every member shares one set of social addresses. `site.ts` holds the set once.
Drop an entry to drop that pill from every card. The key of an entry names the
icon file in `src/icons/`.
