import butta from "./assets/team/butta.jpg";
import francoBalzani from "./assets/team/franco-balzani.jpg";
import jeromeDeTychey from "./assets/team/jerome-de-tychey.jpg";
import lamboshi from "./assets/team/lamboshi.jpg";
import marc from "./assets/team/marc.jpg";
import nixo from "./assets/team/nixo.jpg";
import patricioWorthalter from "./assets/team/patricio-worthalter.jpg";
import yorick from "./assets/team/yorick.jpg";
import { routes } from "./routes";
import type { MenuGroup, Product, SiteShape } from "./site-types";

/* The three properties we run work on. The Products dropdown and the home
   page "What we run" grid both read this array. The repetition is the point:
   the menu and the section are one list, rendered twice. */
const properties: readonly MenuGroup[] = [
	{
		name: "EthCoordinate",
		rule: "accent",
		note: "Programmes that live on this site.",
		items: [
			{
				label: "Protocol economics",
				note: "Issuance and rewards",
				href: routes.research,
			},
			{ label: "Grants", note: "What we fund", href: routes.grants },
		],
		link: { label: "All products", href: routes.products },
	},
	{
		name: "EthStaker",
		rule: "ethstaker",
		mark: "ethstaker",
		note: "Every operational staking page, plus the tools we keep running.",
		items: [
			{
				label: "Knowledge Base",
				note: "Docs and FAQ",
				href: "https://docs.ethstaker.org",
				external: true,
			},
			{
				label: "Eth Docker",
				note: "Run a validator with Docker",
				href: "https://ethdocker.com",
				external: true,
			},
			{
				label: "Wagyu Key Gen",
				note: "Generate deposit keys",
				href: routes.wagyuKeyGen,
			},
			{
				label: "Rhino Review",
				note: "Monthly staking newsletter",
				href: routes.rhinoReview,
			},
			{
				label: "Checkpoint sync",
				note: "Public sync endpoints",
				href: "https://ethstaker.org/checkpoint-sync",
				external: true,
			},
			{ label: "Office hours", note: "Weekly validator call", href: routes.events },
			{
				label: "Staking Landscape Survey",
				note: "Annual operator data",
				href: routes.survey,
			},
			{ label: "Staking Gathering", note: "Our yearly event", href: routes.events },
		],
		link: {
			label: "All EthStaker tools",
			href: "https://ethstaker.org",
			external: true,
		},
	},
	{
		name: "Forkcast",
		rule: "forkcast",
		mark: "forkcast",
		note: "Tracks research and engineering on Ethereum’s core protocol.",
		items: [
			{
				label: "Upgrades",
				note: "What ships next",
				href: "https://forkcast.org/upgrades",
				external: true,
			},
			{
				label: "EIP index",
				note: "Every proposal, by status",
				href: "https://forkcast.org/eips",
				external: true,
			},
			{
				label: "ACD notes",
				note: "All Core Devs summaries",
				href: "https://forkcast.org/acd",
				external: true,
			},
			{
				label: "Client status",
				note: "Who implemented what",
				href: "https://forkcast.org/clients",
				external: true,
			},
		],
		link: {
			label: "Open forkcast.org",
			href: "https://forkcast.org",
			external: true,
		},
	},
];

/* The two kinds of event we run: the ones we show up to, and the recorded
   programme on the EthStaker channel. */
const youtube = "https://www.youtube.com/@EthStaker";
const discord = "https://discord.com/invite/ethstaker";
const reddit = "https://www.reddit.com/r/ethstaker/";

const eventGroups: readonly MenuGroup[] = [
	{
		name: "Live events",
		rule: "accent",
		note: "Where we show up in person.",
		items: [
			{
				label: "Staking Gathering",
				note: "Our yearly operator event",
				href: routes.stakingGathering,
			},
			{
				label: "Workshops",
				note: "Hands-on validator sessions",
				href: routes.workshops,
			},
			{
				label: "Office hours",
				note: "Weekly validator call",
				href: routes.officeHours,
			},
			{ label: "Where we speak", note: "Conferences and panels", href: routes.talks },
		],
		link: { label: "Full calendar", href: routes.events },
	},
	{
		name: "On YouTube",
		rule: "ethstaker",
		note: "The EthStaker channel carries the recorded programme.",
		items: [
			{
				label: "Hardfork events",
				note: "Live on upgrade day",
				href: youtube,
				external: true,
			},
			{
				label: "Community calls",
				note: "Recorded every month",
				href: youtube,
				external: true,
			},
			{
				label: "Tutorials",
				note: "Setup and recovery walkthroughs",
				href: youtube,
				external: true,
			},
			{
				label: "Past gatherings",
				note: "Every talk, archived",
				href: youtube,
				external: true,
			},
		],
		link: { label: "youtube.com/@EthStaker", href: youtube, external: true },
	},
];

