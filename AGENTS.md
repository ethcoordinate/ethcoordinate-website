## Principles

- Write all copy, comments, and docs in Simplified Technical English. Use short
  sentences, active voice, and one idea per sentence. Use the same word for the
  same thing every time.
- Follow YAGNI. Do not add code, dependencies, config, or abstractions for a need
  that does not exist yet. Delete before you add.
- Keep all copy text in `src/site.ts`. It is the only source of truth for copy.
  Import from it. Do not write literal text in `.astro` files.
- Keep all color in `src/styles/global.css`. It is the only source of truth for
  color. Use the Tailwind token utilities. Do not write a hex value in a
  component. See `docs/tokens.md`.
- Keep the repo agent friendly. Use few files, plain names, and no hidden magic.
  Record every command in this file.
- Write the plan for multi-step work in `docs/plans/`. Use one markdown file per
  task. Name the file after the task.
- Record every problem you solve in `docs/solutions/`. Use one markdown file per
  problem. Write the symptom, the cause, and the fix. Read this directory before
  you debug. Do not solve the same problem twice.
- Name every file in `src/` in kebab-case, components and pages included. The
  import name stays PascalCase, the file name does not.
- Write every commit message as a conventional commit. Use
  `type(scope): subject`. Keep the subject short, lower case, and imperative.
- The package manager is bun. Do not use npm, yarn or pnpm.
- Do not run a dev server if not asked to, the user is already running one.

## Skills

Skills live in `.agents/skills/`. `.claude/skills` is a symlink to that folder.
The `skills` CLI writes to `.claude/skills`, so new skills land in
`.agents/skills/` through the symlink. Git tracks `skills-lock.json`, not the
skill files.

```sh
bunx skills@latest add <owner>/<repo> -a claude-code -s '*' -y
bunx skills@latest experimental_install  # restore from skills-lock.json
bunx skills@latest update -p -y          # update project skills
```
