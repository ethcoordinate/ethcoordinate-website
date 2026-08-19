/* The only source of truth for routes. Import from it. Do not write a
   literal path. A route that starts with `#` is a section of the home page.
   An address on another host lives in `site.ts`, next to the copy that
   names it. */
export const routes = {
	home: "/",
	top: "#top",
	about: "#about",
	initiatives: "#what-we-do",
	properties: "#properties",
	team: "#team",
	faq: "#faq",
	join: "#join",

	/* The pages of the restructure. See docs/plans/nav-restructure.md. */
	stakerSupport: "/our-work/staker-support",
	forkcast: "/products/forkcast",

	/* The handoff links these from the nav and does not design them. Each one
	   needs a page before the nav ships. */
	products: "/products",
	survey: "/products/survey",
	wagyuKeyGen: "/products/wagyu-key-gen",
	rhinoReview: "/products/rhino-review",
	research: "/research",
	grants: "/grants",
	events: "/events",
	stakingGathering: "/events/staking-gathering",
	workshops: "/events/workshops",
	officeHours: "/events/office-hours",
	talks: "/events/talks",
} as const;
