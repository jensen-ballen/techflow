export class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveLink();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMenu());
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.menuToggle?.classList.toggle('active');
        this.navLinks?.classList.toggle('active');
        document.body.style.overflow = this.navLinks?.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
        this.menuToggle?.classList.remove('active');
        this.navLinks?.classList.remove('active');
        document.body.style.overflow = '';
    }

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink?.classList.add('active');
                }
            });
        });
    }
}