## Principles

- Write all copy, comments, and docs in Simplified Technical English. Use short
  sentences, active voice, and one idea per sentence. Use the same word for the
  same thing every time.
- Do not comment what the code already says. Write a comment only where the
  reason is not in the code. Keep it to one or two short lines.
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
- Keep every photo in `src/assets/`. Import it and render it with the `Image`
  component of `astro:assets`. Never write a plain `<img>` and never put a photo
  in `public/`. Astro only optimizes an imported asset. `public/` holds artwork
  that must stay byte for byte, such as an SVG.
- Give every `Image` a `loading` value. Use `eager` only for an image above the
  fold. Use `lazy` for the rest. Set `width` and `height`, so the box holds its
  space and the page never shifts.
- The team photos in `src/assets/team/` are placeholders from
  [picsum.photos](https://picsum.photos). Replace the files. Keep the names.
- Write every commit message as a conventional commit. Use
  `type(scope): subject`. Keep the subject short, lower case, and imperative.
- The package manager is bun. Do not use npm, yarn or pnpm.
- Do not run a dev server if not asked to, the user is already running one.

## Skills

Skills live in `.agents/skills/`. `.claude/skills` is a symlink to that folder.
The `skills` CLI writes to `.claude/skills`, so new skills land in
`.agents/skills/` through the symlink. Git tracks the skill files and
`skills-lock.json`. Commit both.

```sh
bunx skills@latest add <owner>/<repo> -a claude-code -s '*' -y
bunx skills@latest experimental_install  # restore from skills-lock.json
bunx skills@latest update -p -y          # update project skills
```
