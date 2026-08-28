# Agentic Skills Index

This file indexes the skills installed in `.agents/skills/`. Read it only when a skill trigger appears, then open the matching `SKILL.md` if the task needs the full workflow.

Keep this list alphabetical by skill directory name.

## Format

Each entry uses the skill directory as the heading, followed by triggers, pairings, the top rules, and the path to the full `SKILL.md`.

## Skills

### animate-text

Triggers: text animation, typewriter, line reveal, staggered text, kinetic heading.
Pairs with: motion-design, motion-patterns.
Top rules: Use the catalog specs instead of inventing animation contracts. Pick only the renderer/details needed for the current stack.
Full context: `.agents/skills/animate-text/SKILL.md`

### base-ui

Triggers: Base UI, `@base-ui/react`, accessible primitives, dialogs, menus, selects, tabs.
Pairs with: coss, typescript-expert.
Top rules: Use the correct compound parts and accessibility contracts. Preserve server/client boundaries and project styling conventions.
Full context: `.agents/skills/base-ui/SKILL.md`

### coss

Triggers: coss, component primitives, dialogs, forms, toasts, shadcn/Radix migration.
Pairs with: coss-particles, make-interfaces-feel-better.
Top rules: Use coss primitives before inventing wrappers. Preserve accessibility and shared Tailwind conventions.
Full context: `.agents/skills/coss/SKILL.md`

### coss-particles

Triggers: coss examples, particle examples, copy-paste UI patterns, component inspiration.
Pairs with: coss, emil-design-eng.
Top rules: Check existing particle patterns before building from scratch. Reuse only examples that fit the current component system.
Full context: `.agents/skills/coss-particles/SKILL.md`

### emil-design-eng

Triggers: design engineering, UI polish, feel, invisible details, interaction quality.
Pairs with: make-interfaces-feel-better, motion-design.
Top rules: Treat polish as a systems concern, not garnish. Use restraint and taste before adding more UI.
Full context: `.agents/skills/emil-design-eng/SKILL.md`

### fixing-motion-performance

Triggers: janky animation, blur performance, layout thrash, compositor issue, scroll-linked motion.
Pairs with: motion-design, make-interfaces-feel-better.
Top rules: Prefer transform and opacity when possible. Use filters and promoted layers surgically, especially on larger surfaces.
Full context: `.agents/skills/fixing-motion-performance/SKILL.md`

### grill-me

Triggers: new feature, unclear plan, stress-test, design interview, decision tree.
Pairs with: improve-codebase-architecture, typescript-expert.
Top rules: Ask one decision-shaping question at a time. Do not code a new feature until the spec is confirmed.
Full context: `.agents/skills/grill-me/SKILL.md`

### handoff

Triggers: handoff, compact context, transfer work, another agent, summarize session.
Pairs with: wrap-up, improve-codebase-architecture.
Top rules: Preserve current state, decisions, and next action. Do not duplicate stable rules already captured in `AGENTS.md` or `spec/index.md`.
Full context: `.agents/skills/handoff/SKILL.md`

### humanize

Triggers: humanize, remove generated tone, make copy sound human, natural writing.
Pairs with: seo-audit, wrap-up.
Top rules: Prefer specific, plain writing over generic polish. Do not add detector-gaming claims to project docs.
Full context: `.agents/skills/humanize/SKILL.md`

### improve-codebase-architecture

Triggers: architecture, refactor, module boundaries, testability, agent navigability.
Pairs with: nextjs-patterns, typescript-expert.
Top rules: Deepen the codebase instead of shuffling files. Use `CONTEXT.md` vocabulary when naming seams and module families.
Full context: `.agents/skills/improve-codebase-architecture/SKILL.md`

### make-interfaces-feel-better

Triggers: feels off, hover state, radius, shadow, spacing, typography, UI detail.
Pairs with: emil-design-eng, motion-design.
Top rules: Fix details where the shared system owns them. Prefer small, compounding improvements over decorative changes.
Full context: `.agents/skills/make-interfaces-feel-better/SKILL.md`

