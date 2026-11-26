function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

function stripHtml(html) {
    const element = document.createElement('div');
    element.innerHTML = html || '';
    return element.textContent.replace(/\s+/g, ' ').trim();
}

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    fetch('assets/projects/portfolio.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar portfolio.json (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);

            if (project) {
                // Título y descripción de la pestaña / buscadores
                document.title = `${project.title} - Juan María Bravo López`;
                const metaDescription = document.querySelector('meta[name="description"]');
                const summary = stripHtml(project.description);
                if (metaDescription && summary) {
                    metaDescription.setAttribute('content', summary.length > 160 ? summary.slice(0, 157) + '...' : summary);
                }

                // Populate Images - Usar el selector correcto
                const swiperWrapper = document.querySelector('.swiper-wrapper');

                if (!swiperWrapper) {
                    console.error('Swiper wrapper not found');
                    return;
                }

                swiperWrapper.innerHTML = ''; // Limpiar contenido existente

                const images = project.images || [];
                images.forEach((imgSrc, i) => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    const alt = `${escapeHtml(project.title)} - captura ${i + 1} de ${images.length}`;
                    // Cada imagen abre el visor a pantalla completa (zoom útil en móvil)
                    slide.innerHTML = `<a href="${escapeHtml(imgSrc)}" class="glightbox" data-gallery="project-gallery" aria-label="Ampliar captura ${i + 1}">` +
                        `<img src="${escapeHtml(imgSrc)}" alt="${alt}" ${i === 0 ? '' : 'loading="lazy"'} decoding="async"></a>`;
                    swiperWrapper.appendChild(slide);
                });

                const titleHeader = document.querySelector('h1.mb-2.mb-lg-0');
                if (titleHeader) {
                    titleHeader.textContent = project.title;
                }

                // Populate Info
                const infoList = document.getElementById('portfolio-info-list');
                if (infoList) {
                    infoList.innerHTML = `
                        <li><strong>Categoría</strong>: ${escapeHtml(project.category)}</li>
                        <li><strong>Propósito</strong>: ${escapeHtml(project.purpose)}</li>
                        <li><strong>Fecha</strong>: ${escapeHtml(project.date)}</li>
                        <li><strong>Tecnologías</strong>: ${escapeHtml((project.technologies || []).join(', '))}</li>
                        ${project.private ? '<li><strong>Acceso</strong>: Repositorio privado</li>' : ''}
                    `;
                }

                // Botones de acción grandes (más fáciles de pulsar que una URL larga)
                const actions = document.getElementById('portfolio-actions');
                if (actions) {
                    const buttons = [];
                    if (project.demo) {
                        buttons.push(`<a href="${escapeHtml(project.demo)}" class="btn-demo" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Visitar página</a>`);
                    }
                    if (project.url && !project.private) {
                        buttons.push(`<a href="${escapeHtml(project.url)}" class="btn-demo${project.demo ? ' btn-outline' : ''}" target="_blank" rel="noopener"><i class="bi bi-github"></i> Ver código en GitHub</a>`);
                    }
                    actions.innerHTML = buttons.join('');
                }

                // Populate Description
                const titleElement = document.getElementById('portfolio-title');
                const descElement = document.getElementById('portfolio-description-text');

                if (titleElement) titleElement.textContent = project.title;
                if (descElement) descElement.innerHTML = project.description;

                // Inicializar Swiper después de insertar las imágenes
                if (typeof Swiper !== 'undefined') {
                    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    new Swiper('.portfolio-details-slider', {
                        loop: images.length > 1,
                        speed: 500,
                        slidesPerView: 1,
                        spaceBetween: 16,
                        autoHeight: false,
                        keyboard: { enabled: true },
                        autoplay: reduceMotion || images.length < 2 ? false : {
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: true
                        },
                        navigation: {
                            nextEl: '.portfolio-details-slider .swiper-button-next',
                            prevEl: '.portfolio-details-slider .swiper-button-prev'
                        },
                        pagination: {
                            el: '.portfolio-details-slider .swiper-pagination',
                            type: 'bullets',
                            clickable: true
                        }
                    });
                }

                // Visor a pantalla completa para ampliar las capturas
                if (typeof GLightbox !== 'undefined') {
                    GLightbox({ selector: '.portfolio-details-slider .glightbox' });
                }
            } else {
                const portfolioSection = document.querySelector('.portfolio-details');
                if (portfolioSection) {
                    portfolioSection.innerHTML = '<div class="container"><p>Proyecto no encontrado.</p><p><a href="index.html#portfolio"><i class="bi bi-arrow-left"></i> Volver al portfolio</a></p></div>';
                }
            }
        })
        .catch(error => {
            const portfolioSection = document.querySelector('.portfolio-details');
            if (portfolioSection) {
                portfolioSection.innerHTML = '<div class="container"><p>Error al cargar los datos del proyecto.</p></div>';
            }
            console.error('Error cargando proyecto:', error);
        });
});