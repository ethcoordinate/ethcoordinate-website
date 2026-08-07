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
		ctaLabel: "What we do ↓",
		emailHref: "mailto:team@ethcoordinate.com",
		emailLabel: "team@ethcoordinate.com ↗",
	},
	footer: {
		tagline: "Coordination is infrastructure.",
		copyright: "© 2026 EthCoordinate",
	},
} as const;
