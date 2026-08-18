# Nav restructure and property split

Source: the design handoff `design_handoff_ethcoordinate_nav`. It covers one
navigation tier, the property split inside the Products dropdown, a tiering
system for products, and two bridge style pages.

## Scope

The handoff describes four screens. Three belong to this repo.

| Screen | Where it lands |
| --- | --- |
| Shared nav | `src/components/nav.astro` |
| 1a Homepage, the property grid | `src/components/properties.astro` |
| 1c Our work → Staker support | `src/pages/our-work/staker-support.astro` |
| 1d Bridge page → Forkcast | `src/pages/products/forkcast.astro` |
| 1e ethstaker.org | Not this repo. No change here. |

## Steps

1. Add the new routes to `src/routes.ts`.
2. Add the new copy and the new data to `src/site.ts`. The property list is one
   array. The Products dropdown and the homepage grid both read it.
3. Add the third party brand colors and the new gradients to
   `src/styles/global.css`. Record them in `docs/tokens.md`.
4. Add `src/components/property-column.astro`. The dropdown and the homepage
   render the same column.
5. Add `src/components/product-card.astro`. Screen 1c uses it. The card reads
   the semantic tokens only, so a second site can re-skin it.
6. Add `src/components/breadcrumb.astro`.
7. Rewrite `src/components/nav.astro` as one 72px bar with two dropdowns.
8. Add `src/layouts/base.astro`. Three pages need the same head.
9. Add the two new pages.
10. Give `src/components/cta.astro` props, because screen 1c sets its own copy.

## Decisions

- **One data source.** `site.properties` feeds the Products dropdown and the
  homepage "What we run" grid. The handoff calls the repetition deliberate.
- **Dropdown behaviour.** The panel opens on pointer enter and on `Enter` or
  `Space`. It closes on pointer leave, on `Escape`, and when focus leaves the
  bar. The prototype only wires hover.
- **Small screens.** The handoff does not design the phone layout. The bar
  keeps the popover menu it ships today, and the popover lists every dropdown
  item under its group.
- **Top level hrefs.** "Our work" points at `#what-we-do` and "About" points at
  `#about`, because both sections ship today. "Products" points at the new
  `#properties` anchor, which holds the same list as the dropdown.
- **Keyboard.** The trigger opens its panel on focus, so `Tab` walks straight
  into the panel and `Enter` still follows the link. `Space` and `ArrowDown`
  open it too. `Escape` closes it and returns focus to the trigger. See
  docs/solutions/dropdown-links-fall-out-of-tab-order.md.
- **EthCoordinate is the umbrella.** The array leads with EthCoordinate, so
  the Products dropdown opens on it and the home page renders it as a band
  above EthStaker and Forkcast. That is the shape of the org: one umbrella,
  two properties. The handoff draws three equal columns; this is the one place
  we depart from it, on request.
- **The initiatives sit inside the EthCoordinate box.** EthCoordinate runs
  them, so the five rows are the body of its band. The "What we run" heading
  and its intro are gone: the section is "Initiatives", and the box says the
  rest.
- **The band carries no link list.** The initiatives replace it, so the home
  page no longer shows the EthCoordinate rows or "All products". Both still
  open from the Products dropdown, which reads the same array.
- **The staking survey and the gathering moved to EthStaker.** They are
  staking work, so they sit with the staking tools in both the dropdown and
  the page. EthCoordinate keeps protocol economics and grants.
- **One EthStaker note.** The prototype gives the EthStaker column two notes:
  "Everything a home operator needs..." in the nav, and "Every operational
  staking page..." on the home page. The handoff table and the one array rule
  both name the second one, so that is the one we ship.
- **Routes without a page.** The handoff calls its route names proposals and
  does not design `/events`, `/products`, `/research`, `/grants`, or the four
  `/events/*` pages. The nav links to them. Each one needs a page before the
  nav ships.
