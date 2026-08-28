## Session Log — 2026-06-08-writing-mdx-flow

**Date:** 2026-06-08
**Timezone:** Africa/Cairo, logged through 12:45 PM on 2026-06-09.

---

## Status at Start

- **Sprint goal:** Build the writing MDX flow with shared article primitives before adding more content or route effects.
- **Last blocker:** Writing needed a confirmed MDX-first route plan and shared project/writing primitives before implementation.
- **Feature state:** Project detail MDX flow was complete; writing routes had been scoped but not implemented.

---

## Completed

- Added `spec/writing-mdx-flow-spec.md` to track the writing archive/detail flow in small chunks.
- Extracted the project detail TOC into shared `components/article-toc.tsx`.
- Updated `components/project-detail-page.tsx` to use shared `ArticleToc` and removed the project-specific TOC module.
- Added a separate writing MDX collection in `source.config.ts`.
- Added placeholder writing MDX files under `content/writing/`.
- Added `lib/content/writing-pages.ts` and writing helpers in `lib/content/mdx-source.ts`.
- Removed the old TypeScript writing placeholder source from `lib/content/writing.ts`.
- Migrated homepage writing rows to MDX-backed summaries.
- Added clean source-aware writing navigation intent helpers in `lib/navigation/navigation-intent.ts`.
- Added static `/writing` archive route in `app/writing/page.tsx`.
- Added static `/writing/[slug]` detail route in `app/writing/[slug]/page.tsx`.
- Added `components/writing-detail-page.tsx` with article shell, Back behavior, metadata row, top page actions, shared TOC, and MDX body.
- Extended content discovery and route metadata helpers for writing archive and writing detail routes.
- Added `components/article-image.tsx` for editorial-spine-safe article images.
- Added `components/article-mdx-components.tsx` for article links, lists, blockquotes, inline code, code blocks, `kbd`, and images.
- Updated placeholder writing posts to exercise image, fenced code, inline code, `kbd`, blockquote, ordered list, and normal prose.
- Updated `spec/index.md` and `spec/homepage-architecture-deepening-spec.md` so writing routes and shared content architecture are no longer stale.
- Verified `pnpm typecheck`, targeted ESLint, `pnpm build`, React Doctor, generated writing route artifacts, and `git diff --check` for the latest article component/spec changes.
- Completed the shared `PageActions` / clean Markdown upgrade for writing detail pages, including fenced code preservation and supported article component cleanup.
- Added a shared 3:2 writing media ratio for homepage rows, writing archive rows, and article images.
- Replaced the previous Cal Sans setup with local Google Sans and Google Sans Code via `next/font/local`.
- Added `lib/design/text-styles.ts` and migrated authored homepage, project, writing, TOC, tooltip, metadata, and article typography to shared text roles.
- Confirmed typography hierarchy tuning should use weight, size, line-height, and wrapping rather than changing muted color tokens.
- Verified the typography pass with `pnpm typecheck`, targeted ESLint, `pnpm build`, React Doctor, and `git diff --check` for touched typography files.
- Added generated/local skill artifact ignores to `eslint.config.mjs`, covering `.source/**`, `.agents/**`, and `.claude/**`.
- Verified full `pnpm lint` now passes.
- Prepared `spec/metadata-discovery-og-spec.md` for the canonical URL, discovery files, JSON-LD, and dynamic OG image phase.
- Implemented the metadata/discovery/OG first pass: canonical URL helpers, sitemap, robots, manifest, static `llms.txt` routes, JSON-LD helpers, and route-segment Open Graph image routes.
- Recorded the OG font limitation: Google Sans WOFF2 and converted variable/static TTF attempts are not compatible with Satori in this build; OG images use the default `ImageResponse` sans renderer for now.
- Added `lib/motion/runtime.tsx` to centralize `LazyMotion` feature loading and `m` exports for local Motion primitives.
- Migrated `components/article-toc.tsx` to `LazyMotion` with `m.span` and the smaller `domAnimation` feature bundle.
- Migrated `components/animated-background.tsx` to `LazyMotion` with `m.div` and the `domMax` feature bundle required by shared `layoutId` background motion.
- Updated local Motion transition type imports to use the shared runtime helper instead of importing from `motion/react` per primitive.
- Verified the motion runtime pass with `pnpm lint`, `pnpm typecheck`, `pnpm build`, and React Doctor `100/100`.
- Added async feature modules in `lib/motion/features/` and updated `lib/motion/runtime.tsx` to defer `domAnimation` and `domMax` loading through dynamic imports.
- Re-verified the deferred Motion runtime pass with `pnpm lint`, `pnpm typecheck`, `pnpm build`, and React Doctor `100/100`; the first pre-build `typecheck` again hit transient `.next/types/validator.ts` drift and passed on rerun after `build`.
- Added `components/signature-mark.tsx` as a footer signature primitive using the provided `Jimmy` SVG path, one-time reveal-on-scroll behavior, and immediate reduced-motion fallback.
- Replaced the old text-only footer mark with the new `SignatureMark` primitive in `components/homepage-footer.tsx` and removed the now-unused `signature` prop from footer callsites.
- Split Motion helpers into `lib/motion/primitives.ts` and `lib/motion/runtime.tsx` so provider components and non-component Motion exports no longer share one file.
- Verified the footer signature pass with `pnpm lint`, `pnpm typecheck`, `pnpm build`, and React Doctor `100/100`; the first pre-build `typecheck` again hit transient `.next/types/validator.ts` drift and passed on rerun after `build`.
- Revised the footer signature behavior to the final direction: the current `Jimmy` mark uses a one-time reveal-on-scroll fade with reduced-motion immediate rendering, and the attempted hand-drawn stroke-animation direction was explicitly dropped because the available SVG assets remained filled contour shapes rather than true centerline stroke paths.
- Replaced the contact email copy button with a dedicated surfaced interaction in `components/email-copy-button.tsx`, including reserved-width rolling status text, full-surface click behavior, reduced-motion-safe label swaps, and clipboard success/error feedback.
- Added `components/text-roll.tsx` as a shared rolling text primitive for short label swaps and tuned it through several passes to handle rapid hover in/out without flashing or stale previous-text jumps.
- Hardened the contact copy interaction against rapid hover and repeated click edge cases by making copy feedback last-click-wins, restarting same-state feedback timers, and keeping assistive announcements fresh across repeated copy attempts.
- Added a dock theme toggle using `IconSquareRoundedFilled` in `components/homepage-dock.tsx`, including tooltip copy with `D` hotkey hint and reuse of the shared dock hover/background system rather than adding a one-off control.
- Extended the dock/icon item model to support both link and button actions through `components/icon-link.tsx`, `components/animated-icon-link-group.tsx`, `components/action-link-set.tsx`, `components/action-link-resolver.ts`, and `components/floating-dock.tsx`.
- Verified the contact text-roll/theme-dock pass with `pnpm typecheck`, `pnpm lint`, `pnpm build`, and React Doctor `100/100` after each substantive motion and dock refinement.
- Added `spec/codebase-structure-deepening-spec.md` to track the new structural health pass for module-family seams, `Page Actions`, article detail chrome, and `Content Discovery` clarity.
- Completed the first structural move pass by grouping the flat `components/` surface into `action-link`, `article`, `contact`, `dock`, `homepage`, `navigation`, and `metadata` module families.
- Updated route and shared-component imports to follow the new module-family seams without leaving temporary top-level compatibility re-exports behind.
- Deepened `Page Actions` onto the `Action Link Set` seam so page-level action state stays local while grouped icon rendering, tooltip behavior, and action-surface motion live in the shared action-link modules.
- Verified the structure-deepening pass with targeted ESLint, `pnpm build`, React Doctor `100/100`, and a post-build rerun of `pnpm typecheck`; the first pre-build `typecheck` again hit transient `.next/types/validator.ts` drift and passed on rerun after `build`.
- Added `components/article/article-detail-chrome.tsx` to concentrate shared article route chrome: TOC placement, back-link placement, title/meta/description rhythm, and shared body shell.
- Reduced `components/article/project-detail-page.tsx` and `components/article/writing-detail-page.tsx` to route-specific adapters over the new article-detail chrome seam.
- Removed `lib/content/site-content.ts` after migrating route, metadata, sitemap, OG image, and agent-discovery callers directly to `lib/content/content-discovery.ts`.
- Verified the article-detail and Content Discovery deepening pass with `pnpm typecheck`, targeted ESLint, and `pnpm build`; React Doctor reported a temporary `95/100` because Next's standard `opengraph-image.tsx` special exports were flagged as non-component exports in component files after those files were part of the touched set.
- Added `doctor.config.json` with a narrow `react-doctor/only-export-components` override for `app/opengraph-image.tsx`, `app/projects/opengraph-image.tsx`, and `app/writing/opengraph-image.tsx` after confirming from Next's official metadata-file docs that those route files are expected to export named config values such as `alt`, `size`, and `contentType`.
- Re-verified the cleanup pass with React Doctor back at `100/100`, `pnpm build`, targeted ESLint for the OG route files, and a post-build rerun of `pnpm typecheck`.
- Moved the remaining top-level component modules into final families: `components/editorial-entity/` now owns entity/list/card/media primitives, `components/action-link/` now owns icon-link primitives plus social/project action wrappers, and `components/app/` now owns `theme-provider.tsx`.
- Rewired homepage, archive, detail, dock, contact, and action-link imports to the final family paths and verified the end-state with `pnpm typecheck`, targeted ESLint, React Doctor `100/100`, and `pnpm build`.
- Added `spec/homepage-stagger-scene-spec.md` to track the homepage-only staggered entrance scene after resolving the motion plan through `grill-me`.
- Implemented `components/homepage/homepage-scene.tsx` as the shared homepage reveal primitive with standard, crisper header/utility, surfaced-row, and reduced-motion-safe opacity-only reveal behavior.
- Updated `app/page.tsx` to orchestrate the homepage reading-order scene across hero, about paragraph, socials, projects header, project rows, My Approach, writing header, writing rows, contact label, surfaced email block, dock, footer signature, and footer socials.
- Extended `components/homepage/homepage-layout.tsx` so `HomeSection` can accept an explicit header seam, letting section headers lead body content instead of forcing whole-section animation.
- Removed the local `useInView`-driven entrance from `components/homepage/signature-mark.tsx` so the signature now follows the shared homepage scene.
- Added homepage-only surfaced row stagger support through `components/editorial-entity/editorial-entity-list.tsx`, with `ProjectList` and `WritingList` opting in from homepage callers only.
- Verified the homepage scene pass with targeted ESLint, `pnpm build`, React Doctor `100/100`, and a post-build rerun of `pnpm typecheck`; the first pre-build `typecheck` again hit transient `.next/types/validator.ts` drift and passed on rerun after `build`.
- Revised the homepage scene reveal after browser review feedback: standard reveal now uses the expected `opacity`, `translateY`, and subtle blur combination, and `HomepageSceneReveal` now supports a timed mode for fixed utility UI so the dock appears near the opening instead of waiting for its document source position near the bottom.
- User browser review confirmed the dock timing and writing section reveal issue were fixed after the homepage scene revision.
- Fixed two homepage scene regressions identified via browser review: (1) the dock appeared in the wrong viewport position because `HomepageSceneReveal` (`m.div` with `transform`/`filter`) was wrapping the `position: fixed` nav — CSS `transform` and `filter` create a new containing block for fixed descendants, so the nav was positioned relative to the `m.div` mid-page rather than the viewport. Fixed by rendering the fixed `nav` directly in `HomepageDock` and applying `HomepageSceneReveal` only to the inner `ActionLinkSet` pill. (2) Writing rows remained permanently hidden because `VIEWPORT_MARGIN = "0px 0px -12% 0px"` shrank the effective intersection area by 12% from the bottom — rows near the fold never entered the trigger zone even after scrolling. Fixed by changing `VIEWPORT_MARGIN` to `"0px"` (20% element visibility with no bottom exclusion) and also switching homepage writing rows to `mode="timed"` to avoid per-row viewport race conditions.
- Fixed writing list layout collapse: `AnimatedBackground.cloneElement` replaces the surface `m.div`'s children with `<>background absolute div + original Link</>`. When `itemClassName` applied `grid-cols-[4rem_1fr]` directly to the surface, CSS grid auto-placement put the Link (the only non-absolute child) into column 1 only — the 4rem cell. The Link's own inner `[4rem_1fr]` grid then had 0px for the 1fr column, making title and description invisible. The pointer cursor was also absent because the Link was constrained to the 4rem left area. Fixed by removing `itemClassName` from the `EditorialEntityList` call in `writing-list.tsx` — the surface is a plain padded block, and the Link keeps its own grid for the internal media/content split.
- Audited the implemented homepage stagger scene with `emil-design-eng` and `make-interfaces-feel-better`: archive project/writing rows now render direct surfaces instead of `HomepageSceneSurface`, homepage rows use once-only viewport scene surfaces again with the safer `"0px"` viewport margin, timed utility reveal internals no longer carry viewport observation, the reveal uses explicit `transform` strings instead of Motion `y` shorthand, About/My Approach headers lead their paragraphs by a small delay, and row render helpers were promoted to named components after React Doctor flagged inline render calls.
- Reverified the homepage stagger audit cleanup with `pnpm typecheck`, targeted ESLint, full `pnpm lint`, `pnpm build`, and React Doctor `100/100`.
- Abandoned the dock contact popover experiment after it introduced too much shared-state and trigger-composition complexity. Removed the planned spec and popover component, restored action-link/background/popover seams to the simpler pre-popover shape, and removed the dock contact item entirely.

