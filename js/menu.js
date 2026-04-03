/* ============================================================
   MENU.JS
   Menú mobile overlay — full screen
   - Abre y cierra con el botón hamburguesa
   - Cierra al hacer clic en un link
   - Cierra con la tecla Escape
   - Bloquea el scroll del body mientras está abierto
   - Gestiona aria-expanded y focus para accesibilidad
   ============================================================ */

(function () {
  'use strict';

  const menuToggle  = document.getElementById('menuToggle');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobileMenu__link, .mobileMenu__cta');

  if (!menuToggle || !mobileMenu) return;

  /* ----------------------------------------------------------
     ESTADO
     ---------------------------------------------------------- */
  let isOpen = false;

  /* ----------------------------------------------------------
     ABRIR MENÚ
     ---------------------------------------------------------- */
  function openMenu() {
    isOpen = true;

    // Mostrar overlay
    mobileMenu.removeAttribute('hidden');

    // Pequeño delay para que la transición CSS se active
    requestAnimationFrame(() => {
      mobileMenu.classList.add('isOpen');
    });

    // Actualizar aria
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');

    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';

    // Mover el foco al primer link del menú
    const firstLink = mobileMenu.querySelector('.mobileMenu__link');
    if (firstLink) firstLink.focus();
  }

  /* ----------------------------------------------------------
     CERRAR MENÚ
     ---------------------------------------------------------- */
  function closeMenu() {
    isOpen = false;

    // Iniciar transición de salida
    mobileMenu.classList.remove('isOpen');

    // Esperar a que termine la transición antes de ocultar
    // (300ms = duración de --transitionMid en tokens.css)
    setTimeout(() => {
      mobileMenu.setAttribute('hidden', '');
    }, 300);

    // Actualizar aria
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');

    // Restaurar scroll del body
    document.body.style.overflow = '';

    // Devolver foco al botón hamburguesa
    menuToggle.focus();
  }

  /* ----------------------------------------------------------
     TOGGLE
     ---------------------------------------------------------- */
  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /* ----------------------------------------------------------
     EVENTOS
     ---------------------------------------------------------- */

  // Botón hamburguesa
  menuToggle.addEventListener('click', toggleMenu);

  // Links del menú — cerrar al navegar
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Tecla Escape — cerrar menú
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Resize — cerrar si se pasa a desktop (>1024px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && isOpen) {
      closeMenu();
    }
  }, { passive: true });

})();