/**
 * Datos personales y del currículum.
 * Editar aquí para actualizar la web (antes estaban repartidos por index.html).
 */

export const profile = {
  name: 'Juan María Bravo López',
  shortName: 'Juan María',
  role: 'Desarrollador de Software Fullstack',
  headline:
    'Ingeniero Informático por la UCLM. Construyo aplicaciones de principio a fin, del backend a la interfaz. Me apasiona crear soluciones reales que den un buen servicio a las personas. Continúo mi formación en el Máster Universitario en Ingeniería Informática.',
  location: 'Toledo, España',
  email: 'juanmariabravo12@gmail.com',
  cv: '/assets/cvs/JuanMariaBravo_CV.pdf',
  english: 'Inglés B2',
  siteUrl: 'https://juanmariabravo.github.io',
  current: {
    company: 'M2M Aplicaciones',
    url: 'https://m2maplicaciones.io/',
    role: 'Desarrollador de Software Fullstack',
    department: 'Dpto. de Desarrollo',
    since: 'Nov 2026',
  },
  socials: [
    { name: 'GitHub', handle: '@juanmariabravo', url: 'https://github.com/juanmariabravo', icon: 'github' },
    { name: 'LinkedIn', handle: 'Juan María Bravo López', url: 'https://www.linkedin.com/in/juan-mar%C3%ADa-bravo-l%C3%B3pez/', icon: 'linkedin' },
    { name: 'X', handle: '@juanmariaaa', url: 'https://x.com/juanmariaaa', icon: 'x' },
    { name: 'Instagram', handle: '@juanmariaaa', url: 'https://www.instagram.com/juanmariaaa/', icon: 'instagram' },
  ],
} as const;

export type SocialIcon = (typeof profile.socials)[number]['icon'];

/** Color de las pastillas de cada grupo (definidos en src/styles/global.css). */
export type StackTone = 'sky' | 'violet' | 'fuchsia' | 'emerald' | 'amber';

export const stack: { group: string; tone: StackTone; items: string[] }[] = [
  { group: 'Frontend', tone: 'sky', items: ['HTML', 'XAML', 'React', 'JavaScript', 'TypeScript', 'Angular', 'Next.js', 'Tailwind CSS', 'Astro'] },
  { group: 'Backend', tone: 'violet', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'Java', 'Spring Boot', '.NET Core', '.NET MAUI', 'Elixir'] },
  { group: 'Datos', tone: 'emerald', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'] },
  { group: 'Herramientas', tone: 'amber', items: ['Git', 'HTTP', 'Docker', 'Socket.IO', 'CI/CD', 'Cloudflare'] },
];

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current?: boolean;
  summary?: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: 'Desarrollador de Software Fullstack',
    company: 'M2M Aplicaciones',
    companyUrl: 'https://m2maplicaciones.io/',
    period: 'Nov 2026 — Actualidad',
    current: true,
    summary: 'Desarrollo fullstack de aplicaciones, trabajando tanto en frontend como en backend.',
    highlights: [],
  },
  {
    role: 'Prácticas · Desarrollador Software Web Junior',
    company: 'Bizneo Solutions',
    companyUrl: 'https://www.bizneo.com',
    period: 'Feb 2026 — Abr 2026',
    highlights: [
      'Mantenimiento y evolución de un sistema de gestión de capital humano a nivel empresarial.',
      'Backend escalable y de alta concurrencia con Elixir y Phoenix Framework.',
      'Diseño y consumo de servicios web REST y optimización de PostgreSQL.',
      'Flujos de trabajo avanzados con Git y entornos de integración continua (CI/CD).',
    ],
  },
  {
    role: 'Becario · Olimpiada Informática UCLM',
    company: 'Universidad de Castilla-La Mancha',
    companyUrl: 'https://esi.uclm.es/index.php/2024/10/07/oferta-becas-de-colaboracion-2/',
    period: 'Oct 2024 — May 2025',
    highlights: [
      'Organización y coordinación de la Olimpiada Informática.',
      'Preparación de pruebas y material de entrenamiento para estudiantes.',
      'Fomento de la programación competitiva entre jóvenes.',
    ],
  },
  {
    role: 'Monitor de campamentos de verano',
    company: 'Diversos campamentos juveniles',
    period: 'Veranos 2021 — 2025',
    highlights: [
      'Coordinación de grupos de niños y adolescentes en más de 6 campamentos.',
      'Planificación de juegos, dinámicas de grupo y talleres.',
      'Liderazgo, comunicación efectiva y resolución de conflictos.',
    ],
  },
];

export interface EducationItem {
  title: string;
  center: string;
  period: string;
  note?: string;
}

export const education: EducationItem[] = [
  { title: 'Máster Universitario en Ingeniería Informática (MUii)', center: 'Universidad de Castilla-La Mancha', period: '2026 — Actualidad' },
  { title: 'Grado en Ingeniería Informática', center: 'Universidad de Castilla-La Mancha', period: '2022 — 2026', note: 'Mención en Tecnologías de la Información' },
  { title: 'ESO y Bachillerato', center: 'IES La Sisla, Sonseca', period: '2020 — 2022', note: 'Matrícula de Honor' },
];

export const achievements: string[] = [
  'TFG calificado con 9,5/10 (2026)',
  'Nota media de 8,38/10 en el Grado en Ing. Informática',
  'Matrícula de Honor en Álgebra y Matemática Discreta',
  'Matrícula de Honor en Fundamentos de Programación II',
];

export interface Award {
  title: string;
  year: string;
  url?: string;
  place: string;
}

export const awards: Award[] = [
  { place: '1º', title: 'Olimpiada Informática UCLM', year: '2022', url: 'https://www.uclm.es/es/noticias/noticias2022/mayo/ciudad-real/final_olimpiada_regional_informatica' },
  { place: '1º', title: 'Codestorm ESI UCLM', year: '2025', url: 'https://esi.uclm.es/index.php/2025/04/01/ganadores-del-codestorm-2025/' },
  { place: '2º', title: 'Hackathon', year: '2024', url: 'https://esi.uclm.es/index.php/2024/09/18/santa-tecla-2024/' },
  { place: '5º', title: 'CTF Hack&Win ESI UCLM', year: '2025', url: 'https://esi.uclm.es/index.php/2025/11/07/ganadores-del-hack-win-2025/' },
];
