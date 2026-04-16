import { servicesData } from '../data/services.js';

export class Services {
    constructor(container) {
        this.container = container;
        this.render();
    }

    render() {
        this.container.innerHTML = servicesData.map((service, index) => `
            <article class="service-card scroll-reveal" style="animation-delay: ${index * 0.1}s">
                <div class="service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${service.icon}
                    </svg>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="#contact" class="service-link">
                    Saber más
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </article>
        `).join('');
    }
}