### motion-design

Triggers: animation direction, easing, choreography, transitions, micro-interactions.
Pairs with: motion-patterns, fixing-motion-performance.
Top rules: Motion should clarify state or movement. Keep repeated interactions fast and easy to interrupt.
Full context: `.agents/skills/motion-design/SKILL.md`

### motion-patterns

Triggers: modal animation, toast animation, stagger, page transition, layout animation.
Pairs with: motion-design, animate-text.
Top rules: Start from proven patterns instead of ad hoc effects. Keep springs and exits subtle unless the moment deserves emphasis.
Full context: `.agents/skills/motion-patterns/SKILL.md`

### nextjs-patterns

Triggers: Next.js App Router, Server Components, streaming, caching, server actions.
Pairs with: vercel-react-best-practices, typescript-expert.
Top rules: Prefer modern App Router patterns. Keep data ownership and rendering boundaries explicit.
Full context: `.agents/skills/nextjs-patterns/SKILL.md`

### nextjs-performance

Triggers: Core Web Vitals, image optimization, font optimization, bundle size, Next.js performance.
Pairs with: performance, vercel-react-best-practices.
Top rules: Optimize loading and rendering paths before micro-tuning. Treat images, fonts, and Server Component boundaries as first-class performance surfaces.
Full context: `.agents/skills/nextjs-performance/SKILL.md`

### performance

Triggers: speed up site, performance audit, slow loading, Lighthouse, runtime performance.
Pairs with: nextjs-performance, fixing-motion-performance.
Top rules: Measure the bottleneck before changing architecture. Prefer targeted loading/runtime fixes over broad rewrites.
Full context: `.agents/skills/performance/SKILL.md`

### react-doctor

Triggers: finish feature, React scan, regression check, accessibility check, cleanup.
Pairs with: vercel-react-best-practices, typescript-expert.
Top rules: Run after meaningful React changes when appropriate. Treat accessibility, correctness, and architecture regressions as real findings.
Full context: `.agents/skills/react-doctor/SKILL.md`

### react-useeffect

Triggers: `useEffect`, derived state, data fetching, effect cleanup, synchronization.
Pairs with: vercel-react-best-practices, typescript-expert.
Top rules: Use effects only for external synchronization. Prefer derived values and event handlers when no external system is involved.
Full context: `.agents/skills/react-useeffect/SKILL.md`

### seo-audit

Triggers: SEO audit, technical SEO, indexing, rankings, metadata review, organic traffic.
Pairs with: nextjs-performance, humanize.
Top rules: Start with an audit before guessing at SEO fixes. Keep recommendations tied to visible pages, metadata, content, and crawlability.
Full context: `.agents/skills/seo-audit/SKILL.md`

### typescript-expert

Triggers: TypeScript, type design, JavaScript architecture, migrations, type errors.
Pairs with: nextjs-patterns, vercel-react-best-practices.
Top rules: Use types to simplify the system. Prefer understandable durable types over cleverness.
Full context: `.agents/skills/typescript-expert/SKILL.md`

### vercel-composition-patterns

Triggers: composition, compound components, render props, context APIs, component architecture.
Pairs with: coss, vercel-react-best-practices.
Top rules: Choose APIs that scale without boolean sprawl. Use composition to keep reuse flexible and explicit.
Full context: `.agents/skills/vercel-composition-patterns/SKILL.md`

### vercel-react-best-practices

Triggers: React performance, Next.js performance, data fetching, bundle optimization, rendering patterns.
Pairs with: nextjs-patterns, react-doctor.
Top rules: Prefer server-first React/Next.js patterns. Optimize architecture before micro-optimizing components.
Full context: `.agents/skills/vercel-react-best-practices/SKILL.md`

### wrap-up

Triggers: session end, work log, sprint log, closing context.
Pairs with: handoff, react-doctor.
Top rules: Record a truthful session log in `spec/sessions/`. Name skipped checks and unresolved state clearly.
Full context: `.agents/skills/wrap-up/SKILL.md`
