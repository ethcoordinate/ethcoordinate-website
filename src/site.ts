import type { SiteShape } from "./site-types";

/** The only source of truth for site copy. Edit text here, not in components. */
export const site = {
	name: "EthCoordinate",
	seo: {
		title: "EthCoordinate — Helping Ethereum Move Together",
		description:
			"EthCoordinate is the Ethereum coordination org that grew out of EthStaker. We support home stakers, facilitate core protocol coordination, steward Forkcast, and advance protocol economics.",
		/* Exported from the Figma "X cover" frame. Lives in public/. */
		image: "/og.jpg",
		imageAlt: "Helping Ethereum move together",
		twitter: "@ethcoordinate",
	},
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
		ctaArrow: "↓",
		emailHref: "mailto:team@ethcoordinate.com",
		emailLabel: "team@ethcoordinate.com",
		emailArrow: "↗",
	},
	about: {
		number: "01.",
		heading: "What’s\nEth\nCoordinate?",
		/* The `<b>` tag marks the name. The component renders these as HTML. */
		body: [
			"<b>EthCoordinate</b> is the natural evolution of EthStaker, the nonprofit that spent the past several years supporting home stakers and other independent participants in Ethereum’s consensus mechanism.",
			"As the ecosystem shifted in 2026, new organizational gaps opened up, and that same team launched <b>EthCoordinate</b> to close them, broadening their scope with new mission-aligned members along the way.",
		],
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
		heading: "What\nWe do",
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
		heading: "Who’s\nHere",
		intro:
			"Our team is made up of Ethereum professionals across research, protocol development, and community.",
		/* `imageUrl` takes any image address. `socials` holds the links of the
		   member; `key` picks the icon: "x", "telegram", or "discord". Images
		   and links are placeholders. */
		members: [
			{
				number: "01",
				name: "Nixo",
				role: "Founder",
				bio: "Decentralization / Privacy / Open source maxi.",
				imageUrl:
					"https://pbs.twimg.com/profile_images/1936868987662454784/9IkpiM_w_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/nixorokish" }],
			},
			{
				number: "02",
				name: "Patricio Worthalter",
				role: "Founder",
				bio: "Founder - Proof of Attendance Protocol @poapxyz",
				imageUrl:
					"https://pbs.twimg.com/profile_images/1544690687714672640/3TxH8_vW_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/worthalter" }],
			},
			{
				number: "03",
				name: "Butta",
				role: "Stakeholder coordination",
				bio: "@ethStaker | @beaconcha_in",
				imageUrl:
					"https://pbs.twimg.com/profile_images/1194253131401629698/EyjkSMoX_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/Butta_eth" }],
			},
			{
				number: "04",
				name: "Jerome de Tychey",
				role: "Ecosystem builder",
				bio: "Driving Ethereum ecosystem & DeFi growth, one block at a time.",
				imageUrl:
					"https://pbs.twimg.com/profile_images/1955288324760797184/nbPDswHM_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/jdetychey" }],
			},
			{
				number: "05",
				name: "Yorick",
				role: "Protocol coordination",
				bio: "Member of ethstaker; maintain Eth Docker.",
				imageUrl:
					"https://pbs.twimg.com/profile_images/606610639663058944/5TXYbPk-_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/yorickdowne" }],
			},
			{
				number: "06",
				name: "Marc",
				role: "dev",
				bio: "Building http://forkcast.org",
				imageUrl:
					"https://pbs.twimg.com/profile_images/1484303206402379777/pJ1VfANi_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/wolovim" }],
			},
			{
				number: "07",
				name: "Franco Balzani",
				role: "Project manager and Operations",
				bio: "A decade around projects.",
				imageUrl:
					"https://pbs.twimg.com/profile_images/2086789004343611392/P-SBAQNM_400x400.jpg",
				socials: [{ key: "x", href: "https://x.com/holafiasco" }],
			},
		],
	},
	faq: {
		number: "04.",
		heading: "FAQ",
		lead: "A few things worth knowing.",
		intro: "We’re early, so some answers will evolve. Here’s where things stand today.",
		items: [
			{
				question: "What is EthCoordinate?",
				answer:
					"EthCoordinate is an independent Ethereum organization focused on helping protocol contributors and ecosystem teams understand one another, align around shared work, and make progress together.",
			},
			{
				question: "Who exactly is on EthCoordinate?",
				answer:
					"The current active members carrying everyday responsibilities are: Nixorokish, Butta, Patricio Worthalter, Yorick, Jerome de Tychey, Marc Garreau and Franco Balzani. Several affiliates help in specific initiatives that fit their availability. Some are: Nolan Ross (Lamboshi), Waqwaqwaq, Valefar, Remy Roy, Sam Coffey, Colfax Selby and a small handful that want to remain unnamed.",
			},
			{
				question: "How are you funded?",
				answer:
					"We have collected donations over the years and managed to spend the funds very carefully. Some of our main donors were the Ethereum Foundation, Optimism’s RPGF program, Octant, Arbitrum DAO, Rocketpool, Gitcoin and several individuals.",
			},
			{
				question: "Why did you rename?",
				answer:
					"EthStaker as a name was too limiting given the scope of tasks we were signing up for.",
			},
			{
				question: "What are your main initiatives?",
				answer:
					"We continue doing everything EthStaker was doing and we also help with running Forkcast, supporting cryptoeconomic research and with general coordination tasks.",
			},
			{
				question:
					"How do you interact with other organizations like Ethlabs and the Ethereum Foundation?",
				answer:
					"We take specifically friendly positions with all the organizations and individuals that steward Ethereum.",
			},
			{
				question: "How do you manage conflict of interests?",
				answer:
					"EthCoordinate as an organization has minimal basic opinions (see mission, vision and values) and it’s a requirement for all members to be aligned with them. The individual members are allowed to engage in any kind of activity that’s not in conflict with the published basic opinions.",
			},
			{
				question:
					"What will EthCoordinate’s relationship be with the roadmap and development decisions?",
				answer:
					"EthCoordinate exists to make coordination smoother. We will avoid taking positions in roadmap items or primary research of the kind that happens inside other organizations like Ethlabs and the Ethereum Foundation.",
			},
			{
				question: "How will EthCoordinate handle conflicts of interest in ACD coordination?",
				answer:
					"All the members of EthCoordinate believe that credible neutrality is one of the main distinctive features of Ethereum and we strive to preserve it. If during any initiative (ACD or else) a member is exposed to conflict, a mechanism will have to be set up to not contest the neutrality of the outcome.",
			},
			{
				question: "How does EthCoordinate plan to elevate ETH as a store of value (SoV)?",
				answer:
					"ETH being understood as a globally accessible store of value is in our vision. We will deploy our resources responsibly for this vision to become true.",
			},
			{
				question:
					"What does this change mean for the continuation of the existing solo staker support and the general industry topics that EthStaker historically covered?",
				answer:
					"Holding the community of home stakers together remains a top priority of EthCoordinate.",
			},
		],
	},
	/* CSS repeats these phrases in one endless uppercase line. */
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
	/* The social profiles of the org. The footer and the JSON-LD read this
	   list. */
	networks: [
		{ key: "x", label: "X", href: "https://x.com/ethcoordinate" },
		{ key: "telegram", label: "Telegram", href: "https://t.me/ethcoordinate" },
		{ key: "discord", label: "Discord", href: "https://discord.com/invite/ethstaker" },
	],
	footer: {
		tagline: "Coordination is infrastructure.",
		copyright: "© 2026 EthCoordinate",
	},
} as const satisfies SiteShape;
