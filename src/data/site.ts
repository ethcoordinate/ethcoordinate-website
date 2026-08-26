export type Initiative = {
  id: string;
  title: string;
  color: string;
  href?: string;
};

export const initiatives: readonly Initiative[] = [
  { id: "staker-support", title: "Staking support", color: "var(--coord-green)", href: "/ethstaker" },
  { id: "protocol-coordination", title: "Protocol coordination", color: "var(--coord-cyan)", href: "/protocol-coordination" },
  { id: "forkcast", title: "Forkcast", color: "var(--coord-purple)", href: "/forkcast" },
  { id: "protocol-economics", title: "Stakeholder engagement", color: "var(--coord-yellow)" },
  { id: "open-source-tooling", title: "Open-source tooling", color: "var(--coord-orange)", href: "https://ethstaker.org/staking-software" },
  { id: "navigator", title: "Governance navigation", color: "var(--coord-pink)", href: "/navigator" },
];

export const communityLinks = [
  {
    label: "Discord",
    note: "Ask staking questions and join weekly office hours.",
    href: "https://discord.com/invite/ethstaker",
  },
  {
    label: "Reddit",
    note: "Long-form discussion with the wider EthStaker community.",
    href: "https://www.reddit.com/r/ethstaker/",
  },
  {
    label: "YouTube",
    note: "Tutorials, community calls, workshops, and event recordings.",
    href: "https://www.youtube.com/c/ethstaker",
  },
] as const;

export const faqItems = [
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
      "We have collected donations over the years and managed to spend the funds very carefully. Some of our main donors were the Ethereum Foundation, Optimism's RPGF program, Octant, Arbitrum DAO, Rocketpool, Gitcoin and several individuals.",
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
    question: "How do you interact with other organizations like Ethlabs and the Ethereum Foundation?",
    answer:
      "We take specifically friendly positions with all the organizations and individuals that steward Ethereum.",
  },
  {
    question: "How do you manage conflict of interests?",
    answer:
      "EthCoordinate as an organization has minimal basic opinions (see mission, vision and values) and it's a requirement for all members to be aligned with them. The individual members are allowed to engage in any kind of activity that's not in conflict with the published basic opinions.",
  },
  {
    question: "What will EthCoordinate's relationship be with the roadmap and development decisions?",
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
    question: "What does this change mean for the continuation of the existing solo staker support and the general industry topics that EthStaker historically covered?",
    answer:
      "Holding the community of home stakers together remains a top priority of EthCoordinate.",
  },
] as const;

export const organization = {
  name: "EthCoordinate",
  descriptor: "A coordination engine for Ethereum",
  tagline: "Coordination is infrastructure.",
  email: "team@ethcoordinate.org",
  about: [
    "EthCoordinate grew out of EthStaker, the nonprofit that spent the past several years supporting home stakers and other independent participants in Ethereum's consensus mechanism.",
    "When the ecosystem shifted in 2026, some organizational work was left uncovered. The same team launched EthCoordinate to take it on, widening its scope and adding new members who share the mission.",
  ],
  social: {
    x: "https://x.com/ethcoordinate",
    discord: "https://discord.com/invite/ethstaker",
    reddit: "https://www.reddit.com/r/ethstaker/",
    github: "https://github.com/ethcoordinate",
  },
} as const;
