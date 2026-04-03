/* ============================================================
   HEADER.JS
   Comportamiento del header al hacer scroll:
   - Añade clase .isScrolled después del hero
   - Reduce altura y aplica fondo sólido
   - Marca el link activo según la sección visible
   ============================================================ */

(function () {
  'use strict';

  const siteHeader = document.getElementById('siteHeader');
  const navLinks   = document.querySelectorAll('.siteNav__link');

  if (!siteHeader) return;

  /* ----------------------------------------------------------
     SCROLL — transparente ↔ sólido
     Se activa después de 80px (aprox. altura del header)
     ---------------------------------------------------------- */
  const SCROLL_THRESHOLD = 80;

  function handleHeaderScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      siteHeader.classList.add('isScrolled');
    } else {
      siteHeader.classList.remove('isScrolled');
    }
  }

  /* ----------------------------------------------------------
     ACTIVE LINK — resalta el link de la sección visible
     Usa IntersectionObserver para detectar qué sección
     ocupa más espacio en el viewport
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id], main[id]');

  function clearActiveLinks() {
    navLinks.forEach(link => link.classList.remove('isActive'));
  }

  function setActiveLink(sectionId) {
    clearActiveLinks();
    const activeLink = document.querySelector(`.siteNav__link[href="#${sectionId}"]`);
    if (activeLink) activeLink.classList.add('isActive');
  }

  // IntersectionObserver — detecta la sección más visible
  const observerOptions = {
    root:       null,
    rootMargin: `-${SCROLL_THRESHOLD}px 0px -50% 0px`,
    threshold:  0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  /* ----------------------------------------------------------
     EVENTOS
     ---------------------------------------------------------- */

  // Scroll — con throttle ligero via requestAnimationFrame
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleHeaderScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Estado inicial al cargar la página
  handleHeaderScroll();

})();