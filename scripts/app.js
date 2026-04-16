import { Navbar } from './components/Navbar.js';
import { Services } from './components/Services.js';
import { ContactForm } from './components/ContactForm.js';
import { ThemeToggle } from './components/ThemeToggle.js';
import { ScrollAnimation } from './utils/animations.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initComponents();
            this.loadServices();
            this.initScrollEffects();
            console.log('TechFlow initialized successfully');
        });
    }

    initComponents() {
        new Navbar();
        new ContactForm();
        new ThemeToggle();
    }

    loadServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
            new Services(servicesGrid);
        }
    }

    initScrollEffects() {
        new ScrollAnimation();
    }
}

new App();