/*
 * ===============================================
 * SCRIPT PARA BERRETTA S.A.
 * Desarrollado por Algoritmia Desarrollos
 *
 * 1. Navegación Móvil (Off-Canvas)
 * 2. Acordeones (Servicios y FAQ)
 * 3. Pestañas (Tabs de Productos)
 * ===============================================
 */

// Esperamos a que todo el HTML esté cargado antes de ejecutar el JS
document.addEventListener("DOMContentLoaded", () => {

    /**
     * 1. NAVEGACIÓN MÓVIL (OFF-CANVAS)
     * Activa y desactiva el menú en móviles.
     */
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav .nav-links a");

    if (navToggle && mainNav) {
        // Al hacer clic en el botón hamburguesa
        navToggle.addEventListener("click", () => {
            mainNav.classList.toggle("nav-active");
            
            // Opcional: animar el botón de hamburguesa
            // navToggle.classList.toggle("is-active"); 
        });

        // Cierra el menú si se hace clic en un enlace (para SPAs o #links)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (mainNav.classList.contains("nav-active")) {
                    mainNav.classList.remove("nav-active");
                    // navToggle.classList.remove("is-active");
                }
            });
        });
    }

    /**
     * 2. ACORDEONES (SERVICIOS Y FAQ)
     * Expande y contrae los items del acordeón.
     * Esta versión usa 'scrollHeight' para una altura perfecta.
     */
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        if (header && content) {
            header.addEventListener("click", () => {
                // Alterna la clase 'active' en el item padre
                item.classList.toggle("active");

                if (item.classList.contains("active")) {
                    // Si se está abriendo, asigna la altura del contenido
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    // Si se está cerrando, vuelve a null (o "0px")
                    content.style.maxHeight = null;
                }
            });
        }
    });

    /**
     * 3. PESTAÑAS (TABS DE PRODUCTOS)
     * Cambia entre "Productos Reciclados" y "Materiales que Vendemos".
     */
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0 && tabContents.length > 0) {
        
        // Asegúrate de que el primer tab esté activo al cargar
        // (El HTML y CSS ya deberían hacer esto, pero es una buena práctica)
        tabButtons[0].classList.add("active");
        tabContents[0].classList.add("active");

        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                
                // 1. Obtener el ID del contenido objetivo desde el atributo 'data-tab'
                //    (Tu HTML debe tener data-tab="id-del-contenido")
                
                // *Corrección: El HTML que te di usa los 'data-tab' en los botones
                // y los 'id' en el contenido.* // Ej: <button data-tab="productos-reciclados">
                //     <div id="productos-reciclados">...</div>
                
                // El HTML que te pasé en el primer bloque es:
                // <button class="tab-button active" data-tab="productos-reciclados">
                // <div id="productos-reciclados" class="tab-content active">
                
                // *Si tu HTML no tiene "data-tab", házmelo saber.
                // Asumiendo que el HTML es el que te di:*

                // Desactivamos TODOS los botones y contenidos
                tabButtons.forEach(btn => btn.classList.remove("active"));
                tabContents.forEach(content => content.classList.remove("active"));

                // Activamos el botón clickeado
                button.classList.add("active");
                
                // Activamos el contenido correspondiente
                // (Buscamos un ID que coincida con el data-tab del botón)
                
                // Si usas el HTML que te di, necesitas el 'data-tab'
                // Si no, puedes usar el índice (index). 
                
                // **Vamos a usar el método de data-tab, es más robusto:**
                const targetId = button.dataset.tab; // ej: "productos-reciclados"
                const targetContent = document.getElementById(targetId);
                
                if (targetContent) {
                    targetContent.classList.add("active");
                }
            });
        });
    }

});