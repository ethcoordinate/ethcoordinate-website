# EthCoordinate 🌐

Marketing site for EthCoordinate. Astro 7 + Tailwind 4, deployed as a static
site on Cloudflare Workers.

## 🚀 Setup

```sh
bun install
bun run dev   # http://localhost:4321
```

The package manager is bun. Node 22.12 or later.

## 📁 Layout

```text
/
├── public/             static assets
├── src/
│   ├── components/     .astro components, kebab-case file names
│   ├── icons/          svg sources for the sprite
│   ├── pages/          one file per route
│   ├── styles/         global.css, the only source of truth for color
│   └── site.ts         the only source of truth for copy
├── docs/
│   ├── plans/          one plan per task
│   ├── solutions/      one file per solved problem
│   └── tokens.md       color and font tokens
├── astro.config.mjs
└── wrangler.jsonc      Cloudflare Workers config
```

Copy lives in `src/site.ts`. Color lives in `src/styles/global.css`. Do not
write literal text or hex values in a component.

## 🧞 Commands

| Command            | Action                                        |
| :----------------- | :-------------------------------------------- |
| `bun install`      | Install dependencies                          |
| `bun run dev`      | Start the dev server at `localhost:4321`      |
| `bun run build`    | Build the site to `./dist/`                   |
| `bun run preview`  | Build, then serve on the Workers runtime      |
| `bun run deploy`   | Build and deploy to Cloudflare Workers        |
| `bun run lint`     | oxlint and Tailwind class order check         |
| `bun run lint:fix` | Autofix lint issues and sort Tailwind classes |

## 🤖 Agents

`AGENTS.md` holds the rules for this repo. `CLAUDE.md` is a symlink to it.
Skills live in `.agents/skills/`, tracked through `skills-lock.json`.
