import { defineCollections, defineConfig } from "fumadocs-mdx/config"
import { z } from "zod"

const projectFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  summary: z.string(),
  liveHref: z.string(),
  sourceHref: z.string().optional(),
  order: z.number().int().nonnegative(),
  featured: z.boolean().default(false),
  status: z.enum(["placeholder", "draft", "published"]),
  stack: z.array(z.string()).default([]),
  publishedAt: z.string(),
})

const writingFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  category: z.string(),
  status: z.enum(["placeholder", "draft", "published"]),
  featured: z.boolean().default(false),
  order: z.number().int().nonnegative(),
  readingTime: z.string(),
})

export const projects = defineCollections({
  type: "doc",
  dir: "./content/projects",
  schema: projectFrontmatterSchema,
  postprocess: {
    includeProcessedMarkdown: true,
  },
})

export const writing = defineCollections({
  type: "doc",
  dir: "./content/writing",
  schema: writingFrontmatterSchema,
  postprocess: {
    includeProcessedMarkdown: true,
  },
})

export default defineConfig()
