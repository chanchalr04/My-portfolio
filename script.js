        // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved user preference or use system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            body.classList.add('dark');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });

        // Form Submission
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log({ name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Skills Card Slider
        const skillsSlider = document.getElementById('skillsSlider');
        const skillCards = document.querySelectorAll('.skill-category');

        skillsSlider.addEventListener('scroll', () => {
            const sliderCenter = skillsSlider.scrollLeft + (skillsSlider.clientWidth / 2);
            
            skillCards.forEach(card => {
                const cardCenter = card.offsetLeft + (card.clientWidth / 2);
                const distanceFromCenter = Math.abs(sliderCenter - cardCenter);
                const maxDistance = skillsSlider.clientWidth / 2;
                const scale = 1 - (0.1 * (distanceFromCenter / maxDistance));
                const opacity = 0.7 + (0.3 * (1 - (distanceFromCenter / maxDistance)));
                
                card.style.transform = `scale(${scale})`;
                card.style.opacity = opacity;
                
                if (distanceFromCenter < 100) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });

        // Initialize the slider
        setTimeout(() => {
            skillsSlider.scrollLeft = (skillsSlider.scrollWidth - skillsSlider.clientWidth) / 2;
        }, 100);

        // Scroll Animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('section, .project-card, .certificate-card, .resume-container');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementPosition < windowHeight - elementVisible) {
                    element.classList.add('animate');
                }
            });
            
            // Hero animations
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero .subtitle');
            const heroButtons = document.querySelector('.hero-buttons');
            
            if (heroTitle && heroTitle.getBoundingClientRect().top < windowHeight - 100) {
                heroTitle.classList.add('animate');
                heroSubtitle.classList.add('animate');
                heroButtons.classList.add('animate');
            }
        }

        // Run on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);