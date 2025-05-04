// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create fallback image for when images fail to load
    const fallbackImage = document.createElement('img');
    fallbackImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%239d4edd" /><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">Nas</text></svg>';
    fallbackImage.style.display = 'none';
    fallbackImage.id = 'fallback-image';
    document.body.appendChild(fallbackImage);

    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        if (!img.id || img.id !== 'fallback-image') {
            img.addEventListener('error', function() {
                this.src = fallbackImage.src;
                this.classList.add('fallback-image');
            });
        }
    });

    // Animate skill bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progressValue = progressBar.getAttribute('data-progress');
                    progressBar.style.width = `${progressValue}%`;
                }
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));

    // Portfolio tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.portfolio-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show active tab content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Portfolio modal functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeBtns = document.querySelectorAll('.modal-close');

    // Function to handle image gallery interaction
    const setupGalleryInteraction = () => {
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.addEventListener('click', function() {
                // Create temporary full-screen preview
                const preview = document.createElement('div');
                preview.classList.add('image-preview');
                
                const previewImg = document.createElement('img');
                previewImg.src = this.src;
                
                const closePreview = document.createElement('span');
                closePreview.classList.add('preview-close');
                closePreview.innerHTML = '×';
                
                preview.appendChild(previewImg);
                preview.appendChild(closePreview);
                document.body.appendChild(preview);
                
                // Add styles dynamically
                preview.style.position = 'fixed';
                preview.style.top = '0';
                preview.style.left = '0';
                preview.style.width = '100%';
                preview.style.height = '100%';
                preview.style.backgroundColor = 'rgba(0,0,0,0.9)';
                preview.style.zIndex = '3000';
                preview.style.display = 'flex';
                preview.style.justifyContent = 'center';
                preview.style.alignItems = 'center';
                preview.style.cursor = 'zoom-out';
                
                previewImg.style.maxWidth = '90%';
                previewImg.style.maxHeight = '90%';
                previewImg.style.borderRadius = '8px';
                previewImg.style.objectFit = 'contain';
                
                closePreview.style.position = 'absolute';
                closePreview.style.top = '20px';
                closePreview.style.right = '30px';
                closePreview.style.color = 'white';
                closePreview.style.fontSize = '3rem';
                closePreview.style.cursor = 'pointer';
                
                // Close on click
                preview.addEventListener('click', () => {
                    document.body.removeChild(preview);
                });
            });
        });
    };

    // Function to handle video autoplay
    const handleVideoAutoplay = (modal, shouldPlay) => {
        const video = modal.querySelector('iframe');
        if (video) {
            const videoSrc = video.src;
            // Only modify if we have a source
            if (videoSrc) {
                const baseUrl = videoSrc.split('?')[0];
                video.src = shouldPlay ? 
                    `${baseUrl}?autoplay=1&mute=1` : 
                    baseUrl;
            }
        }
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                handleVideoAutoplay(modal, true);
                
                // Set up gallery interaction after modal is opened
                setupGalleryInteraction();
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.portfolio-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                handleVideoAutoplay(modal, false);
            }
        });
    });

    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                handleVideoAutoplay(modal, false);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    handleVideoAutoplay(modal, false);
                }
            });
            
            // Also close any image previews
            const preview = document.querySelector('.image-preview');
            if (preview) {
                document.body.removeChild(preview);
            }
        }
    });

    // Smooth scroll for View My Work button
    const viewWorkBtn = document.querySelector('.view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // If mobile menu is open, close it after clicking
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Add scroll animation to all sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Fix for modal gallery images
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
    
    // Initialize glitch effect on hero title
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        glitchElement.setAttribute('data-text', glitchElement.textContent);
    }

    // Add floating animation to cards
    const addFloatingAnimation = () => {
        const cards = document.querySelectorAll('.glow-purple');
        cards.forEach((card, index) => {
            // Create staggered animation timing
            const delay = index * 0.2;
            card.style.animation = `float 4s ease-in-out ${delay}s infinite`;
        });
    };
    
    // Call the floating animation function
    addFloatingAnimation();
    
    // Console message for developers
    console.log('Nas Portfolio Website - Updated 2025');
});
