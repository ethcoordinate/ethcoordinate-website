/* The only source of truth for routes. Import from it. Do not write a
   literal path. A key matches its file in `src/pages/`. */
export const routes = {
	home: "/",
	about: "/about",
	initiatives: "/initiatives",
	team: "/team",
	faq: "/faq",
} as const;
