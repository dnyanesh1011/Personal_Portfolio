// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  projects: create.doc("projects", {"danadoors.mdx": () => import("../content/projects/danadoors.mdx?collection=projects"), "devloop.mdx": () => import("../content/projects/devloop.mdx?collection=projects"), "forge.mdx": () => import("../content/projects/forge.mdx?collection=projects"), "markymap.mdx": () => import("../content/projects/markymap.mdx?collection=projects"), "mosexperiences.mdx": () => import("../content/projects/mosexperiences.mdx?collection=projects"), "reway.mdx": () => import("../content/projects/reway.mdx?collection=projects"), "rootly.mdx": () => import("../content/projects/rootly.mdx?collection=projects"), }),
  writing: create.doc("writing", {"ai-discovery-in-2026-llms-txt-and-llms-full-txt.mdx": () => import("../content/writing/ai-discovery-in-2026-llms-txt-and-llms-full-txt.mdx?collection=writing"), "hello-world-what-this-writing-surface-is-for.mdx": () => import("../content/writing/hello-world-what-this-writing-surface-is-for.mdx?collection=writing"), "react-in-2026-patterns-that-still-hold-up.mdx": () => import("../content/writing/react-in-2026-patterns-that-still-hold-up.mdx?collection=writing"), "search-visibility-in-2026-aeo-vs-seo.mdx": () => import("../content/writing/search-visibility-in-2026-aeo-vs-seo.mdx?collection=writing"), }),
};
export default browserCollections;