/** The only source of truth for site copy. Edit text here, not in components. */
export const site = {
	name: "EthCoordinate",
	seo: {
		title: "EthCoordinate — A coordination engine for Ethereum",
		description:
			"Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
		/* Exported from the Figma "OG image" frame. Lives in public/. */
		image: "/og.jpg",
		imageAlt: "EthCoordinate",
		twitter: "@ethcoordinate",
	},
	home: "Back to top",
	homeLink: "EthCoordinate home",
	menu: "Menu",
	menuClose: "Close menu",
	/* One tier. `groups` holds the dropdown of an item; an empty list means
	   the item has no dropdown. */
	nav: [
		{
			key: "work",
			label: "Our work",
			href: routes.initiatives,
			groups: [] as readonly MenuGroup[],
		},
		{
			key: "products",
			label: "Products",
			href: routes.properties,
			groups: properties,
		},
		{ key: "events", label: "Events", href: routes.events, groups: eventGroups },
		{
			key: "about",
			label: "About",
			href: routes.about,
			groups: [] as readonly MenuGroup[],
		},
	],
	navCta: { label: "Explore initiatives", href: routes.initiatives },
	properties,
	eventGroups,
	hero: {
		/* Figma sets one word per line. The newlines keep that shape. */
		eyebrow: "AN\nETHEREUM\nCOORDINATION\nORG",
		titleTop: "A coordination engine",
		titleBottom: "for Ethereum",
		body: "Providing support for governance operations, facilitating stakeholder engagement, and maintaining home staking tooling & software.",
		ctaHref: routes.about,
		ctaLabel: "About",
		emailHref: "mailto:team@ethcoordinate.org",
		emailLabel: "team@ethcoordinate.org",
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
				body: "We support research and rigorous debate on questions critical to Ethereum’s long-term economic health.",
			},
			{
				title: "Open-source tooling",
				body: "We maintain the open-source tools and documentation used by participants of the consensus set.",
			},
		],
	},
	/* The labels of the product card. `tier` runs from 1, a product on its
	   own domain, to 4, a product we only catalogue. */
	product: {
		tiers: {
			1: "Own domain",
			2: "On our sites",
			3: "We maintain",
			4: "Catalogued",
		},
		owners: {
			org: "By EthCoordinate",
			steward: "Steward’s project",
			"third-party": "Third party",
		},
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
	/* The community band. A number here is a claim about the org, so every
	   one needs a source. */
	community: {
		number: "",
		heading: "Join us",
		intro:
			"The community is open to everyone. Ask a question in Discord, or start a longer thread on Reddit.",
		stats: [
			{
				value: "25,000",
				label: "Discord members",
				note: "Stewards and home stakers answer validator questions every day.",
			},
		],
		/* The value is the length of `team.members`, so the number cannot
		   drift from the list. The component fills it. */
		teamStat: {
			label: "People on the team",
			note: "Plus the affiliates who join a single initiative.",
		},
		channels: [
			{
				label: "Discord",
				note: "Ask a question and get an answer. Office hours run here every week.",
				href: discord,
			},
			{
				label: "Reddit",
				note: "r/ethstaker holds the longer threads and the slower discussions.",
				href: reddit,
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
	/* Our work → Staker support. The page explains the programme and hands
	   the operational pages to ethstaker.org. */
	stakerSupport: {
		seo: {
			title: "Staker support — EthCoordinate",
			description:
				"We maintain a safe, informed space for independent stakers to stay engaged with the network. The operational staking pages live on ethstaker.org.",
		},
		breadcrumb: [
			{ label: "Home", href: routes.home },
			{ label: "Our work", href: routes.initiatives },
			{ label: "Staker support" },
		],
		number: "01.",
		heading: "Staker support",
		intro:
			"We maintain a safe, informed space for independent stakers to stay engaged with the network. We answer questions, document the work, and keep the tools running.",
		handoff: {
			eyebrow: "Operational pages live on ethstaker.org",
			heading: "EthStaker keeps every staking page",
			body: "This page explains the programme. It does not repeat the guides. EthStaker keeps its own brand, its own dark mode and its own domain.",
			cta: {
				label: "Go to ethstaker.org",
				href: "https://ethstaker.org",
				external: true,
			},
			links: [
				{
					label: "Start staking",
					note: "Choose a method",
					href: "https://ethstaker.org/staking",
					external: true,
				},
				{
					label: "Run a validator",
					note: "Hardware and software",
					href: "https://ethstaker.org/staking-software",
					external: true,
				},
				{
					label: "Knowledge Base",
					note: "Docs and FAQ",
					href: "https://docs.ethstaker.org",
					external: true,
				},
				{
					label: "Get support",
					note: "Discord and office hours",
					href: "https://ethstaker.org/support",
					external: true,
				},
			],
		},
		products: {
			heading: "What we run",
			aside: "Same card, two columns.",
			cards: [
				{
					title: "Knowledge Base",
					blurb:
						"Documents staking from the first deposit to the exit. Maintained by documenters, edited in the open.",
					area: "Staker support",
					tier: 1,
					ownerKind: "org",
					external: true,
					href: "https://docs.ethstaker.org",
				},
				{
					title: "Eth Docker",
					blurb:
						"Installs and maintains a validator with Docker. Built and maintained by a steward, hosted on its own docs site.",
					area: "Open-source tooling",
					tier: 3,
					owner: "Thorsten Behrens",
					ownerKind: "steward",
					external: true,
					href: "https://ethdocker.com",
				},
				{
					title: "Rhino Review",
					blurb: "Summarises the staking month in one newsletter.",
					area: "Staker support",
					tier: 2,
					ownerKind: "org",
					href: routes.rhinoReview,
				},
				{
					title: "Office hours",
					blurb: "A weekly call where stewards answer validator questions live.",
					area: "Staker support",
					tier: 2,
					ownerKind: "org",
					href: routes.events,
				},
			] as readonly Product[],
		},
		answers: {
			heading: "Where to get an answer",
			columns: ["Route", "Use it for", "Who answers"],
			rows: [
				{
					route: "Discord",
					use: "A validator that is down, or a question you cannot search for.",
					who: "Stewards and community",
				},
				{
					route: "Knowledge Base",
					use: "Setup, migration, exits and penalties, documented.",
					who: "Documenters",
				},
				{
					route: "Office hours",
					use: "A walkthrough with someone watching your screen.",
					who: "Stewards",
				},
			],
		},
		cta: {
			eyebrow: "Open channel",
			heading: "Running a validator and stuck?",
			emailHref: "mailto:hello@ethcoordinate.org",
			emailLabel: "hello@ethcoordinate.org",
		},
	},
	/* Products → Forkcast. A bridge page: one screen, one destination, no
	   operational content. */
	forkcast: {
		seo: {
			title: "Forkcast — EthCoordinate",
			description:
				"We develop and steward Forkcast, the most-used platform for tracking research and engineering initiatives on Ethereum’s core protocol.",
		},
		breadcrumb: [
			{ label: "Home", href: routes.home },
			{ label: "Products", href: routes.properties },
			{ label: "Forkcast" },
		],
		tier: "Tier 1 · own domain",
		heading: "Forkcast",
		body: "We develop and steward Forkcast, the most-used platform for tracking research and engineering initiatives on Ethereum’s core protocol.",
		facts: [
			{ key: "What it tracks", value: "Upgrades, EIPs and All Core Devs calls." },
			{ key: "Who runs it", value: "We develop and steward it." },
			{ key: "Where it lives", value: "forkcast.org, in the ethereum GitHub org." },
			{ key: "What it keeps", value: "Its own brand, type and dark mode." },
		],
		cta: { label: "Open forkcast.org", href: "https://forkcast.org", external: true },
		link: {
			label: "Read the latest ACD notes",
			href: "https://forkcast.org/acd",
			external: true,
		},
		/* The frame shows Forkcast as it is. We do not restyle it. `shipped`
		   picks the color of the status pill; `global.css` owns that color. */
		frame: {
			name: "Forkcast",
			domain: "forkcast.org",
			rows: [
				{ name: "Glamsterdam", status: "Scheduled", meta: "12 EIPs", shipped: false },
				{ name: "Fusaka", status: "Shipped", meta: "9 EIPs", shipped: true },
				{ name: "Pectra", status: "Shipped", meta: "11 EIPs", shipped: true },
			],
			note: "Forkcast’s colours, type and scanline texture are unchanged. We frame it; we do not restyle it.",
		},
		linkback: {
			heading: "How Forkcast links back",
			body: "Forkcast’s own header and footer stay exactly as they are.",
			prefix: "Developed and stewarded by",
			name: "EthCoordinate",
			domain: "ethcoordinate.org",
			note: "One footer line is the whole ask. The products menu on our side is what makes Forkcast findable — not a strip on theirs.",
		},
		rules: [
			{
				number: "01.",
				title: "One screen",
				body: "A bridge page never scrolls past what one screen can hold.",
			},
			{
				number: "02.",
				title: "One destination",
				body: "A single primary action. Everything else is a text link.",
			},
			{
				number: "03.",
				title: "No operational content",
				body: "No guides, no tables of data. That lives on the product.",
			},
			{
				number: "04.",
				title: "Attribution first",
				body: "Who runs it is above the fold, not in a footer.",
			},
		],
	},
	/* The social profiles of the org. The footer and the JSON-LD read this
	   list. */
	networks: [
		{ key: "x", label: "X", href: "https://x.com/ethcoordinate" },
		{ key: "telegram", label: "Telegram", href: "https://t.me/ethcoordinate" },
		{ key: "discord", label: "Discord", href: discord },
	],
	footer: {
		tagline: "Coordination is infrastructure.",
		copyright: "© 2026 EthCoordinate",
	},
} as const satisfies SiteShape;
