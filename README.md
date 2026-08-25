# EthCoordinate website

[![Netlify Status](https://api.netlify.com/api/v1/badges/b7e0849f-bfcb-4e2b-b1f6-99c693025c0a/deploy-status)](https://app.netlify.com/projects/ethcoordinate/deploys)

The EthCoordinate website brings Ethereum governance resources together with
EthCoordinate's initiatives, team, staking guidance, community, and
organizational information.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

An optional `GITHUB_TOKEN` increases the rate limit for live data loaded from
`ethereum/pm` and `ethereum/forkcast`. The site falls back gracefully when the
GitHub API is unavailable.

## Useful commands

```bash
npm run lint
npm run build
npm run start
```

## Content map

- `/initiatives/staker-support`: direct handoff to canonical EthStaker support
- `/initiatives/protocol-coordination`: how EthCoordinate facilitates core protocol work
- `/pm-repo` and `/pm-repo/breakouts`: Ethereum governance coordination
- `/guides/**`: EIP championing and breakout-room guides
- `/forkcast`: product overview plus the full upgrade-governance explainer
- `/about` and `/team`: organization, community, FAQ, and current team

Shared EthCoordinate copy and destination data live in `src/data/site.ts`.

## Deploying

Netlify builds this repo. `netlify.toml` holds the build command and the
publish directory. `.nvmrc` pins Node 22. A push to `main` syncs the `dev`
branch, which Netlify deploys to dev.ethcoordinate.org.

Set `GITHUB_TOKEN` in the Netlify environment variables. Without it the live
`ethereum/pm` and `ethereum/forkcast` data falls back to placeholders.
