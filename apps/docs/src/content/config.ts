import { defineCollection, z } from 'astro:content';

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    repo: z.string().url(),
    accessibility: z.string().url(),
  }),
});

export const collections = { components };
