import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>['data'];

/** Etiquetas legibles de los filtros heredados de v1. */
export const FILTER_LABELS: Record<string, string> = {
  'filter-web': 'Web',
  'filter-api': 'APIs',
  'filter-datos': 'Bases de datos',
  'filter-communication': 'Tiempo real',
  'filter-ia': 'IA',
  'filter-desktop': 'Escritorio',
  'filter-electronica': 'Electrónica',
};

/** Normaliza "filter-web, filter-api" o ["filter-web"] a ["web", "api"]. */
export function projectTags(project: Project): string[] {
  const raw = Array.isArray(project.filter) ? project.filter : project.filter.split(',');
  return raw
    .flatMap((f) => f.split(/\s+/))
    .map((f) => f.trim().replace(/^\./, ''))
    .filter((f) => f in FILTER_LABELS)
    .map((f) => f.replace(/^filter-/, ''));
}

export function tagLabel(tag: string): string {
  return FILTER_LABELS[`filter-${tag}`] ?? tag;
}

/** Proyectos en el orden del JSON. */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries.map((e) => e.data).sort((a, b) => a.order - b.order);
}

/** Filtros presentes en al menos un proyecto, en el orden de FILTER_LABELS. */
export function availableTags(projects: Project[]): string[] {
  const used = new Set(projects.flatMap(projectTags));
  return Object.keys(FILTER_LABELS)
    .map((f) => f.replace(/^filter-/, ''))
    .filter((t) => used.has(t));
}

// Carga perezosa: solo se procesan las imágenes que se usan realmente.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/portfolio/**/*.{png,jpg,jpeg,webp,avif}',
);

/** Resuelve una ruta del JSON ("portfolio/atril/1.png") a una imagen optimizable. */
export async function resolveImage(path: string): Promise<ImageMetadata> {
  const key = `/src/assets/${path.replace(/^\/+/, '')}`;
  const loader = images[key];
  if (!loader) {
    throw new Error(`Imagen no encontrada para el proyecto: "${path}" (esperada en ${key})`);
  }
  return (await loader()).default;
}

/** Texto plano a partir de la descripción HTML (para meta description y resúmenes). */
export function plainText(html: string, max = 160): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
