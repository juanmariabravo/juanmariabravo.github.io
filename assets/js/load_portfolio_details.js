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

                project.images.forEach(imgSrc => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    slide.innerHTML = `<img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async">`;
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
                        ${project.url && !project.private ? `<li><strong>URL del Proyecto</strong>: <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener">${escapeHtml(project.url)}</a></li>` : ''}
                        ${project.demo ? `<li><strong>Página en producción</strong>: <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener">${escapeHtml(project.demo)}</a></li>` : ''}
                        ${project.private ? '<li><strong>Acceso</strong>: Repositorio privado</li>' : ''}
                    `;
                }

                // Populate Description
                const titleElement = document.getElementById('portfolio-title');
                const descElement = document.getElementById('portfolio-description-text');

                if (titleElement) titleElement.textContent = project.title;
                if (descElement) descElement.innerHTML = project.description;

                // Reinicializar Swiper después de cargar las imágenes
                if (typeof Swiper !== 'undefined') {
                    setTimeout(() => {
                        const swiper = new Swiper('.portfolio-details-slider', {
                            loop: true,
                            speed: 600,
                            autoplay: {
                                delay: 5000
                            },
                            slidesPerView: 'auto',
                            pagination: {
                                el: '.swiper-pagination',
                                type: 'bullets',
                                clickable: true
                            }
                        });
                    }, 100);
                }
            } else {
                const portfolioSection = document.querySelector('.portfolio-details');
                if (portfolioSection) {
                    portfolioSection.innerHTML = '<div class="container"><p>Proyecto no encontrado.</p></div>';
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