/*
 * ===============================================
 * SCRIPT PARA BERRETTA S.A.
 * Desarrollado por Algoritmia Desarrollos
 *
 * 0. Carga de Header y Footer
 * 1. Navegación Móvil (Off-Canvas)
 * 2. Carrousel de Hero
 * 3. Acordeones (Servicios y FAQ)
 * 4. Pestañas (Tabs de Productos)
 * 5. Lightbox (Galería)
 * ===============================================
 */

/**
 * 0. Carga de Header y Footer
 * Esta función busca los archivos en la carpeta /partes/ y los inyecta.
 */
const loadHTML = async (elementId, filePath) => {
    const element = document.getElementById(elementId);
    if (element) {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const text = await response.text();
                element.innerHTML = text;
                
                // Una vez cargado el header, volvemos a activar la lógica del menú móvil
                if (elementId === 'header-placeholder') {
                    initMobileNav();
                }
                
                // Marcar el link de nav activo
                if (elementId === 'header-placeholder') {
                    markActiveLink();
                }
            } else {
                element.innerHTML = `<p>Error al cargar ${elementId}.</p>`;
            }
        } catch (error) {
            console.error(`Error fetching ${filePath}:`, error);
            element.innerHTML = `<p>Error al cargar ${elementId}.</p>`;
        }
    }
};

/**
 * Función para marcar el link de navegación activo
 */
function markActiveLink() {
    const navLinks = document.querySelectorAll(".main-nav .nav-links a");
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * 1. Navegación Móvil (Off-Canvas)
 * Se mete en una función para ser llamada DESPUÉS de que se cargue el header.
 */
function initMobileNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav .nav-links a");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            mainNav.classList.toggle("nav-active");
            navToggle.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mainNav.classList.contains("nav-active")) {
                    mainNav.classList.remove("nav-active");
                    navToggle.classList.remove("active");
                }
            });
        });
    }
}

/**
 * 2. Carrousel de Hero
 */
function initHeroSlider() {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    if (!sliderWrapper) return; // Si no hay slider, no sigas.

    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("slider-prev");
    const nextBtn = document.getElementById("slider-next");
    const dotsContainer = document.getElementById("slider-dots");
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;
        let autoPlayInterval;

        // Crear puntos de navegación (dots)
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement("button");
            dot.classList.add("dot");
            dot.dataset.slide = i;
            if (i === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        }
        
        const dots = document.querySelectorAll(".dot");

        function goToSlide(slideIndex) {
            sliderWrapper.style.transform = `translateX(-${slideIndex * (100 / slideCount)}%)`;
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[slideIndex].classList.add('active');

            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
            
            currentSlide = slideIndex;
        }

        function next() {
            const nextSlide = (currentSlide + 1) % slideCount;
            goToSlide(nextSlide);
        }

        function prev() {
            const prevSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(prevSlide);
        }
        
        function startAutoPlay() {
             autoPlayInterval = setInterval(next, 7000); // Cambia de slide cada 7 segundos
        }
        
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        nextBtn.addEventListener("click", () => {
            next();
            resetAutoPlay();
        });

        prevBtn.addEventListener("click", () => {
            prev();
            resetAutoPlay();
        });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                goToSlide(parseInt(dot.dataset.slide));
                resetAutoPlay();
            });
        });
        
        startAutoPlay(); // Iniciar autoplay
    }
}

/**
 * 3. Acordeones (Servicios y FAQ)
 */
function initAccordions() {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        if (header && content) {
            header.addEventListener("click", () => {
                item.classList.toggle("active");
                if (item.classList.contains("active")) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });
}

/**
 * 4. Pestañas (Tabs de Productos)
 */
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                tabButtons.forEach(btn => btn.classList.remove("active"));
                tabContents.forEach(content => content.classList.remove("active"));
                button.classList.add("active");
                
                const targetId = button.dataset.tab;
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    targetContent.classList.add("active");
                }
            });
        });
        
        let hasActiveTab = false;
        tabButtons.forEach(btn => {
            if(btn.classList.contains('active')) hasActiveTab = true;
        });
        if (!hasActiveTab) {
             tabButtons[0].classList.add("active");
             tabContents[0].classList.add("active");
        }
    }
}

/**
 * 5. Lightbox (Galería)
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("gallery-lightbox");
    
    if (!lightbox) return; // Si no hay lightbox, no sigas.

    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    let currentImageIndex;
    const images = Array.from(galleryItems).map(item => item.href);

    if (lightbox) {
        galleryItems.forEach((item, index) => {
            item.addEventListener("click", (e) => {
                e.preventDefault(); 
                currentImageIndex = index;
                showImage(currentImageIndex);
                lightbox.classList.add("active");
            });
        });

        function showImage(index) {
            lightboxImg.src = images[index];
            currentImageIndex = index; 
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }

        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
        }

        closeBtn.addEventListener("click", closeLightbox);
        nextBtn.addEventListener("click", showNextImage);
        prevBtn.addEventListener("click", showPrevImage);

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (lightbox.classList.contains("active")) {
                if (e.key === "ArrowRight") showNextImage();
                else if (e.key === "ArrowLeft") showPrevImage();
                else if (e.key === "Escape") closeLightbox();
            }
        });
    }
}


// --- EJECUTAR TODO AL CARGAR LA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar HTML común
    loadHTML('header-placeholder', 'partes/header.html');
    loadHTML('footer-placeholder', 'partes/footer.html');
    
    // 2. Iniciar todos los scripts
    // (Ya no se llaman por separado, se llaman cuando se carga el DOM)
    initHeroSlider();
    initAccordions();
    initTabs();
    initLightbox();
});