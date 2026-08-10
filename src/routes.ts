/* The only source of truth for routes. Import from it. Do not write a
   literal path. The site is one page, so a route is an anchor to a
   section id. */
export const routes = {
	home: "/",
	about: "#about",
	initiatives: "#what-we-do",
	team: "#team",
	faq: "#faq",
} as const;