---

## Decisions

- Writing uses MDX as the source of truth; the old TypeScript writing source stays removed.
- Writing uses a separate Fumadocs collection and frontmatter schema, including manual `readingTime`.
- Writing detail pages reuse shared `ArticleToc` and `PageActions` rather than forking project-only behavior.
- Writing detail pages stay lighter than project case studies while keeping the same top action row placement.
- Article MDX rendering uses the existing Fumadocs/Shiki code output for now; no second syntax highlighter is added.
- Browser/runtime verification remains user-owned for this pass; agent verification uses static build and generated output checks.
- Google Sans and Google Sans Code are the current font direction, self-hosted from `app/fonts/`.
- Shared typography hierarchy belongs in `lib/design/text-styles.ts`, not scattered one-off Tailwind classes.
- Writing media uses 3:2 as its canonical image ratio for list, archive, and article contexts.
- Motion runtime optimization uses split feature loading: `domAnimation` for simple animated rails and `domMax` only for shared-layout surfaces that need `layoutId`.
- Motion feature bundles are now loaded asynchronously from `lib/motion/features/` so initial render does not preload the full feature packages.
- Footer signature now uses a dedicated primitive, reveals once on first viewport entry, and renders fully visible immediately for reduced-motion users.
- True hand-drawn stroke animation for the footer signature is deferred until a real centerline/open-stroke `Jimmy` SVG exists; filled contour SVGs should use reveal/fade behavior instead of forced `pathLength` handwriting animation.
- Contact label motion now treats hover-in and hover-out as directional timeline states: forward motion enters from below for hover/copy feedback, and backward motion mirrors that path for returning to the resting sentence.
- The dock theme toggle should stay SSR-safe by keeping theme-dependent behavior inside client event handlers and by avoiding theme-dependent server markup in the dock itself.
- The first structural cleanup pass should move files by module family with direct import rewiring instead of leaving broad compatibility shims in place.
- `Page Actions` should own page-level state only; the `Action Link Set` seam should own grouped icon rendering, tooltip composition, and shared action-surface behavior.
- The shared article-detail shell is now a real seam: project and writing routes should adapt into it rather than reassembling TOC, back link, and header layout separately.
- `Content Discovery` should be imported directly; a compatibility `site-content` facade no longer earns its keep.
- The React Doctor OG-route suppression is a framework-specific exception, not a general maintainability waiver: keep it limited to Next metadata image files that must export config values.
- The structural target for `components/` is now family folders plus `ui/`, not a mixed root namespace with leftover primitives.
- The homepage stagger scene should stay homepage-only; archive and article routes remain direct until a separate motion pass is designed for them.
- The shared homepage scene should own the footer signature entrance; local signature reveal logic should stay removed unless the motion direction changes again.
- Fixed-position utility UI such as the dock should use timed homepage scene mode, while document content should keep once-only viewport reveal behavior.
- The dock motion reveal must be applied to the inner content, not the fixed nav container — wrapping a `position: fixed` element in a `transform`/`filter` ancestor breaks its viewport anchoring.
- `VIEWPORT_MARGIN` should not use aggressive negative bottom values that shrink the intersection zone past the point where scrolled-to elements can trigger — `"0px"` with `amount: 0.2` is the reliable baseline.
- Homepage project/writing rows should use the once-only viewport reveal path with the safer `"0px"` viewport margin; timed mode is reserved for fixed utility UI such as the dock.
- `itemClassName` on `EditorialEntityList` must never carry grid layout classes when `AnimatedBackground` is active — the background's `cloneElement` injects an extra sibling into the surface grid, displacing the Link to the first column only. Grid layout belongs on the innermost semantic element (the `Link`), not on the motion surface wrapper.
- Homepage scene wrappers should be rendered only when `source="home"`; archive pages should keep direct list surfaces rather than receiving homepage entrance motion by default.
- Timed homepage utility reveal should stay separate from viewport reveal internals so fixed UI does not pay for or depend on IntersectionObserver behavior.
- The dock currently has no contact item; contact remains available through the homepage contact section.

