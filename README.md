# EthCoordinate 🌐

[![Netlify Status](https://api.netlify.com/api/v1/badges/b7e0849f-bfcb-4e2b-b1f6-99c693025c0a/deploy-status)](https://app.netlify.com/projects/ethcoordinate/deploys)

Marketing site for EthCoordinate. Astro 7 + Tailwind 4, deployed as a static
site on Netlify. A push to `main` syncs the `dev` branch, and Netlify deploys
`dev` to dev.ethcoordinate.org.

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
└── astro.config.mjs
```

Copy lives in `src/site.ts`. Color lives in `src/styles/global.css`. Do not
write literal text or hex values in a component.

## 🧞 Commands

| Command            | Action                                        |
| :----------------- | :-------------------------------------------- |
| `bun install`      | Install dependencies                          |
| `bun run dev`      | Start the dev server at `localhost:4321`      |
| `bun run build`    | Build the site to `./dist/`                   |
| `bun run preview`  | Build, then serve the static output           |
| `bun run lint`     | oxlint and Tailwind class order check         |
| `bun run lint:fix` | Autofix lint issues and sort Tailwind classes |

## 🤖 Agents

`AGENTS.md` holds the rules for this repo. `CLAUDE.md` is a symlink to it.
Skills live in `.agents/skills/` and are committed. `skills-lock.json` records
their source.
