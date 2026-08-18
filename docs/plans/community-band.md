# Community band

A "Join us" section on the home page. It carries the two open channels and
the numbers that say how big the community is.

## Steps

1. Add `routes.join`.
2. Add `site.community` with the copy, the stats and the two channels. Hold
   the Discord and the Reddit address in one module constant each, so the
   footer, the JSON-LD and this band read the same string.
3. Add `src/components/community.astro`.
4. Render it between the team and the FAQ.

## Decisions

- **Place.** Between the team and the FAQ. The page then reads: who we are,
  how to join, what you may still want to ask, then the open channel.
- **The team number is derived.** The component counts `team.members`, so the
  number cannot drift from the list the same page renders.
- **Discord is 25,000.** The figure comes from the org. Change it in
  `site.ts`; it appears once.
- **Reddit carries no number.** We have no sourced subscriber count, so the
  card links and describes but does not count. Add a third stat when the
  number is known.
- **No new icon.** The system holds exactly three glyphs, and Reddit is not
  one of them, so both channels are text rows with a typed arrow.
- **Not in the nav.** The bar is the four items of the handoff. This section
  is reachable at `#join`.
