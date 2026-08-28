## Session Log — 2026-06-06-homepage-surface-primitives

**Date:** 2026-06-06
**Timezone:** Africa/Cairo, logged from 5:44 AM-8:26 PM, continued on 2026-06-07.

---

## Status at Start

- **Sprint goal:** Turn the first homepage pass into reusable homepage primitives before adding motion or richer visuals.
- **Last blocker:** Full `pnpm lint` was known to fail on `.agents` / `.claude` TypeScript skill reference files.
- **Feature state:** Homepage existed with placeholder content, Tabler icons, Coss tooltips/buttons, and early audit docs.

---

## Completed

- Added installable-effect references and adoption notes in `spec/homepage-polish-backlog.md`.
- Added deeper homepage interface audit in `spec/homepage-deep-interface-audit.md`.
- Added shared surface/motion tokens in `app/globals.css`.
- Added `EntitySurface` in `components/entity-surface.tsx`.
- Removed artificial avatar and project placeholder frames in `app/page.tsx`.
- Tightened dock surface and concentric radius in `components/homepage-dock.tsx`.
- Added `PageShell` and `HomeSection` in `components/homepage-layout.tsx`.
- Added `IconLink` and `IconLinkGroup` in `components/icon-link.tsx`.
- Migrated `components/social-links.tsx`, `components/project-actions.tsx`, and `components/homepage-dock.tsx` to shared icon-link composition.
- Added static `ProjectCard` and `ProjectMediaFrame` in `components/project-card.tsx`.
- Updated `spec/homepage-system-audit.md` and `spec/homepage-deep-interface-audit.md` with completed chunks and next work.
- Verified `pnpm typecheck`, targeted ESLint, `pnpm build`, `git diff --check`, and localhost smoke checks after implementation chunks.
- Added `EntityList` in `components/entity-list.tsx` and `WritingList` / `WritingRow` in `components/writing-list.tsx`.
- Switched homepage avatar usage to `public/assets/avatar/avatar.webp` only.
- Added `ContactSection` in `components/contact-section.tsx`.
- Added `HomepageFooter` and static `SignatureMark` in `components/homepage-footer.tsx`.
- Added reusable `FloatingDock` in `components/floating-dock.tsx`; `HomepageDock` now owns homepage-specific navigation items only.
- Updated `spec/homepage-polish-backlog.md` to mark the hover foundation issue resolved.
- Added `motion` dependency for Motion-Primitives style interaction work.
- Added reusable `AnimatedBackground` in `components/animated-background.tsx`.
- Wired `FloatingDock` to use a reduced-motion-aware animated hover/focus background behind dock icons.
- Verified `pnpm typecheck`, targeted ESLint for dock/motion components, and `pnpm build` after the dock motion chunk.
- Ran `npx react-doctor@latest --verbose --diff`; score was 96/100 with one existing-style warning about JSX passed as a prop in `app/page.tsx`.
- Added writing-only animated card background behavior in `components/writing-list.tsx`.
- Extended `AnimatedBackground` with `data-active` so children can dim siblings only while a row is focused.
- Added `focus` and `none` interaction variants to `EntitySurface`; writing rows now keep focus rings while the animated layer owns hover/focus fill.
- Moved `entitySurfaceVariants` to `components/entity-surface-variants.ts` after React Doctor flagged non-component exports in `components/entity-surface.tsx`.
- Verified `pnpm typecheck`, targeted ESLint for writing/motion components, and `pnpm build` after the writing focus chunk.
- Added `surface-active` as a stronger animated-selection token; Coss `accent` remains the subtler 4% component hover material.
- Removed the writing list dead cursor gap by moving vertical safe-zone space inside each writing link instead of between list items.
- Applied `AnimatedBackground` to project cards through `components/project-list.tsx` as a diagnostic comparison.
- Disabled static project hover fill by switching project card surfaces to `withinFocus`.
- Fixed `AnimatedBackground` so it no longer wraps child content in an extra layout element; this preserves row/grid layouts while injecting the animated surface.
- Fixed animated hover visibility by applying `var(--surface-active)` directly to the motion layer and defining the token as a transparent `color-mix`.
- Moved project card animated inset ownership to the animated child wrapper so card details no longer sit flush against the hover surface edge.
- Added `AnimatedIconLinkGroup` in `components/animated-icon-link-group.tsx` and migrated `FloatingDock`, `SocialLinks`, and `ProjectActions` to it.
- Removed tiny cursor dead zones in dock/social/action icon groups by replacing inter-item gaps with per-item safe-zone padding.
- Added `lib/motion/surface-motion.ts` for shared animated surface style and transition tokens.
- Added `AnimatedEntityBackground` in `components/animated-entity-background.tsx`; `ProjectList` and `WritingList` now use it instead of repeating `AnimatedBackground` token and transition setup.
- Added `CONTEXT.md` with shared architecture/domain vocabulary for future architecture work.
- Added `spec/homepage-architecture-deepening-spec.md`, converting the architecture audit into implementation chunks.
- Added `EditorialEntityList` in `components/editorial-entity-list.tsx`.
- Migrated `ProjectList` and `WritingList` to the shared `Editorial Entity List` seam so callers no longer compose `AnimatedEntityBackground`, `entitySurfaceVariants`, item `data-id`, safe inset, focus policy, or sibling dimming directly.
- Verified `pnpm typecheck`, targeted ESLint for touched entity/list modules, `pnpm build`, and React Doctor after the `EditorialEntityList` chunk.
- Added `ActionLinkSet` in `components/action-link-set.tsx`.
- Migrated `SocialLinks`, `ProjectActions`, `FloatingDock`, and `HomepageDock` to semantic action records so action icons, default labels, group sizes, and animated icon presentation are resolved in one module.
- Updated `lib/content/site-content.ts` social links to store action `kind` values instead of presentation icon/label pairs.
- Verified `pnpm typecheck`, targeted ESLint for touched action-link modules, `pnpm build`, and React Doctor after the `ActionLinkSet` chunk.
- Added `ContentDiscovery` through `lib/content/content-types.ts`, `lib/content/identity.ts`, `lib/content/projects.ts`, `lib/content/writing.ts`, and `lib/content/content-discovery.ts`.
- Converted `lib/content/site-content.ts` to a compatibility export and updated `app/page.tsx` to consume `homepageContent`.
- Moved shared action-link record types from the client `ActionLinkSet` module into content vocabulary so content modules do not import UI types.
- Verified `pnpm typecheck`, targeted ESLint for touched content/UI consumers, `pnpm build`, and React Doctor after the `ContentDiscovery` chunk.
- Added blockers preserving that `ProjectDetailInteraction` and `ContactFeedback` should not be extracted before their real seams exist.
- Removed project-grid dead hover zones by moving visual spacing into each animated project child and keeping the project grid gapless.
- Promoted sibling dimming to a shared `EditorialEntityList` behavior used by both writing rows and project cards.
- Fixed cursor continuity across dock buttons, social icons, project action buttons, and project-card safe zones by applying pointer cursor at the shared animated wrapper layer.
- Verified `pnpm typecheck`, targeted ESLint, `pnpm build`, and React Doctor after the shared dimming and cursor-safe-zone adjustments.
- Continued project detail planning on 2026-06-07.
- Discarded drawer-based canonical project details in favor of dedicated project detail routes.
- Selected MDX for project details, with the same MDX pipeline later reused by writing posts.
- Selected Fumadocs MDX headless/content layer and Fumadocs Core TOC support as the preferred MDX/TOC foundation; `fumadocs-ui` remains opt-in only if needed.
- Added `spec/project-detail-mdx-flow-spec.md` with small implementation chunks for dependencies, collections, routes, page anatomy, TOC, Page Actions, cleaned Markdown export, discovery, and verification.
- Completed Project Detail MDX Flow Chunk 1: installed Fumadocs headless/content dependencies, added `source.config.ts`, `mdx-components.tsx`, a minimal `content/projects/project-alpha.mdx`, and `lib/content/mdx-source.ts`.
- Verified Project Detail MDX Flow Chunk 1 with `pnpm typecheck`, targeted ESLint, and `pnpm build`; the build generated Fumadocs `.source` files successfully.
- Completed Project Detail MDX Flow Chunk 2: added placeholder MDX files for all current projects and added `lib/content/project-pages.ts`.
- Updated `lib/content/projects.ts` so homepage project card records are derived from MDX frontmatter, including `/projects/[slug]` primary links.
- Updated `pnpm typecheck` to run `fumadocs-mdx` before TypeScript so generated collection entries are available on clean checkouts.
- Verified Project Detail MDX Flow Chunk 2 with `pnpm typecheck`, targeted ESLint, and `pnpm build`.
- Completed Project Detail MDX Flow Chunk 3: added static `/projects` and `/projects/[slug]` routes.
- Added `generateStaticParams`, route metadata from MDX frontmatter, `notFound()` handling, a quiet project detail `Back` link, and a minimal MDX render.
- Updated homepage project "View All" to link to `/projects` and made the floating dock route-safe from project pages.
- Verified Project Detail MDX Flow Chunk 3 with `pnpm typecheck`, targeted ESLint, `pnpm build`, React Doctor, and local `next start` smoke checks for `/`, `/projects`, and `/projects/project-alpha`.
- Completed Project Detail MDX Flow Chunk 4: added `ProjectDetailPage` and `ProjectMediaPlaceholder`.
- Project detail pages now include quiet `Back`, above-the-fold title/description, stack metadata, top live/source shortcuts, MDX typography, and structured screenshot placeholders.
- Updated project MDX files to use section-level `h2` headings under the page-level `h1`.
- Verified Project Detail MDX Flow Chunk 4 with `pnpm typecheck`, targeted ESLint, `pnpm build`, local route smoke checks, and React Doctor.
- Completed Project Detail MDX Flow Chunk 5: added desktop-only `ProjectDetailToc` powered by Fumadocs Core headless TOC primitives.
- Project detail TOC now uses generated MDX `toc` data, active-anchor state, hash links, and a compact fixed desktop presentation outside the 640px reading column.
- Verified Project Detail MDX Flow Chunk 5 with `pnpm typecheck`, targeted ESLint, `pnpm build`, local route smoke checks, and React Doctor.
- Corrected Project Detail TOC behavior so multiple sections can be active when several headings are visible in the viewport; the visual now uses a single connected Motion-powered rail fill instead of individual markers.
- Polished Project Detail TOC spacing and rail weight so it sits farther from the content column and uses a thinner connected progress line closer to the reference.
- Audited project detail work with Vercel React best practices and TypeScript guidance; cached sorted project MDX records at module level, hoisted stable MDX component mapping, and reduced redundant TOC rail state updates/lookups.

