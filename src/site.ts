/** The only source of truth for site copy. Edit text here, not in components. */
export const site = {
	name: "EthCoordinate",
	title: "EthCoordinate",
	description: "Coordination is infrastructure.",
	home: "Back to top",
	menu: "Menu",
	menuClose: "Close menu",
	nav: [
		{ href: "#about", label: "About" },
		{ href: "#what-we-do", label: "What we do" },
		{ href: "#team", label: "Team" },
		{ href: "#faq", label: "FAQ" },
	],
	hero: {
		/* Figma sets one word per line. The newlines keep that shape. */
		eyebrow: "AN\nETHEREUM\nCOORDINATION\nORG",
		titleTop: "Helping Ethereum",
		titleBottom: "Move together",
		body: "We facilitate the interaction between Ethereum’s stakeholders to accelerate the network’s adoption, combining technical rigor with pragmatism.",
		ctaHref: "#what-we-do",
		ctaLabel: "What we do",
		/* The arrow is a separate element, because it moves on hover. */
		ctaArrow: "↓",
		emailHref: "mailto:team@ethcoordinate.com",
		emailLabel: "team@ethcoordinate.com ↗",
	},
	/* The ticker repeats these phrases in one endless line. CSS makes them
	   uppercase. */
	ticker: [
		"Make context travel",
		"Connect the dots",
		"Reduce coordination cost",
		"Move the protocol forward",
	],
	footer: {
		tagline: "Coordination is infrastructure.",
		copyright: "© 2026 EthCoordinate",
	},
} as const;
