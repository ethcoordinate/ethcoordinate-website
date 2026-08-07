/* Figma writes one bio and repeats it in all eight cards. Only the first one
   is real. */
const bio =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";

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
	about: {
		number: "01.",
		/* Figma breaks the heading after each word. The newlines keep that shape. */
		heading: "What’s\nEth\nCoordinate?",
		/* The `<b>` tag marks the name. The component renders these as HTML. */
		body: [
			"<b>EthCoordinate</b> is the natural evolution of EthStaker, the nonprofit that spent the past several years supporting home stakers and other independent participants in Ethereum’s consensus mechanism.",
			"As the ecosystem shifted in 2026, new organizational gaps opened up, and that same team launched <b>EthCoordinate</b> to close them, broadening their scope with new mission-aligned members along the way.",
		],
		/* Three cards below the copy. `about.astro` pairs each one with an icon. */
		purpose: {
			mission: {
				title: "Mission",
				body: "Facilitate the interaction between the stakeholders of the ecosystem to accelerate the adoption of the <b>Ethereum</b> network.",
			},
			vision: {
				title: "Vision",
				body: "<b>Ethereum mainnet</b> is the bedrock for scaling humanity’s productivity, and <b>ETH</b> is the asset that aligns the incentives of everyone building on it.",
			},
			value: {
				title: "Value",
				body: "Technical rigor combined with pragmatism, so <b>Ethereum</b> stays the most accessible and credibly neutral global blockchain.",
			},
		},
	},
	whatWeDo: {
		number: "02.",
		/* Figma breaks the heading after the first word. The newline keeps that
		   shape. */
		heading: "What\nWe do",
		/* Each title wraps on its own at the 240px column width, so no title
		   carries a newline. */
		items: [
			{
				title: "Staker support",
				body: "We maintain a safe, informed space for independent stakers to stay engaged with the network.",
			},
			{
				title: "Protocol coordination",
				body: "We facilitate coordination around core protocol development and its adjacent efforts.",
			},
			{
				title: "Forkcast",
				body: "We develop and steward Forkcast, the most-used platform for tracking research and engineering initiatives on Ethereum’s core protocol.",
			},
			{
				title: "Protocol economics",
				body: "We champion research and implementation of changes to core protocol economics.",
			},
			{
				title: "Open-source tooling",
				body: "We maintain the open-source tools and documentation used by participants of the consensus set.",
			},
		],
	},
	team: {
		number: "03.",
		/* Figma breaks the heading after the first word. The newline keeps that
		   shape. */
		heading: "Who’s\nHere",
		intro:
			"Our team is made up of Ethereum professionals across research, protocol development, and community.",
		/* One set of addresses for the whole team. Every card shows the same
		   pills, in this order. Drop an entry to drop that pill everywhere. The
		   key names the icon file. Addresses are placeholders. */
		networks: [
			{ key: "x", label: "X", href: "https://x.com/ethcoordinate" },
			{ key: "telegram", label: "Telegram", href: "https://t.me/ethcoordinate" },
			{
				key: "discord",
				label: "Discord",
				href: "https://discord.gg/ethcoordinate",
			},
		],
		/* Every member below is a placeholder. Figma carries no real names. */
		members: [
			{
				number: "01",
				name: "Mara Chen",
				role: "Protocol research",
				bio: "Mara turns dense protocol conversations into shared maps, useful questions, and clear next steps.",
			},
			{
				number: "02",
				name: "Ana Ruiz",
				role: "Staker support",
				bio,
			},
			{
				number: "03",
				name: "Tomas Berg",
				role: "Protocol economics",
				bio,
			},
			{
				number: "04",
				name: "Iris Okafor",
				role: "Open-source tooling",
				bio,
			},
			{
				number: "05",
				name: "Noah Vance",
				role: "Protocol coordination",
				bio,
			},
			{
				number: "06",
				name: "Lena Adler",
				role: "Community",
				bio,
			},
			{
				number: "07",
				name: "Yuki Sato",
				role: "Forkcast",
				bio,
			},
			{
				number: "08",
				name: "Omar Haddad",
				role: "Protocol research",
				bio,
			},
		],
	},
	faq: {
		number: "04.",
		heading: "FAQ",
		lead: "A few things worth knowing.",
		intro: "We’re early, so some answers will evolve. Here’s where things stand today.",
		/* Figma writes only the first answer. The rest wait for copy. */
		items: [
			{
				question: "What is EthCoordinate?",
				answer:
					"EthCoordinate is an independent Ethereum organization focused on helping protocol contributors and ecosystem teams understand one another, align around shared work, and make progress together.",
			},
			{
				question: "Are you part of the Ethereum Foundation?",
				answer:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			},
			{
				question: "What kinds of tools will you build?",
				answer:
					"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			},
			{
				question: "Can my team collaborate with EthCoordinate?",
				answer:
					"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			},
			{
				question: "How can I stay in the loop?",
				answer:
					"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			},
		],
	},
	/* The ticker repeats these phrases in one endless line. CSS makes them
	   uppercase. */
	ticker: [
		"Make context travel",
		"Connect the dots",
		"Reduce coordination cost",
		"Move the protocol forward",
	],
	/* The closing band, between the FAQ and the footer. */
	cta: {
		eyebrow: "Open channel",
		heading: "Working on something we should know about?",
		emailHref: "mailto:team@ethcoordinate.com",
		emailLabel: "team@ethcoordinate.com",
	},
	footer: {
		tagline: "Coordination is infrastructure.",
		copyright: "© 2026 EthCoordinate",
	},
} as const;
