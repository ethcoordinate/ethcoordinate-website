/* `bun run check` enforces this shape on `site.ts`. It turns a wrong social
   `key` or a missing member field into a build error. `key` must name an
   icon file in `src/icons/`. */
export type SocialKey = "x" | "telegram" | "discord";

export type SiteShape = {
	networks: readonly { key: SocialKey; label: string; href: string }[];
	team: {
		members: readonly {
			number: string;
			name: string;
			role: string;
			bio: string;
			imageUrl: string;
			socials: readonly { key: SocialKey; href: string }[];
			[k: string]: unknown;
		}[];
		[k: string]: unknown;
	};
	[k: string]: unknown;
};
