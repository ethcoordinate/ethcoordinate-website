## Principles

- Write all copy, comments, and docs in Simplified Technical English. Use short
  sentences, active voice, and one idea per sentence. Use the same word for the
  same thing every time.
- Follow YAGNI. Do not add code, dependencies, config, or abstractions for a need
  that does not exist yet. Delete before you add.
- Keep all copy text in `src/site.ts`. It is the only source of truth for copy.
  Import from it. Do not write literal text in `.astro` files.
- Keep the repo agent friendly. Use few files, plain names, and no hidden magic.
  Record every command in this file.

## Commands

The package manager is bun. Do not use npm.

| Command            | Action                                          |
| :----------------- | :---------------------------------------------- |
| `bun install`      | Install dependencies                            |
| `bun run dev`      | Start the dev server on `localhost:4321`        |
| `bun run build`    | Build the static site to `./dist/`              |
| `bun run lint`     | Run oxlint and check Tailwind class order       |
| `bun run lint:fix` | Fix lint errors and sort Tailwind classes       |
| `bun run preview`  | Build, then serve on the Cloudflare runtime     |
| `bun run deploy`   | Build and deploy to Cloudflare Workers          |

Run `bun run lint` and `bun run build` before you commit.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
