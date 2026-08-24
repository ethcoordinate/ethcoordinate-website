export type PreMergeFork = {
  name: string;
  date: string;
  anchor: string; // ethereum.org/en/history/ anchor
};

export type PostMergeFork = {
  n: number;
  nickname: string;
  fullName: string;
  date: string;
  blurb: string;
  mascot: string | null; // /upgrades/*.png, null -> placeholder
  mascotEmoji?: string; // fallback when no PNG asset exists
  href: string;
  status: "shipped" | "upcoming" | "tbd";
};

const HISTORY = "https://ethereum.org/en/history/";
const FORKCAST = "https://forkcast.org/upgrade/";

// Pre-merge execution layer, Frontier -> Grey Glacier (2015-2022)
export const preMergeEL: PreMergeFork[] = [
  { name: "Frontier", date: "30 Jul 2015", anchor: "frontier" },
  { name: "Frontier Thawing", date: "7 Sep 2015", anchor: "frontier-thawing" },
  { name: "Homestead", date: "16 Mar 2016", anchor: "homestead" },
  { name: "DAO fork", date: "20 Jul 2016", anchor: "dao-fork" },
  { name: "Tangerine Whistle", date: "18 Oct 2016", anchor: "tangerine-whistle" },
  { name: "Spurious Dragon", date: "22 Nov 2016", anchor: "spurious-dragon" },
  { name: "Byzantium", date: "16 Oct 2017", anchor: "byzantium" },
  { name: "Constantinople + St. Petersburg", date: "28 Feb 2019", anchor: "constantinople" },
  { name: "Istanbul", date: "7 Dec 2019", anchor: "istanbul" },
  { name: "Muir Glacier", date: "2 Jan 2020", anchor: "muir-glacier" },
  { name: "Berlin", date: "15 Apr 2021", anchor: "berlin" },
  { name: "London", date: "5 Aug 2021", anchor: "london" },
  { name: "Arrow Glacier", date: "9 Dec 2021", anchor: "arrow-glacier" },
  { name: "Grey Glacier", date: "30 Jun 2022", anchor: "gray-glacier" },
];

// Pre-merge consensus layer (beacon chain), 2020-2022
export const preMergeCL: PreMergeFork[] = [
  { name: "Phase0 “Genesis”", date: "1 Dec 2020", anchor: "beacon-chain-genesis" },
  { name: "Altair", date: "27 Oct 2021", anchor: "altair" },
  // Bellatrix is the merge itself — represented by the merge node
];

export const mergeFork = {
  name: "The Merge",
  fullName: "Bellatrix/Paris",
  date: "15 Sep 2022",
  blurb: "Changed from Proof of Work to Proof of Stake.",
  mascot: "/upgrades/merge-panda.png",
  href: `${HISTORY}#paris`,
};

export const postMerge: PostMergeFork[] = [
  {
    n: 1,
    nickname: "Shapella",
    fullName: "Capella/Shanghai",
    date: "12 Apr 2023",
    blurb: "Enabled withdrawals from validators.",
    mascot: "/upgrades/shapella-owl.png",
    href: `${HISTORY}#shapella`,
    status: "shipped",
  },
  {
    n: 2,
    nickname: "Dencun",
    fullName: "Deneb/Cancun",
    date: "13 Mar 2024",
    blurb: "Added a new data type called “blobs” that made L2s cheaper to use.",
    mascot: "/upgrades/dencun-blobfish.png",
    href: `${HISTORY}#dencun`,
    status: "shipped",
  },
  {
    n: 3,
    nickname: "Pectra",
    fullName: "Electra/Prague",
    date: "7 May 2025",
    blurb: "Enabled better wallet UX, validator consolidations & withdrawal address exits.",
    mascot: "/upgrades/pectra-giraffe.png",
    href: `${FORKCAST}pectra`,
    status: "shipped",
  },
  {
    n: 4,
    nickname: "Fusaka",
    fullName: "Fulu/Osaka",
    date: "3 Dec 2025",
    blurb: "Data availability sampling (scaling unlock).",
    mascot: "/upgrades/fusaka-zebra.png",
    href: `${FORKCAST}fusaka`,
    status: "shipped",
  },
  {
    n: 5,
    nickname: "Glamsterdam",
    fullName: "Gloas/Amsterdam",
    date: "2026",
    blurb: "ePBS, Block-level Access Lists.",
    mascot: null,
    mascotEmoji: "🐻‍❄️",
    href: `${FORKCAST}glamsterdam`,
    status: "upcoming",
  },
  {
    n: 6,
    nickname: "Hegota",
    fullName: "H star",
    date: "TBD",
    blurb: "FOCIL.",
    mascot: null,
    href: `${FORKCAST}hegota`,
    status: "tbd",
  },
];

export const historyBase = HISTORY;
