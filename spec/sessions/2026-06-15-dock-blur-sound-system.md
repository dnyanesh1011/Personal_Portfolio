## Session Log — 2026-06-15-dock-blur-sound-system

**Date:** 2026-06-15
**Time:** (continued from previous context) – 9:13 PM UTC+02:00

---

## Status at Start

- **Sprint goal:** Polish dock UX — sizing, transparency, blur zone; then add UI sound system
- **Last blocker:** None
- **Feature state:** Dock existed; no blur zone, no sound, hydration error present but unnoticed

---

## Completed

- Dock buttons bumped: `icon` → `icon-lg` (40px), icons `size-5` → `size-5.5` in `components/action-link/icon-link-config.ts`
- Dock light-mode transparency fixed: `--surface-floating` changed to `color-mix(in srgb, background 90%, black)` in `app/globals.css`
- 8-layer progressive blur zone below dock added in `components/dock/homepage-dock.tsx` (desktop `pointer:fine` only)
- Mobile fallback: CSS gradient (`from-background to-transparent`) for `pointer:coarse` — zero GPU compositing cost
- Pointer-events dead zone fixed: `pointer-events-none` on nav wrapper + `pointer-events-auto` on pill only
- Footer bottom spacing corrected: `pb-28` → `pb-16` in `components/homepage/homepage-footer.tsx`
- `scroll-padding-bottom` and `--dock-clearance` CSS token added to `app/globals.css`
- `@web-kits/audio@0.1.0` installed; minimal patch placed at `lib/audio/minimal.ts` + `lib/audio/index.ts`
- `SoundProvider` client wrapper created at `components/app/sound-provider.tsx`, mounted above `ThemeProvider` in `app/layout.tsx`
- `onItemClick?: () => void` added to `AnimatedIconLinkGroup` — fires on link items only (button items handle their own sound)
- `onItemClick` threaded through `ActionLinkSet`; internal `useSound(click)` default added — external prop overrides it
- Dock nav links play `click` sound via `HomepageDock` → `ActionLinkSet` → `AnimatedIconLinkGroup`
- Theme toggle plays `toggleOn`/`toggleOff` in `HomepageDock` onClick + `ThemeHotkey` keyboard handler (`D` key)
- Click sound on `NavigationIntentLink` ("View All") in `components/navigation/navigation-intent-link.tsx`
- Click sound on `StoredBackLink` ("Back") in `components/navigation/stored-back-link.tsx`
- Click sound on `PageActions` copy/share buttons in `components/article/page-actions.tsx`
- Copy sound on `EmailCopyButton` (uses `copy` definition, not `click`) in `components/contact/email-copy-button.tsx`
- Hydration error fixed: replaced `useReducedMotion()` (Framer Motion, SSR-unsafe) with `useMediaQuery("(prefers-reduced-motion: reduce)")` in `components/homepage/homepage-scene-motion.ts` and `components/contact/text-roll.tsx`
- Same `useReducedMotion()` SSR bug fixed in `components/editorial-entity/animated-background.tsx` (missed in first pass)
- TOC minimap rail animation fixed: `height` moved from `style` (instant) to `animate` in `components/article/article-toc.tsx` — both position and height now spring together
- `AvatarImage` made non-interactive: `pointer-events-none` + `draggable={false}` in `components/ui/avatar.tsx`
- `priority` prop removed from `AvatarImage` call in `app/page.tsx`; replaced with `fetchPriority="high"` (native HTML attribute, correct for non-next/image elements)
- All project image surfaces standardised to `aspect-[3/2]`: `ProjectMediaFrame` and `ProjectMediaPlaceholder` updated from `aspect-[1.35]`/`aspect-[1.45]`
- Project card image pipeline built: `screenshotSrc` field added to frontmatter schema, `ProjectContent` type, `getProjectSummaries()`, `ProjectCard`, `ProjectMediaFrame` — renders `next/image` when src provided, muted placeholder div otherwise
- `priority` prop threaded from `EditorialEntityList` (index exposed as third `renderItem` arg) → `ProjectListRow` → `ProjectCard` → `ProjectMediaFrame` — first two cards load eagerly (LCP)
- `content/projects/reway.mdx` created; 6 additional real project MDX files created by external agent (danadoors, devloop, forge, markymap, mosexperiences, rootly)
- Placeholder project MDX files deleted: `project-alpha.mdx`, `project-beta.mdx`, `project-delta.mdx`, `project-gamma.mdx`

---

## Decisions

- Progressive blur zone is desktop-only (`pointer:fine`); touch devices get CSS gradient fallback — 8 GPU compositing layers too expensive on mobile scroll
- Sound on by default, no localStorage persistence — portfolio context, not an app
- `onItemClick` skips button items in `AnimatedIconLinkGroup` — button items with distinct sounds (theme toggle) handle themselves; avoids double-sound
- `ActionLinkSet` owns the default click sound internally — callers can override via `onItemClick` prop but don't have to
- Patch output at `lib/audio/` (not `.web-kits/`) — compatible with `@/lib/audio` path alias
- `useReducedMotion()` from `motion/react` removed project-wide; replaced with `useMediaQuery` (`useSyncExternalStore`-based) for SSR safety
- Standard image ratio for all project surfaces: `3:2` — one crop size (`1200×800` or `1800×1200`) for everything except avatar
- `next/image` is the correct component for all image surfaces; native `<img>` (Base UI avatar) uses `fetchPriority="high"` instead of `priority`
- Project image pipeline is convention-based: frontmatter `screenshotSrc` field, `next/image` in `ProjectMediaFrame`, `priority` for first two cards
- `index` added as third parameter to `EditorialEntityList.renderItem` — non-breaking, existing callers ignore it

---

## Blockers

1. None
