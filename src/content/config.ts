import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    metaTitle: z.string().max(80).optional(),
    metaDescription: z.string().max(160, "For optimze SEO, please provide a excerpt/description with 160 characters or less").optional(),
    title: z.string(),
    description: z.string().optional(),
    image: image().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    reference: z.string().optional(),
    // Transform string to Date object
    pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
    previewImage: z.string().optional(),
    secret: z.boolean().default(false),
    tags: z.array(z.string()).default(['other']),
    canonicalURL: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
}