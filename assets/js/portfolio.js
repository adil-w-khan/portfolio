// portfolio.js
document.addEventListener('DOMContentLoaded', function() {
    const portfolioContainer = document.querySelector('.isotope-container');
    
    // Function to generate filter classes
    function generateFilterClasses(technologies) {
        return technologies.map(tech => `filter-${tech}`).join(' ');
    }
    
    // Function to create preview HTML
    function createPreviewHTML(project) {
        if (project.hasPreview && project.previewUrl) {
            return `
                <div class="preview" style="position: relative; transform: scale(1);">
                    <iframe src="${project.previewUrl}" class="img-fluid"></iframe>
                    <a href="${project.previewUrl}" target="_blank" 
                    style="
                    position: absolute; top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;"
                    ></a>
                </div>
            `;
        } else {
            return `
                <div class="preview" style="position: relative; transform: scale(1);">
                    <iframe src="" class="img-fluid"></iframe>
                    <a href="${project.githubUrl}" target="_blank" 
                    style="
                    position: absolute; top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;"
                    ></a>
                </div>
            `;
        }
    }
    
    // Function to render projects
    function renderProjects(projects) {
        const projectsHTML = projects.map(project => {
            const filterClasses = generateFilterClasses(project.technologies);
            const previewHTML = createPreviewHTML(project);
            
            return `
                <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${filterClasses}">
                    <div class="portfolio-content h-100">
                        <div class="card" style="width: 18rem;">
                            ${previewHTML}
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                <a href="${project.githubUrl}" target="_blank" class="btn btn-primary">View Code</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        portfolioContainer.innerHTML = projectsHTML;
        
        // Re-initialize Isotope if it exists
        if (window.Isotope && portfolioContainer) {
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                const isotope = new Isotope(portfolioContainer, {
                    itemSelector: '.portfolio-item',
                    layoutMode: 'masonry'
                });
                
                // Re-attach filter functionality
                const filterButtons = document.querySelectorAll('.portfolio-filters li');
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Remove active class from all buttons
                        filterButtons.forEach(btn => btn.classList.remove('filter-active'));
                        // Add active class to clicked button
                        this.classList.add('filter-active');
                        
                        // Get filter value
                        const filterValue = this.getAttribute('data-filter');
                        
                        // Apply filter
                        isotope.arrange({
                            filter: filterValue === '*' ? '*' : filterValue
                        });
                    });
                });
                
                // Refresh AOS animations if it exists
                if (window.AOS) {
                    AOS.refresh();
                }
            }, 100);
        }
    }
    
    // Render all projects
    renderProjects(projectsData);
});