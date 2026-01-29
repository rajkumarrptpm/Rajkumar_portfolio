document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';

        // Simple hamburger animation toggle
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';

            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                // Use a slight delay based on index if possible, or just default css delay
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.animation = "fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-image, .section-title, .about-content, .skill-card, .project-card, .timeline-content, .cert-card');

    elementsToAnimate.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        observer.observe(el);
    });

    // Project Data
    const projectsData = [
        {
            title: "Bank App",
            image: "assets/project-1.png",
            images: ["assets/project-1.png"],
            description: "Developed a responsive banking web application using Angular, HTML, and CSS. Implemented user authentication and core banking functionalities like deposit and withdrawal.",
            tags: ["Angular", "HTML/CSS", "Authentication"],
            liveLink: "#",
            repoLink: "#"
        },
        {
            title: "Motive Zone",
            image: "assets/mz1.png",
            images: ["assets/mz1.png", "assets/wg1.png"],
            description: "Developed a modern, responsive business landing page. Utilized HTML, SCSS, JavaScript, and UIkit. Implemented custom header and advanced CSS transitions.",
            tags: ["HTML/SCSS", "JavaScript", "UIkit"],
            liveLink: "#",
            repoLink: "#"
        },
        {
            title: "Car Website",
            image: "assets/project-1.png",
            images: ["assets/project-1.png"],
            description: "Developed a responsive front-end car website. Features include a custom header, carousel, and animated cards. Focused on modern UI/UX design.",
            tags: ["HTML", "CSS", "JavaScript"],
            liveLink: "#",
            repoLink: "#"
        },
        {
            title: "Kitchen Inventory",
            image: "assets/project-2.png",
            images: ["assets/project-2.png"],
            description: "Developed a kitchen inventory management system. Implemented features for adding, editing, and deleting items. Utilized local storage for data persistence.",
            tags: ["HTML/CSS", "JavaScript", "LocalStorage"],
            liveLink: "#",
            repoLink: "#"
        },
        {
            title: "IMDB Clone App",
            image: "assets/project-1.png",
            images: ["assets/project-1.png"],
            description: "Developed an IMDB inspired application using Django REST framework. Implemented authentication, CRUD operations, permissions, and RESTful APIs.",
            tags: ["Django DRF", "SQLite", "API"],
            liveLink: "#",
            repoLink: "#"
        },
        {
            title: "Greatkart",
            image: "assets/project-1.png",
            images: ["assets/project-1.png"],
            description: "Advanced e-commerce platform to buy products with email verification, invoice generation, and PayPal integration using Django framework.",
            tags: ["Python", "Django", "Payment"],
            liveLink: "#",
            repoLink: "#"
        }
    ];

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Modal Elements
    // const modalImg = document.querySelector('.modal-img'); // Removed
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-description');
    const modalTags = document.querySelector('.modal-tags');

    // Carousel Elements
    const track = document.querySelector('.carousel-track');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentSlide = 0;
    let slides = [];
    let slideInterval;

    // Carousel Functions
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update indicators
        const dots = document.querySelectorAll('.indicator');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function createSlides(images) {
        track.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        slides = images;

        images.forEach((imgSrc, index) => {
            const slide = document.createElement('img');
            slide.classList.add('carousel-slide');
            slide.src = imgSrc;
            slide.alt = `Project Image ${index + 1}`;
            track.appendChild(slide);

            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                resetAutoplay();
            });
            indicatorsContainer.appendChild(dot);
        });
    }

    function startAutoplay() {
        stopAutoplay();
        if (slides.length > 1) {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            }, 3000);
        }
    }

    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Open Modal
    // Updated selector for Tailwind structure
    const viewButtons = document.querySelectorAll('.project-overlay .btn-icon:first-child, .group .absolute .btn-icon:first-child');

    viewButtons.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const project = projectsData[index];

            if (project) {
                modalTitle.textContent = project.title;
                modalDesc.textContent = project.description;

                // Setup Carousel
                currentSlide = 0;
                const images = project.images || [project.image];
                createSlides(images);
                updateCarousel();
                startAutoplay();

                // Clear and add tags
                modalTags.innerHTML = '';
                project.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });

                modal.classList.add('active');
            }
        });
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        stopAutoplay();
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            let subject = document.getElementById('contact-subject').value;
            let message = document.getElementById('contact-message').value;

            // Capitalize first letter helper
            const capitalize = (str) => str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;

            name = capitalize(name);
            subject = capitalize(subject);
            message = capitalize(message);

            // Construct body with clear formatting
            const emailBody = `Hi Rajkumar,

${message}

Regards,
${name}
${email}`;

            // Detect Mobile Device
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isMobile) {
                // Mobile-only Logic
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rajkumarrptpm@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(gmailUrl, '_blank');
            } else {
                // Existing Desktop Logic (Unchanged)
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rajkumarrptpm@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                window.open(gmailUrl, '_blank');
            }
        });
    }

    // Projects Scroll Navigation
    const projectsGrid = document.getElementById('projects-grid');
    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');

    if (projectsGrid && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: -300, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

});

