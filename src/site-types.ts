/* `bun run check` enforces this shape on `site.ts`. It turns a wrong social
   `key` or a missing member field into a build error. `key` must name an
   icon file in `src/icons/`. */
import type { ImageMetadata } from "astro";

export type SocialKey = "x" | "telegram" | "discord";

export type SiteShape = {
	networks: readonly { key: SocialKey; label: string; href: string }[];
	team: {
		/* A member photo is `image` (an import from `src/assets/team/`) or
		   `imageUrl` (a remote address). Exactly one of the two. */
		members: readonly ({
			number: string;
			name: string;
			role: string;
			bio: string;
			socials: readonly { key: SocialKey; href: string }[];
			[k: string]: unknown;
		} & (
			| { image: ImageMetadata; imageUrl?: never }
			| { image?: never; imageUrl: string }
		))[];
		[k: string]: unknown;
	};
	[k: string]: unknown;
};

/* A row of a dropdown column, of the "What we run" grid, or the footer link
   that closes a column. `external` sends the row off this site and shows the
   arrow that says so. */
export type MenuItem = {
	label: string;
	note?: string;
	href: string;
	external?: boolean;
};

/* One column of the Products or the Events dropdown. The home page renders
   the same columns under "What we run", from the same array. `rule` names
   the color bar above the column name. `global.css` owns that color. */
export type MenuGroup = {
	name: string;
	rule: "ethstaker" | "forkcast" | "accent";
	/* The brand mark beside the name. EthStaker ships an SVG; Forkcast draws
	   itself as a gradient dot. EthCoordinate carries none, because the whole
	   site is its brand. */
	mark?: "ethstaker" | "forkcast";
	note: string;
	items: readonly MenuItem[];
	link: MenuItem;
};

/* A product card. `tier` runs from 1, a product on its own domain, to 4, a
   product we only catalogue. `owner` names the person or the company behind
   a `steward` or a `third-party` product. */
export type Product = {
	title: string;
	blurb: string;
	area: string;
	tier: 1 | 2 | 3 | 4;
	owner?: string;
	ownerKind: "org" | "steward" | "third-party";
	external?: boolean;
	href: string;
};
