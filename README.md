# Concrete Void Studio

> Architecture written in skin.

Proyecto ficticio de portafolio — sitio web para un estudio de tatuajes con estética brutalista, distópica y ritual.

---

## Stack

- HTML5 semántico
- CSS3 (Custom Properties, Grid, Flexbox, Animaciones)
- JavaScript Vanilla (ES6+)
- Sin frameworks ni dependencias externas

---

## Estructura del proyecto

```
concrete-void-studio/
│
├── index.html          ← Hero + About + Preview galería
├── gallery.html        ← Galería completa con filtros
├── artists.html        ← Perfiles de artistas
├── contact.html        ← Formulario de booking (estático, escalable)
├── faq.html            ← Preguntas frecuentes
│
├── assets/
│   ├── css/
│   │   ├── style.css        ← Variables, reset, tipografía, utilidades
│   │   ├── components.css   ← Navbar, footer, cards, botones, forms
│   │   └── animations.css   ← Glitch, grain, scroll reveal, cursor
│   │
│   ├── js/
│   │   ├── main.js          ← Navbar scroll, mobile menu, scroll reveal, cursor
│   │   ├── animations.js    ← Text scramble, efectos visuales
│   │   └── gallery.js       ← Filtros de galería, lightbox
│   │
│   └── img/
│       ├── tattoos/         ← Fotografías de trabajos
│       ├── artists/         ← Fotografías de artistas
│       └── textures/        ← Texturas de concreto y grano
│
└── README.md
```

---

## Sistema de diseño

### Paleta de color

| Variable            | HEX       | Uso                         |
|---------------------|-----------|-----------------------------|
| `--color-void`      | `#000000` | Base · fondo principal      |
| `--color-concrete`  | `#2B2B2B` | Fondos secundarios · bordes |
| `--color-dust`      | `#6E6E6E` | Texto secundario · detalles |
| `--color-ash`       | `#E8E8E8` | Texto principal · contraste |
| `--color-ritual`    | `#7A0F0F` | Acento ritual (usar con moderación) |

### Tipografía

| Variable          | Fuente              | Uso                     |
|-------------------|---------------------|-------------------------|
| `--font-display`  | Bebas Neue          | Títulos · headings      |
| `--font-mono`     | Share Tech Mono     | Labels · datos técnicos |
| `--font-body`     | Barlow Condensed    | Cuerpo de texto         |

---

## Clases y componentes clave

### Efectos
- `.glitch` + `data-text="TEXTO"` → efecto glitch CSS
- `.grain` → overlay de ruido cinematográfico (se agrega al body)
- `.reveal` → animación de aparición al scroll
- `.scramble` + `data-text="TEXTO"` + `data-scramble-reveal` → efecto de decodificación de texto

### Botones
- `.btn` → botón base con animación de fill
- `.btn--ritual` → variante con acento rojo
- `.btn--solid` → variante sólida

### Layout
- `.container` → contenedor centrado (max 1200px)
- `.section` → sección con padding estándar
- `.section__number` → numeración de sección en rojo ritual
- `.grid--2/3/4` → grids responsivos

---

## Notas de desarrollo

- El formulario de contacto es **estático** pero estructurado para conectarse a un backend.
  Los `name` de cada campo siguen convenciones REST-friendly para integración futura.
- El cursor personalizado se desactiva automáticamente en dispositivos táctiles.
- Todas las animaciones respetan `prefers-reduced-motion`.
- Las imágenes en `assets/img/` son placeholders — reemplazar con fotografías reales en HQ.