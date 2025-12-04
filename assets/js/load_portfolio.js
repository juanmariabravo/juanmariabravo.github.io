// Cargar proyectos desde JSON
document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/projects/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioContainer = document.querySelector('.isotope-layout .row.gy-4.isotope-container');

            if (!portfolioContainer) {
                console.error('Portfolio container not found');
                return;
            }

            data.projects.forEach((project, index) => {
                const delay = (index + 1) * 100;
                const portfolioItem = `
          <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${project.filter}" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="portfolio-content h-100">
              <img src="${project.thumbnail}" class="img-fluid" alt="${project.title}">
              <div class="portfolio-info">
                <h4>${project.title}</h4>
                <p>${project.technologies}</p>
                <a href="portfolio-details.html?id=${project.id}" title="Más Detalles" class="details-link"><i class="bi bi-link-45deg"></i></a>
            </div>
          </div>
        `;
                portfolioContainer.innerHTML += portfolioItem;
            });

            // Reinicializar Isotope después de cargar los proyectos
            if (typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
                imagesLoaded(portfolioContainer, function () {
                    const isotope = new Isotope(portfolioContainer, {
                        itemSelector: '.portfolio-item',
                        layoutMode: 'fitRows'
                    });

                    // Filtros
                    const filters = document.querySelectorAll('.portfolio-filters li');
                    filters.forEach(filter => {
                        filter.addEventListener('click', function () {
                            filters.forEach(f => f.classList.remove('filter-active'));
                            this.classList.add('filter-active');
                            const filterValue = this.getAttribute('data-filter');
                            isotope.arrange({ filter: filterValue });
                        });
                    });
                });
            }

            // Reinicializar AOS
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => console.error('Error cargando proyectos:', error));
});