---

## Decisions

- Entity surfaces show shared material only on hover/focus; no always-visible background for rows/entities.
- Project cards do not receive extra code-level resting backgrounds before real imagery exists.
- Avatar does not receive a generic frame because the asset is expected to be precisely cut.
- Dock is the only always-visible surface exception because it is detached from document flow.
- Homepage layout and project/icon primitives stay static until route state, drawer behavior, or motion is scoped separately.
- `app/page.tsx` remains a Server Component; only interactive copy, tooltip, and dock children are client components.
- `FloatingDock` is the first motion/navigation target; it now uses Animated Background for hover/focus only.
- Dock route-active state remains deferred until real route state exists beyond homepage anchors.
- Writing rows use Animated Background for hover/focus and opacity-only sibling dimming; this remains writing-only, not a global `EntityList` default.
- Animated entity backgrounds use `surface-active`; `surface-hover` stays reserved for quieter static hover/focus surfaces.
- `AnimatedBackground` is the low-level adapter; `AnimatedEntityBackground` is the list/entity interface future lists should start from.
- Project animated background stays for now and uses the same hover/focus surface model as writing rows.
- Icon-only groups use `AnimatedIconLinkGroup`; spacing between animated items should be child padding, not group gaps.
- The Editorial Entity List, Action Link Set, and Content Discovery chunks are complete; the next architecture target is Project Detail Interaction only when drawer/detail behavior starts.
- Apple Hello signature and text morph/roll feedback remain deferred until separate motion/signature chunks.
- Contact Feedback remains local to `EmailCopyButton` until a second feedback adapter exists.
- Shared sibling dimming now lives at the `EditorialEntityList` seam and applies to both project and writing entities; hovered items stay fully opaque while only non-hovered siblings dim.
- Shared animated safe zones must preserve both hover continuity and pointer cursor continuity; parent gaps remain disallowed when `AnimatedBackground` hover is enabled.
- Dedicated project pages are the canonical project detail flow; the bottom drawer direction is discarded because case-study content needs reading depth, sharability, metadata, and section navigation.
- Project and writing content should share one MDX pipeline with separate collections.
- Copy-as-Markdown should produce cleaned visitor-facing Markdown, not raw MDX source.
- Page URL copy, Markdown copy, and share belong in shared `PageActions`, separate from `ContactFeedback`.
- Project detail pages should be statically generated and feel nearly instant when opened from project cards.
- Mobile TOC is deferred for the first pass; desktop can use generated TOC/minimap behavior.
- Project cards now derive their summaries and hrefs from MDX-backed project records; route UI is still pending.
- `/projects` and placeholder `/projects/[slug]` routes now exist and are statically generated.
- Project detail pages now have first-pass case-study anatomy; desktop TOC/minimap and shared Page Actions are still pending.
- Desktop TOC/minimap is complete for the first pass; shared Page Actions and cleaned Markdown copy are still pending.

---

## Blockers

1. Visual screenshot verification through Playwright remains unavailable because Playwright is not installed; Chrome is available for lightweight DevTools Protocol probes.
2. Full `pnpm lint` still expected to fail on existing `.agents` / `.claude` TypeScript skill reference files.
3. Project Detail Interaction should proceed as dedicated project pages; do not reintroduce drawer behavior unless a separate preview layer is explicitly scoped later.
4. Contact Feedback should stay local to `EmailCopyButton` until a second feedback adapter exists, such as text morph, toast, or audio feedback.
5. `pnpm add` reported an ignored `esbuild` build script warning from pnpm's dependency safety flow, but `pnpm build` completed successfully after MDX installation.
