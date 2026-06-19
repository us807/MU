/* ==========================================================================
   MOHAMMAD USMAN PORTFOLIO - CORE JAVASCRIPT
   Handles: Typing Effect, Mobile Menu, Scroll Reveal, Skill Bars, Lightbox,
            Stats Counters, and Navigation Highlights.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Navbar Scroll Effect & Back-to-Top Toggle
       ========================================== */
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    window.addEventListener('scroll', () => {
        // Toggle navbar scrolled style
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Toggle back to top button
        if (window.scrollY > 400) {
            scrollToTopBtn.style.display = 'flex';
            setTimeout(() => scrollToTopBtn.style.opacity = '1', 50);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === '0') {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    // Scroll to Top action
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================
       2. Mobile Menu Toggle
       ========================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });


    /* ==========================================
       3. Typewriter Effect for Designations
       ========================================== */
    const designations = [
        "Computer Instructor",
        "Computer Applications Student",
        "MS Office & Tally Trainer",
        "Basic Web Designer"
    ];
    const typingTextElement = document.getElementById('typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const handleTypewriter = () => {
        const currentString = designations[textIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingTextElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle transitions
        if (!isDeleting && charIndex === currentString.length) {
            // Full word typed, wait before deleting
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next designation
            isDeleting = false;
            textIndex = (textIndex + 1) % designations.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(handleTypewriter, typingSpeed);
    };

    // Start typewriter
    setTimeout(handleTypewriter, 1000);


    /* ==========================================
       4. Scroll Reveal Animations (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal, .animate-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Manually run check for initial loading visibility
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .animate-reveal');
        heroElements.forEach(el => el.classList.add('revealed'));
    }, 200);


    /* ==========================================
       5. Skills Progress Bar Animation
       ========================================== */
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                skillsObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });


    /* ==========================================
       6. Achievements Stats Counter Animation
       ========================================== */
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // Count-up time in ms
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function: easeOutQuad
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target; // Ensure exact final value
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target); // Run counter only once
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });


    /* ==========================================
       7. Certification Lightbox Modal
       ========================================== */
    const certCards = document.querySelectorAll('.cert-card');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxCloseOverlay = document.getElementById('lightbox-close-overlay');

    const openLightbox = (card) => {
        const imgPath = card.getAttribute('data-img');
        const title = card.querySelector('.cert-title').textContent;

        lightboxImg.src = imgPath;
        lightboxTitle.textContent = title;
        
        lightboxModal.style.display = 'flex';
        lightboxModal.setAttribute('aria-hidden', 'false');
        
        // Let display:flex apply before adding active class for opacity transition
        setTimeout(() => {
            lightboxModal.classList.add('active');
        }, 10);

        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Re-enable scroll

        // Wait for opacity transition to complete before setting display: none
        setTimeout(() => {
            if (!lightboxModal.classList.contains('active')) {
                lightboxModal.style.display = 'none';
            }
        }, 300);
    };

    certCards.forEach(card => {
        card.addEventListener('click', () => openLightbox(card));
    });

    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxCloseOverlay.addEventListener('click', closeLightbox);

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });


    /* ==========================================
       8. Scroll Active Section Highlighting in Nav
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const highlightNav = () => {
        let scrollPosition = window.scrollY + 200; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });

        // Special case: At the top of the page, clear active highlights
        if (window.scrollY < 100) {
            navItems.forEach(item => item.classList.remove('active'));
        }
    };

    window.addEventListener('scroll', highlightNav);


    /* ==========================================
       9. Form Submission Fallback
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        // We let the action="mailto:..." process naturally, but we can format the subject/body
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Custom formatting for email body
        const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`);
        const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        contactForm.setAttribute('action', `mailto:usmanzya3@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`);
    });
});