---

## Blockers

1. ~~Full `pnpm lint` still expected to fail on existing `.agents` / `.claude` TypeScript skill reference files.~~ Resolved 2026-06-08 by ignoring generated/local skill artifacts in `eslint.config.mjs`.
2. Browser/runtime visual verification remains user-owned for this pass; no browser was opened by the agent.
3. ~~Chunk 7 remains next for the writing flow: shared `PageActions` and clean Markdown upgrade for writing.~~ Resolved 2026-06-08.
4. ~~Cleaned Markdown export still needs article-component handling so visitor copy does not leak raw MDX/frontmatter/imports/JSX.~~ Resolved 2026-06-08.
5. Real writing content and article images are still placeholder-driven.
6. ~~Deferred discovery files are still pending: `sitemap`, `robots`, `manifest`, `llms.txt`, and `llms-full.txt`; they are now scoped in `spec/metadata-discovery-og-spec.md` and still need a canonical site URL contract before implementation.~~ Resolved 2026-06-08.
7. Route/view transitions remain deferred to a future dedicated motion pass.
8. Exact Google Sans matching in OG images is deferred until a Satori-compatible static TTF/OTF is available; current OG images use the default `ImageResponse` sans renderer.
9. Browser/runtime visual verification remains user-owned after the LazyMotion migration; no browser was opened by the agent.
10. ~~Browser/runtime visual verification remains user-owned after the homepage stagger scene pass; no browser was opened by the agent.~~ Resolved 2026-06-09 by user browser review confirming the dock and writing reveal fix.
