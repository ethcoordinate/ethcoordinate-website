export type PreMergeFork = {
  name: string;
  date: string;
  anchor: string; // ethereum.org/en/history/ anchor
  blurb: string;
  eipCount: number; // EIPs shipped (0 for pre-EIP-process forks)
};

export type PostMergeFork = {
  n: number;
  nickname: string;
  fullName: string;
  date: string;
  blurb: string;
  mascot: string | null; // /upgrades/*.webp, null -> placeholder
  mascotEmoji?: string; // fallback when no PNG asset exists
  href: string;
  status: "shipped" | "upcoming" | "tbd";
  eipCount: number | null; // null while scoping (count not final)
};

const HISTORY = "https://ethereum.org/en/history/";
const FORKCAST = "https://forkcast.org/upgrade/";

// Pre-merge execution layer, Frontier -> Grey Glacier (2015-2022)
// eipCount per the canonical record (ethereum.org/history)
export const preMergeEL: PreMergeFork[] = [
  { name: "Frontier", date: "30 Jul 2015", anchor: "frontier", blurb: "Ethereum mainnet goes live.", eipCount: 0 },
  { name: "Frontier Thawing", date: "7 Sep 2015", anchor: "frontier-thawing", blurb: "Lifted the initial gas restrictions, enabling real transactions.", eipCount: 0 },
  { name: "Homestead", date: "16 Mar 2016", anchor: "homestead", blurb: "The first planned upgrade — protocol improvements and stability.", eipCount: 0 },
  { name: "DAO fork", date: "20 Jul 2016", anchor: "dao-fork", blurb: "Resolved the DAO hack with a state change.", eipCount: 0 },
  { name: "Tangerine Whistle", date: "18 Oct 2016", anchor: "tangerine-whistle", blurb: "Repriced opcodes to stop DoS attacks.", eipCount: 2 },
  { name: "Spurious Dragon", date: "22 Nov 2016", anchor: "spurious-dragon", blurb: "Further DoS hardening; EIP-155 replay protection.", eipCount: 4 },
  { name: "Byzantium", date: "16 Oct 2017", anchor: "byzantium", blurb: "zk-SNARK precompiles; difficulty bomb delay.", eipCount: 9 },
  { name: "Constantinople + St. Petersburg", date: "28 Feb 2019", anchor: "constantinople", blurb: "Efficiency upgrades; St. Petersburg pulled a buggy opcode.", eipCount: 4 },
  { name: "Istanbul", date: "7 Dec 2019", anchor: "istanbul", blurb: "Interop improvements and gas-cost adjustments.", eipCount: 6 },
  { name: "Muir Glacier", date: "2 Jan 2020", anchor: "muir-glacier", blurb: "Difficulty bomb delay only.", eipCount: 1 },
  { name: "Berlin", date: "15 Apr 2021", anchor: "berlin", blurb: "Access lists (EIP-2930) and gas cost changes.", eipCount: 4 },
  { name: "London", date: "5 Aug 2021", anchor: "london", blurb: "EIP-1559: the base fee market and the burn.", eipCount: 5 },
  { name: "Arrow Glacier", date: "9 Dec 2021", anchor: "arrow-glacier", blurb: "Difficulty bomb delay.", eipCount: 1 },
  { name: "Grey Glacier", date: "30 Jun 2022", anchor: "gray-glacier", blurb: "Difficulty bomb delay.", eipCount: 1 },
];

// Pre-merge consensus layer (beacon chain), 2020-2022
// (CL upgrades ship via consensus-specs, not EIPs — count is 0 by definition)
export const preMergeCL: PreMergeFork[] = [
  { name: "Phase0 “Genesis”", date: "1 Dec 2020", anchor: "beacon-chain-genesis", blurb: "Beacon chain genesis — Proof of Stake boots up.", eipCount: 0 },
  { name: "Altair", date: "27 Oct 2021", anchor: "altair", blurb: "Light-client support and incentive accounting.", eipCount: 0 },
  // Bellatrix is the merge itself — represented by the merge node
];

export const mergeFork = {
  name: "The Merge",
  fullName: "Bellatrix/Paris",
  date: "15 Sep 2022",
  blurb: "Changed from Proof of Work to Proof of Stake.",
  mascot: "/upgrades/merge-panda.webp",
  href: `${HISTORY}#paris`,
  eipCount: 2, // EIP-3675, EIP-4399
};

export const postMerge: PostMergeFork[] = [
  {
    n: 1,
    nickname: "Shapella",
    fullName: "Capella/Shanghai",
    date: "12 Apr 2023",
    blurb: "Enabled withdrawals from validators.",
    mascot: "/upgrades/shapella-owl.webp",
    href: `${HISTORY}#shapella`,
    eipCount: 5,
    status: "shipped",
  },
  {
    n: 2,
    nickname: "Dencun",
    fullName: "Deneb/Cancun",
    date: "13 Mar 2024",
    blurb: "Added a new data type called “blobs” that made L2s cheaper to use.",
    mascot: "/upgrades/dencun-blobfish.webp",
    href: `${HISTORY}#dencun`,
    eipCount: 9,
    status: "shipped",
  },
  {
    n: 3,
    nickname: "Pectra",
    fullName: "Electra/Prague",
    date: "7 May 2025",
    blurb: "Enabled better wallet UX, validator consolidations & withdrawal address exits.",
    mascot: "/upgrades/pectra-giraffe.webp",
    href: `${FORKCAST}pectra`,
    eipCount: 11,
    status: "shipped",
  },
  {
    n: 4,
    nickname: "Fusaka",
    fullName: "Fulu/Osaka",
    date: "3 Dec 2025",
    blurb: "Data availability sampling (scaling unlock).",
    mascot: "/upgrades/fusaka-zebra.webp",
    href: `${FORKCAST}fusaka`,
    eipCount: 13,
    status: "shipped",
  },
  {
    n: 5,
    nickname: "Glamsterdam",
    fullName: "Gloas/Amsterdam",
    date: "2026",
    blurb: "ePBS, Block-level Access Lists.",
    mascot: "/upgrades/glamsterdam-polarbear.webp",
    href: `${FORKCAST}glamsterdam`,
    eipCount: 18,
    status: "upcoming",
  },
  {
    n: 6,
    nickname: "Hegotá",
    fullName: "Heze / Bogotá",
    date: "TBD",
    blurb: "FOCIL.",
    mascot: null,
    href: `${FORKCAST}hegota`,
    eipCount: null,
    status: "tbd",
  },
];

export const historyBase = HISTORY;
