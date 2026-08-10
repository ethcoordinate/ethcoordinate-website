# A team member with `imageUrl` breaks the build

## Symptom

Setting `imageUrl` on a team member in `src/site.ts` fails `astro check`
and the build. The type only allowed `image`, and `team.astro` read
`image.fsPath` for the blur placeholder.

## Cause

`SiteShape` required `image: ImageMetadata` on every member. The blur
pipeline in `src/components/team.astro` only knew how to read a local
file from disk.

## Fix

`site-types.ts` now takes a union: `image` (local import) or `imageUrl`
(remote https address), exactly one. `team.astro` feeds sharp the local
`fsPath` or the fetched remote bytes, and passes either value to the
`Image` component. `astro.config.mjs` authorizes any https host with
`remotePatterns`, so Astro optimizes the remote photo too.
