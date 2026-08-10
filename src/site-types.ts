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
