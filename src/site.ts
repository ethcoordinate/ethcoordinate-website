import butta from "./assets/team/butta.jpg";
import francoBalzani from "./assets/team/franco-balzani.jpg";
import jeromeDeTychey from "./assets/team/jerome-de-tychey.jpg";
import lamboshi from "./assets/team/lamboshi.jpg";
import marc from "./assets/team/marc.jpg";
import nixo from "./assets/team/nixo.jpg";
import patricioWorthalter from "./assets/team/patricio-worthalter.jpg";
import yorick from "./assets/team/yorick.jpg";
import { routes } from "./routes";
import type { SiteShape } from "./site-types";

/** The only source of truth for site copy. Edit text here, not in components. */
export const site = {
	name: "EthCoordinate",
	seo: {
		title: "EthCoordinate — A coordination engine for Ethereum",
		description:
			"Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
		/* Exported from the Figma "X cover" frame. Lives in public/. */
		image: "/og.jpg",
		imageAlt: "Helping Ethereum move together",
		twitter: "@ethcoordinate",
	},
	home: "Back to top",
	menu: "Menu",
	menuClose: "Close menu",
	nav: [
		{ href: routes.about, label: "About" },
		{ href: routes.initiatives, label: "Initiatives" },
		{ href: routes.team, label: "Team" },
		{ href: routes.faq, label: "FAQ" },
	],
	hero: {
		/* Figma sets one word per line. The newlines keep that shape. */
		eyebrow: "AN\nETHEREUM\nCOORDINATION\nORG",
		titleTop: "A coordination engine",
		titleBottom: "for Ethereum",
		body: "Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
		ctaHref: routes.about,
		ctaLabel: "About",
		emailHref: "mailto:team@ethcoordinate.com",
		emailLabel: "team@ethcoordinate.com",
		emailArrow: "↗",
	},
	about: {
		number: "",
		heading: "About",
		/* The `<b>` tag marks the name. The component renders these as HTML. */
		body: [
			"<b>EthCoordinate</b> is the natural evolution of EthStaker, the nonprofit that spent the past several years supporting home stakers and other independent participants in Ethereum’s consensus mechanism.",
			"As the ecosystem shifted in 2026, new organizational gaps opened up, and that same team launched <b>EthCoordinate</b> to close them, broadening their scope with new mission-aligned members along the way.",
		],
	},
	whatWeDo: {
		number: "",
		heading: "Initiatives",
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
		number: "",
		heading: "Team",
		intro:
			"Our team is made up of Ethereum professionals across research, protocol development, and community.",
		/* `image` takes an import from `src/assets/team/`. `socials` holds the
		   links of the member; `key` picks the icon: "x", "telegram", or
		   "discord". A `bio` may hold a markdown link `[label](url)`; a bare
		   domain also becomes a link. */
		members: [
			{
				number: "01",
				name: "Nixo",
				role: "Founder",
				bio: "Former team lead EF Protocol Support, long-time EthStaker member.",
				image: nixo,
				socials: [{ key: "x", href: "https://x.com/nixorokish" }],
			},
			{
				number: "02",
				name: "Patricio Worthalter",
				role: "Founder",
				bio: "Recovering founder of POAP.",
				image: patricioWorthalter,
				socials: [{ key: "x", href: "https://x.com/worthalter" }],
			},
			{
				number: "03",
				name: "Butta",
				role: "Stakeholder coordination",
				bio: "Co-founder of Beaconchain.",
				image: butta,
				socials: [{ key: "x", href: "https://x.com/Butta_eth" }],
			},
			{
				number: "04",
				name: "Jerome de Tychey",
				role: "Ecosystem builder",
				bio: "Driving Ethereum ecosystem & DeFi growth, one block at a time.",
				image: jeromeDeTychey,
				socials: [{ key: "x", href: "https://x.com/jdetychey" }],
			},
			{
				number: "05",
				name: "Yorick",
				role: "Protocol coordination",
				bio: "Exited founder of Cryptomanufaktur.",
				image: yorick,
				socials: [{ key: "x", href: "https://x.com/yorickdowne" }],
			},
			{
				number: "06",
				name: "Marc",
				role: "dev",
				bio: "Building forkcast.org",
				image: marc,
				socials: [{ key: "x", href: "https://x.com/wolovim" }],
			},
			{
				number: "07",
				name: "Lamboshi",
				role: "Advisor",
				bio: "Community leader at @ethstaker.",
				image: lamboshi,
				socials: [{ key: "x", href: "https://x.com/L_Nakaghini" }],
			},
			{
				number: "08",
				name: "Franco Balzani",
				role: "Project manager and Operations",
				bio: "A decade around projects.",
				image: francoBalzani,
				socials: [{ key: "x", href: "https://x.com/holafiasco" }],
			},
		],
	},
	faq: {
		number: "",
		heading: "FAQ",
		lead: "A few things worth knowing.",
		intro: "We're just getting started, so consider this an evolving FAQ.",
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
	/* The closing band, between the page content and the footer. */
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
