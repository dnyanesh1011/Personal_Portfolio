// @ts-nocheck
import * as __fd_glob_10 from "../content/writing/search-visibility-in-2026-aeo-vs-seo.mdx?collection=writing"
import * as __fd_glob_9 from "../content/writing/react-in-2026-patterns-that-still-hold-up.mdx?collection=writing"
import * as __fd_glob_8 from "../content/writing/hello-world-what-this-writing-surface-is-for.mdx?collection=writing"
import * as __fd_glob_7 from "../content/writing/ai-discovery-in-2026-llms-txt-and-llms-full-txt.mdx?collection=writing"
import * as __fd_glob_6 from "../content/projects/rootly.mdx?collection=projects"
import * as __fd_glob_5 from "../content/projects/reway.mdx?collection=projects"
import * as __fd_glob_4 from "../content/projects/mosexperiences.mdx?collection=projects"
import * as __fd_glob_3 from "../content/projects/markymap.mdx?collection=projects"
import * as __fd_glob_2 from "../content/projects/forge.mdx?collection=projects"
import * as __fd_glob_1 from "../content/projects/devloop.mdx?collection=projects"
import * as __fd_glob_0 from "../content/projects/danadoors.mdx?collection=projects"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const projects = await create.doc("projects", "content/projects", {"danadoors.mdx": __fd_glob_0, "devloop.mdx": __fd_glob_1, "forge.mdx": __fd_glob_2, "markymap.mdx": __fd_glob_3, "mosexperiences.mdx": __fd_glob_4, "reway.mdx": __fd_glob_5, "rootly.mdx": __fd_glob_6, });

export const writing = await create.doc("writing", "content/writing", {"ai-discovery-in-2026-llms-txt-and-llms-full-txt.mdx": __fd_glob_7, "hello-world-what-this-writing-surface-is-for.mdx": __fd_glob_8, "react-in-2026-patterns-that-still-hold-up.mdx": __fd_glob_9, "search-visibility-in-2026-aeo-vs-seo.mdx": __fd_glob_10, });