# 🌐 Portfolio de Juan María Bravo López

Portfolio personal construido con **[Astro](https://astro.build)** y **Tailwind CSS**, con diseño tipo *bento*, tema claro/oscuro y una página propia para cada proyecto.

#### 👉 [Visita mi portfolio](https://juanmariabravo.github.io) · 📃 [CV en PDF](https://juanmariabravo.github.io/assets/cvs/JuanMariaBravo_CV.pdf)

> La versión anterior (plantilla iPortfolio de BootstrapMade) se conserva en la etiqueta git **`v1`**:
> `git checkout v1`

## Desarrollo

Requiere Node.js ≥ 22.

```bash
npm install
npm run dev       # servidor de desarrollo en http://localhost:4321
npm run build     # genera el sitio estático en dist/
npm run preview   # sirve dist/ en local
npm run check     # comprobación de tipos y del esquema de proyectos
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `src/data/portfolio.json` | Proyectos (se valida con el esquema de `src/content.config.ts`) |
| `src/data/profile.ts` | Datos personales, stack, experiencia, formación y premios |
| `src/assets/portfolio/` | Capturas de los proyectos (Astro las convierte a AVIF/WebP) |
| `src/pages/` | Inicio, listado de proyectos, página de cada proyecto y 404 |
| `src/components/` | Componentes reutilizables (tarjetas, galería, formulario…) |
| `public/` | Archivos servidos tal cual: CV, favicon, `robots.txt` y la redirección de enlaces antiguos |

## Añadir un proyecto

1. Copia las capturas en `src/assets/portfolio/<id-del-proyecto>/`.
2. Añade una entrada en `src/data/portfolio.json`; las rutas de imagen son relativas a `src/assets/`:

```json
{
  "id": "mi-proyecto",
  "title": "Mi proyecto",
  "category": "Desarrollo Web",
  "filter": "filter-web, filter-api",
  "purpose": "Proyecto personal",
  "featured": false,
  "date": "2026",
  "url": "https://github.com/juanmariabravo/mi-proyecto",
  "demo": "",
  "description": "<p>Descripción en HTML.</p>",
  "images": ["portfolio/mi-proyecto/1.png"],
  "thumbnail": "portfolio/mi-proyecto/1.png",
  "technologies": ["React", "Node.js"]
}
```

Filtros disponibles: `filter-web`, `filter-api`, `filter-datos`, `filter-communication`, `filter-ia`, `filter-desktop`, `filter-electronica`.
Con `"featured": true` el proyecto aparece en la portada (el primero, en grande). El orden del JSON es el orden de la web.

## Despliegue

Cada push a `main` construye y publica la web con GitHub Actions (`.github/workflows/deploy.yml`).
Requisito único: en *Settings → Pages → Source* debe estar seleccionado **GitHub Actions**.

---
✉️ juanmariabravo12@gmail.com · 🔗 [GitHub @juanmariabravo](https://github.com/juanmariabravo)
