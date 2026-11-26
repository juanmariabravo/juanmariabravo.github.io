function normalizeProjectFilters(project) {
    const rawFilters = Array.isArray(project.filter) ? project.filter : String(project.filter || '').split(',');

    return rawFilters
        .flatMap(filter => String(filter || '').split(/\s+/))
        .map(filter => filter.trim().replace(/^\./, ''))
        .filter(Boolean);
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

const MAX_VISIBLE_TAGS = 4;

function renderProjectCard(project, index) {
    // Retardo escalonado pero acotado, para que las últimas tarjetas no tarden en aparecer
    const delay = Math.min(index, 5) * 80;
    const projectFilters = normalizeProjectFilters(project).map(escapeHtml).join(' ');
    const title = escapeHtml(project.title);
    const technologies = project.technologies || [];
    const visibleTags = technologies.slice(0, MAX_VISIBLE_TAGS)
        .map(tech => `<li>${escapeHtml(tech)}</li>`).join('');
    const hiddenCount = technologies.length - MAX_VISIBLE_TAGS;
    const moreTag = hiddenCount > 0
        ? `<li title="${escapeHtml(technologies.slice(MAX_VISIBLE_TAGS).join(', '))}">+${hiddenCount}</li>`
        : '';
    const meta = [project.category, project.date].filter(Boolean).map(escapeHtml).join(' · ');
    const badge = project.demo
        ? '<span class="portfolio-badge"><i class="bi bi-broadcast"></i> Web Pública</span>'
        : '';

    return `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${projectFilters}" data-aos="fade-up" data-aos-delay="${delay}">
            <article class="portfolio-card">
              <div class="portfolio-thumb">
                <img src="${escapeHtml(project.thumbnail)}" alt="Captura de ${title}" loading="lazy" decoding="async">
                ${badge}
              </div>
              <div class="portfolio-body">
                <span class="portfolio-meta">${meta}</span>
                <h3 class="portfolio-title">
                  <a href="portfolio-details.html?id=${encodeURIComponent(project.id)}" class="stretched-link">${title}</a>
                </h3>
                <ul class="portfolio-tags" aria-label="Tecnologías">${visibleTags}${moreTag}</ul>
              </div>
            </article>
          </div>`;
}

// Cargar proyectos desde JSON
document.addEventListener('DOMContentLoaded', function () {
    const portfolioContainer = document.querySelector('.isotope-layout .isotope-container');
    const filters = document.querySelectorAll('.portfolio-filters li');
    let isotope = null;
    let currentFilter = '*';

    if (!portfolioContainer) {
        console.error('Portfolio container not found');
        return;
    }

    // Los filtros se registran desde el principio: si Isotope aún no está listo,
    // se guarda el filtro elegido y se aplica al inicializarlo.
    filters.forEach(filter => {
        filter.addEventListener('click', function () {
            filters.forEach(f => f.classList.remove('filter-active'));
            this.classList.add('filter-active');
            currentFilter = this.getAttribute('data-filter') || '*';
            if (isotope) {
                isotope.arrange({ filter: currentFilter });
            }
        });
        filter.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    fetch('assets/projects/portfolio.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar portfolio.json (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            portfolioContainer.innerHTML = data.projects.map(renderProjectCard).join('');

            // Reinicializar AOS para la animación inicial
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }

            if (typeof Isotope === 'undefined') {
                return;
            }

            // Isotope se inicializa ya (las miniaturas tienen proporción fija en CSS),
            // sin esperar a imágenes con loading="lazy" que podrían no cargarse nunca.
            isotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows',
                transitionDuration: '0.4s',
                filter: currentFilter
            });

            // Recolocar a medida que cargan las imágenes, por si alguna cambia de tamaño
            if (typeof imagesLoaded !== 'undefined') {
                imagesLoaded(portfolioContainer).on('progress', () => isotope.layout());
            }

            // Remover atributos AOS después de la animación inicial para evitar conflictos
            setTimeout(() => {
                portfolioContainer.querySelectorAll('.portfolio-item[data-aos]').forEach(item => {
                    item.removeAttribute('data-aos');
                    item.removeAttribute('data-aos-delay');
                    item.classList.remove('aos-init', 'aos-animate');
                });
            }, 1500);
        })
        .catch(error => {
            portfolioContainer.innerHTML = '<p class="text-center">No se han podido cargar los proyectos.</p>';
            console.error('Error cargando proyectos:', error);
        });
});
