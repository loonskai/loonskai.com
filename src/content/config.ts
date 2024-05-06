import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    date: z.string().date(),
    estimated: z.number(),
  }),
})

export const collections = {
  blog: blogCollection,
}