// Printable Resume Feature
window.generateResume = function () {
    // 1. Extract Data
    const name = "Raj Kumar R";
    const role = document.querySelector('.role-text').innerText;
    const email = "rajkumarrptpm@gmail.com";
    const phone = "+91-7592053829";
    const location = "Kerala, India";
    const about = document.querySelector('.about-text').innerText;

    // Skills
    const skills = Array.from(document.querySelectorAll('.skill-card h3')).map(el => el.innerText).join(', ');

    // Experience
    const experienceItems = Array.from(document.querySelectorAll('#experience .timeline-item')).map(item => {
        const dateElement = item.querySelector('.date');
        const roleElement = item.querySelector('h3');
        const companyElement = item.querySelector('.institution');
        const descElement = item.querySelector('p:not(.institution)');

        if (!dateElement || !roleElement) return null;

        return {
            date: dateElement.innerText,
            role: roleElement.innerText,
            company: companyElement ? companyElement.innerText : '',
            desc: descElement ? descElement.innerText : ''
        };
    }).filter(item => item !== null);

    // Education
    const eduSectionItems = Array.from(document.querySelectorAll('#education .timeline-item')).map(item => {
        return {
            date: item.querySelector('.date').innerText || "Completed",
            degree: item.querySelector('h3').innerText,
            school: item.querySelector('.institution').innerText
        };
    });

    // Projects
    const projects = Array.from(document.querySelectorAll('.project-info')).map(item => {
        const title = item.querySelector('h3').innerText;
        const desc = item.querySelector('p').innerText;
        const tags = Array.from(item.querySelectorAll('.tags span')).map(t => t.innerText).join(', ');
        return { title, desc, tags };
    });


    // 2. Generate HTML
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${name} - Resume</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;700&display=swap" rel="stylesheet">
            <style>
                :root {
                    --primary: #1E40AF;
                    --text-main: #0F172A;
                    --text-muted: #475569;
                    --border: #E2E8F0;
                }
                body { 
                    font-family: 'Inter', sans-serif; 
                    line-height: 1.6; 
                    color: var(--text-main); 
                    padding: 40px 60px; 
                    max-width: 900px;
                    margin: 0 auto;
                }
                h1, h2, h3 { font-family: 'Outfit', sans-serif; color: var(--text-main); margin: 0; }
                
                h1 { 
                    font-size: 36px; 
                    font-weight: 700; 
                    text-transform: uppercase; 
                    letter-spacing: -1px;
                    color: var(--primary);
                    margin-bottom: 5px;
                }
                
                .header-role { 
                    font-size: 18px; 
                    font-weight: 600; 
                    text-transform: uppercase; 
                    color: var(--text-main);
                    letter-spacing: 1px;
                }

                .header { 
                    text-align: center; 
                    margin-bottom: 40px; 
                    border-bottom: 2px solid var(--primary);
                    padding-bottom: 30px;
                }

                .contact-info { 
                    font-size: 14px; 
                    margin-top: 15px; 
                    color: var(--text-muted);
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .section { margin-bottom: 30px; }
                
                h2 { 
                    font-size: 20px; 
                    border-left: 5px solid var(--primary); 
                    padding-left: 15px; 
                    margin-bottom: 20px; 
                    text-transform: uppercase; 
                    letter-spacing: 1px;
                    background: #F8FAFC;
                    padding-top: 5px;
                    padding-bottom: 5px;
                }

                .item { 
                    margin-bottom: 20px; 
                    page-break-inside: avoid;
                }

                .item-header { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: baseline; 
                    margin-bottom: 5px;
                }

                .item-title { 
                    font-weight: 700; 
                    font-size: 16px; 
                }

                .item-date { 
                    font-weight: 500; 
                    font-size: 14px; 
                    color: var(--primary);
                }

                .item-subtitle { 
                    font-weight: 600; 
                    font-size: 14px; 
                    color: var(--text-muted);
                    margin-bottom: 5px; 
                }

                p { 
                    margin: 0; 
                    font-size: 14px; 
                    color: var(--text-muted);
                    text-align: justify;
                }

                .skills-list { 
                    font-size: 14px; 
                    line-height: 1.8;
                }

                /* Grid for Education to save space */
                .education-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }
                
                @media print {
                    body { padding: 0; }
                    /* @page { margin: 1cm; } */
                    button { display: none; }
                    .no-print { display: none; }
                }

                .no-print { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    background: #f1f5f9;
                    padding: 15px;
                    border-radius: 8px;
                }
                
                .btn-print { 
                    padding: 10px 25px; 
                    background: var(--primary); 
                    color: #fff; 
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    cursor: pointer; 
                    border: none; 
                    border-radius: 6px;
                    transition: background 0.2s;
                }
                .btn-print:hover { background: #1d4ed8; }
            </style>
        </head>
        <body>
            <div class="no-print">
                <p style="text-align: center; margin-bottom: 15px;">This is a print-friendly version of the profile.</p>
                <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
            </div>
            
            <div class="header">
                <h1>${name}</h1>
                <div class="header-role">${role}</div>
                <div class="contact-info">
                    <span class="contact-item">${email}</span> • 
                    <span class="contact-item">${phone}</span> • 
                    <span class="contact-item">${location}</span>
                </div>
            </div>

            <div class="section">
                <h2>Professional Summary</h2>
                <p>${about}</p>
            </div>

            <div class="section">
                <h2>Work Experience</h2>
                ${experienceItems.map(exp => `
                    <div class="item">
                        <div class="item-header">
                            <span class="item-title">${exp.role}</span>
                            <span class="item-date">${exp.date}</span>
                        </div>
                        <div class="item-subtitle">${exp.company}</div>
                        <p>${exp.desc}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2>Key Projects</h2>
                ${projects.map(proj => `
                    <div class="item">
                        <div class="item-header">
                            <span class="item-title">${proj.title}</span>
                         </div>
                         <div class="item-subtitle" style="color: var(--primary); font-size: 13px;">${proj.tags}</div>
                         <p>${proj.desc}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2>Technical Skills</h2>
                <p class="skills-list">${skills}</p>
            </div>

            <div class="section">
                <h2>Education</h2>
                <div class="education-grid">
                ${eduSectionItems.map(edu => `
                    <div class="item">
                        <div class="item-header" style="justify-content: flex-start; gap: 10px;">
                            <span class="item-title">${edu.degree}</span>
                        </div>
                        <div class="item-subtitle">${edu.school}</div>
                        <span class="item-date" style="font-size: 13px;">${edu.date}</span>
                    </div>
                `).join('')}
                </div>
            </div>

            <script>
                // Auto print when loaded
                window.onload = function() { 
                    setTimeout(() => window.print(), 800); 
                }
            </script>
        </body>
        </html>
    `;

    // 3. Open New Window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close(); // Important for styles to apply
    } else {
        alert("Please allow pop-ups to view the resume.");
    }
};
