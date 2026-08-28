# Dnyanesh Fulsundar Personal Portfolio

This site is Dnyanesh Fulsundar's portfolio and writing surface. It should feel narrow, editorial, text-led, and easy to scan. The job is simple: help visitors understand who Mohamed is, what kind of frontend work he does, what he has written, and where to go next.

The site should not become a theme demo, a maximal archive, or a flashy portfolio that hides the work behind decoration.

## Product Shape

The current site includes:

- Homepage at `app/page.tsx`.
- Projects archive at `app/projects/page.tsx`.
- Dedicated project pages at `app/projects/[slug]/page.tsx`.
- Writing archive at `app/writing/page.tsx`.
- Dedicated writing pages at `app/writing/[slug]/page.tsx`.
- MDX project content under `content/projects/`.
- MDX writing content under `content/writing/`.
- Homepage, identity, project, writing, and discovery helpers under `lib/content/`.
- Metadata, canonical URL, JSON-LD, sitemap, robots, manifest, and Open Graph support.
- Static `llms.txt` and `llms-full.txt` routes generated from site content.
- A floating dock, article chrome, article TOC, page actions, contact copy feedback, and small audio/motion helpers.

## Core Direction

- Communicate intent within 2-3 seconds.
- Keep text as the main interface.
- Use progressive disclosure instead of showing everything at once.
- Make the site minimal without making it empty.
- Keep navigation direct and persistent.
- Use shared systems before one-off styling.

## Visual Direction

- Centered, narrow content column.
- Short section headings.
- Compact project cards and writing rows.
- Subtle dividers, muted descriptions, and restrained metadata.
- Project images only when they help recognition.
- Motion that supports state, navigation, and feedback.
- No decorative work that delays comprehension.

Dark mode should feel like a quiet reading surface, not a separate dramatic theme.

## Current Content State

- Seven project MDX files are present: `danadoors`, `devloop`, `forge`, `markymap`, `mosexperiences`, `reway`, and `rootly`.
- Four writing MDX files are present.
- Homepage copy is authored in `lib/content/content-discovery.ts`.
- Identity and social links are authored in `lib/content/identity.ts`.
- Project cover images live under `public/assets/projects/<slug>/`.
- Writing cover images live under `public/assets/writing/`.

## Architecture

Shared code is grouped by concern:

- `lib/content/` owns authored records, MDX document helpers, discovery routes, and Markdown export helpers.
- `lib/metadata/` owns site config, canonical URLs, route metadata, and structured data.
- `lib/motion/` owns Motion primitives, runtime providers, feature loading, and shared surface motion.
- `lib/audio/` owns sound helpers and generated minimal audio data.
- `components/editorial-entity/` owns reusable list, surface, card, row, and hover background behavior for projects and writing.
- `components/article/` owns project/writing detail chrome, TOC, images, code blocks, and page actions.
- `components/action-link/` owns icon/action link rendering, tooltips, and project/social actions.
- `components/homepage/` owns homepage layout, reveal surfaces, footer, and signature mark.

When changing behavior, read exports, callers, and shared utilities before adding new code.

## Interaction Rules

Animate:

- State changes.
- Navigation transitions.
- Feedback on actions.
- Loading states.

Do not animate:

- Form submission while awaiting a response.
- Destructive confirmations.
- Repeated micro-interactions after first use.

Initial page-load motion may be expressive. Repeated interactions should stay fast and low-friction.

## Engineering Rules

- New feature: use `grill-me` first and do not code until the spec is confirmed.
- Architecture or broad refactor: use `system-design` when available, plus `improve-codebase-architecture`.
- UI polish or animation changes: use the relevant interface/motion skill from `spec/skills.md`.
- Simple local edits do not need a skill.
- Fix UI root causes in `app/globals.css`, `components/ui/*`, or the shared component that owns the behavior.
- Do not fork existing conventions silently.
- Surface skipped verification and uncertainty.
- Outer radius should equal inner radius plus padding when framed UI is involved.

## Stack

- Next.js 16 App Router.
- React 19.
- TypeScript 5.
- Tailwind CSS 4.
- Fumadocs MDX.
- Motion.
- Base UI via `@base-ui/react`.
- `@tabler/icons-react`.
- `next-themes`.
- pnpm.

## Agent Start Sequence

1. Read this file.
2. Read the latest dated file in `spec/sessions/`.
3. Read `spec/skills.md` only when a skill trigger appears.
4. If `spec/handoff.md` says there is an active handoff, read it before editing.

## Non-Negotiables

1. No content surface should require instructions to operate.
2. No decorative effect should delay comprehension.
3. No broad architecture fork without naming the trade-off.
4. No claim of completion when checks were skipped or failed.
5. No stale planning language in README, handoff, context, or skill docs after a cleanup pass.
