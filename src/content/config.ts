import { defineCollection, z } from 'astro:content';

const recursos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Equipo Fundación Por Un Mundo Mejor'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    readTime: z.string().optional(),
  }),
});

export const collections = { recursos };
