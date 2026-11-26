import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Proyectos del portfolio.
 * Se leen de src/data/portfolio.json (formato { "projects": [ ... ] }).
 * Las rutas de imagen son relativas a src/assets/ (p. ej. "portfolio/atril/1.png").
 */
const projects = defineCollection({
  loader: file('src/data/portfolio.json', {
    // Se añade la posición en el JSON para respetar ese orden al listar
    parser: (text) =>
      JSON.parse(text).projects.map((p: Record<string, unknown>, order: number) => ({ ...p, order })),
  }),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    title: z.string(),
    category: z.string(),
    // Admite "filter-web, filter-api" (formato heredado) o un array
    filter: z.union([z.string(), z.array(z.string())]),
    purpose: z.string(),
    date: z.string(),
    url: z.string().optional().default(''),
    demo: z.string().optional().default(''),
    private: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    description: z.string(),
    images: z.array(z.string()).min(1),
    thumbnail: z.string(),
    technologies: z.array(z.string()),
  }),
});

export const collections = { projects };
