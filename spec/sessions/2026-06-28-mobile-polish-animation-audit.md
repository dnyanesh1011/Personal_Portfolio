## Session Log — 2026-06-28-mobile-polish-animation-audit

**Date:** 2026-06-28
**Time:** 5:26 AM UTC+02:00

---

## Status at Start

- **Sprint goal:** Mobile UX polish + full animation audit
- **Last blocker:** None
- **Feature state:** SEO/humanize audit complete; dock, sound, content all shipped

---

## Completed

- Dock `AnimatedBackground` `layoutId` spring: snaps instantly on `pointer:coarse` — no more cluttered slide during mobile page navigation (`animated-background.tsx`)
- Footer signature scaled down on mobile: `h-8 sm:h-10` (`signature-mark.tsx`)
- Email icon removed from homepage footer social links — redundant with contact block above (`app/page.tsx`)
- Article detail page actions moved to back-button row on mobile (`sm:hidden` / `hidden sm:block`); title gets full width on small screens (`article-detail-chrome.tsx`)
- TextRoll: enter distance reduced `27px → 14px` (both forward + backward); `will-change-transform` removed from character spans; stagger unified to `5ms/char` + `0.12s` duration for both mobile and desktop (`text-roll.tsx`, `email-copy-button.tsx`)
- Full project animation audit via `review-animations` skill — all findings resolved:
  - `article-toc.tsx`: `y`/`scaleY` FM shorthands → full `transform` string (GPU-composited, scroll-linked)
  - `tooltip.tsx`: `top,left,right,bottom` removed from positioner transition → `transition-[transform]` only
  - `action-link-set.tsx` + `page-actions.tsx`: icon swap `scale(0.6) → scale(0.85)`; `300ms` → asymmetric `180ms enter / 100ms exit`
  - `surface-motion.ts`: hover spring `stiffness:200 damping:24` → `stiffness:300 damping:28` (~220ms settle, within 300ms budget)
  - `globals.css`: caret blink `ease-out → linear`
  - `homepage-scene-motion.ts`: page-load blur reveal gated behind `isPointerFine` — mobile gets translateY+opacity only
- Entity card sibling blur restored: `filter: blur(4px) brightness(0.86)` — already gated behind `(hover: hover) and (pointer: fine)`, not mobile; validated by `review-animations`, `emil-design-eng`, and `make-interfaces-feel-better` skills

---

## Decisions

- Sibling card blur retained on desktop despite off-GPU paint cost — validated as justified personality/craft choice per Emil Design Engineering; mobile exclusion is structural (media query gate)
- Icon swap exit faster than enter (100ms vs 180ms) — asymmetric: enter = user-facing feedback, exit = system cleanup
- TextRoll stagger unified across pointer types — mobile feel preferred; desktop matches it

---

## Blockers

None
