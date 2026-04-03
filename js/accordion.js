/* ============================================================
   ACCORDION.JS
   Accordion del Protocolo FAQ
   - Solo un panel abierto a la vez
   - Animación de altura con CSS + JS
   - Accesibilidad: aria-expanded, aria-controls, hidden
   - Teclado: Enter / Space para toggle
   ============================================================ */

(function () {
  'use strict';

  const accordion = document.querySelector('.protocolo__accordion');
  if (!accordion) return;

  const triggers = accordion.querySelectorAll('.accordionItem__trigger');

  /* ----------------------------------------------------------
     ABRIR panel
     ---------------------------------------------------------- */
  function openPanel(trigger) {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    if (!panel) return;

    trigger.setAttribute('aria-expanded', 'true');

    // Mostrar el panel y animar altura
    panel.removeAttribute('hidden');

    // Forzar reflow para que la transición arranque
    const content = panel.querySelector('.accordionItem__content');
    const height  = content.scrollHeight;

    panel.style.maxHeight = '0px';
    panel.style.overflow  = 'hidden';
    panel.style.transition = `max-height var(--transitionSlow)`;

    // Siguiente frame — expandir
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.maxHeight = height + 'px';
      });
    });

    // Limpiar después de la transición
    panel.addEventListener('transitionend', () => {
      panel.style.maxHeight = 'none';
    }, { once: true });
  }

  /* ----------------------------------------------------------
     CERRAR panel
     ---------------------------------------------------------- */
  function closePanel(trigger) {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    if (!panel) return;

    trigger.setAttribute('aria-expanded', 'false');

    // Fijar altura actual antes de colapsar
    const content = panel.querySelector('.accordionItem__content');
    panel.style.maxHeight = content.scrollHeight + 'px';
    panel.style.overflow  = 'hidden';
    panel.style.transition = `max-height var(--transitionMid)`;

    // Siguiente frame — colapsar
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.maxHeight = '0px';
      });
    });

    // Ocultar con hidden después de la transición
    panel.addEventListener('transitionend', () => {
      panel.setAttribute('hidden', '');
      panel.style.maxHeight = '';
      panel.style.overflow  = '';
      panel.style.transition = '';
    }, { once: true });
  }

  /* ----------------------------------------------------------
     CERRAR todos los demás paneles
     ---------------------------------------------------------- */
  function closeOthers(activeTrigger) {
    triggers.forEach(trigger => {
      if (trigger !== activeTrigger && trigger.getAttribute('aria-expanded') === 'true') {
        closePanel(trigger);
      }
    });
  }

  /* ----------------------------------------------------------
     TOGGLE
     ---------------------------------------------------------- */
  function togglePanel(trigger) {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closePanel(trigger);
    } else {
      closeOthers(trigger);
      openPanel(trigger);
    }
  }

  /* ----------------------------------------------------------
     EVENTOS
     ---------------------------------------------------------- */
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => togglePanel(trigger));
  });

})();