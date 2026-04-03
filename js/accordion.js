/* ============================================================
   CONCRETE VOID STUDIO — main.js
   Lógica compartida en todas las páginas
   ============================================================ */

'use strict';

// ── Esperar a que el DOM esté listo ──
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavbar();
  initScrollReveal();
  initCustomCursor();
  setActiveNavLink();
});

/* ============================================================
   1. PAGE LOADER
   Muestra una pantalla de carga breve al entrar
   ============================================================ */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  // Ocultar el loader después de que la página cargue
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800); // 800ms de pantalla de entrada
  });
}

/* ============================================================
   2. NAVBAR
   - Se oscurece al hacer scroll
   - Menú hamburguesa para mobile
   ============================================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  if (!navbar) return;

  // Scroll → agregar clase .scrolled
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');

      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');

      // Bloquear scroll del body cuando el menú está abierto
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Cerrar al hacer clic en un link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ============================================================
   3. SCROLL REVEAL
   Observa elementos con clase .reveal y añade .visible
   cuando entran en el viewport
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Una vez visible, dejar de observar (optimización)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,      // 10% del elemento visible para activar
      rootMargin: '0px 0px -60px 0px' // se activa 60px antes del borde inferior
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   4. CUSTOM CURSOR
   Solo en desktop (no en touch)
   ============================================================ */
function initCustomCursor() {
  // No inicializar en dispositivos táctiles
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursorDot  = document.querySelector('.cursor__dot');
  const cursorRing = document.querySelector('.cursor__ring');

  if (!cursorDot || !cursorRing) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  // El punto sigue al mouse instantáneamente
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top  = `${mouseY}px`;
  });

  // El ring sigue con un lag suave (lerp)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top  = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }

  animateRing();
}

/* ============================================================
   5. ACTIVE NAV LINK
   Marca el link activo según la página actual
   ============================================================ */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === './')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   6. UTILITY: Formatear número de sección con cero a la izq.
   Uso: formatIndex(3) → "03"
   ============================================================ */
function formatIndex(n) {
  return String(n).padStart(2, '0');
}

/* ============================================================
   7. UTILITY: Debounce (para eventos frecuentes como resize)
   Uso: window.addEventListener('resize', debounce(fn, 200))
   ============================================================ */
function debounce(fn, delay = 200) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}