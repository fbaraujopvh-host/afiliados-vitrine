import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    longDescription: z.string(),
    benefits: z.array(z.string()),
    howToUse: z.string(),
    price: z.string(),
    originalPrice: z.string(),
    discount: z.string(),
    image: z.string(),
    badge: z.string().optional(),
    affiliateUrl: z.string(),
    category: z.string(),
    rating: z.number(),
    reviews: z.number(),
  }),
});

export const collections = { products };
