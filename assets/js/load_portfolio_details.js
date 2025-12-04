document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    fetch('assets/projects/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const project = data.projects.find(p => p.id === projectId);

            if (project) {
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
                    slide.innerHTML = `<img src="${imgSrc}" alt="${project.title}">`;
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
                        <li><strong>Categoría</strong>: ${project.category}</li>
                        <li><strong>Propósito</strong>: ${project.purpose}</li>
                        <li><strong>Fecha</strong>: ${project.date}</li>
                        <li><strong>Tecnologías</strong>: ${project.technologies.join(', ')}</li>
                        <li><strong>URL del Proyecto</strong>: <a href="${project.url}" target="_blank" rel="noopener">${project.url}</a></li>
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