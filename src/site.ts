/** The only source of truth for site copy. Edit text here, not in components. */
export const site = {
	name: "EthCoordinate",
	title: "EthCoordinate",
	description: "Coordination is infrastructure.",
	home: "Back to top",
	nav: [
		{ href: "#about", label: "About" },
		{ href: "#what-we-do", label: "What we do" },
		{ href: "#team", label: "Team" },
		{ href: "#faq", label: "FAQ" },
	],
	footer: {
		tagline: "Coordination is infrastructure.",
		copyright: "© 2026 EthCoordinate",
	},
} as const;
