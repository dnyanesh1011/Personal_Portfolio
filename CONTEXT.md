# Project Context

This file is a vocabulary map for architecture and refactor work in Dnyanesh Fulsundar's portfolio. It does not override `AGENTS.md` or `spec/index.md`; those files own workflow and project rules.

Use these terms when naming modules, specs, and implementation seams.

## Editorial Spine

The narrow, text-led structure that presents identity, projects, writing, approach, and contact without turning the site into a decorative landing page.

## Editorial Entity

A scannable item inside the editorial spine. Current examples include project cards, writing rows, action links, social links, and archive rows.

## Editorial Entity List

The shared list pattern for editorial entities. It owns safe hover/focus behavior, item identity, sibling dimming, active background movement, and surface spacing.

## Content Discovery

The module family that turns authored identity, project, writing, and route records into homepage sections, archive pages, metadata, schema, sitemap entries, and agent-readable files.

## MDX Content Pipeline

The local content flow for project pages and writing posts. It owns collection discovery, frontmatter validation, rendered MDX, generated TOC data, article metadata, and cleaned Markdown exports.

## Project Detail Flow

The project archive and dedicated project detail routes. Project cards link to `/projects/[slug]`; drawer-based project details are not the current direction.

## Writing Detail Flow

The writing archive and dedicated writing routes. Writing rows link to `/writing/[slug]`; posts share the article chrome, TOC, page actions, metadata, and Markdown export behavior.

## Article Chrome

The shared detail-page shell used by project and writing pages. It includes back navigation, title/description, article actions, optional TOC, and the main MDX body.

## Article TOC

The desktop section navigation for project and writing pages. It is driven by generated MDX TOC data and should preserve the connected rail and fixed desktop placement.

## Page Actions

Page-level controls for copying the URL, copying cleaned Markdown, and native sharing with fallback. These actions should stay small, accessible, and predictable.

## Action Link Set

A group of icon-only or compact action links with shared tooltip, semantic icon, size, safe hover area, focus, and motion behavior.

## Contact Feedback

Feedback around contact actions such as copying the email address, showing copied/error state, and playing small confirmation sounds.
