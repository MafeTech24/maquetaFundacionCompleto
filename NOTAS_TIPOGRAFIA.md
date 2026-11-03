# Registro de Tipografía Anterior (Respaldo para Reversión)

Este documento registra la configuración tipográfica previa al cambio a *Plus Jakarta Sans* e *Inter*, detallando las fuentes, enlaces exactos de Google Fonts y los archivos donde estaban declaradas para poder revertir los cambios de forma rápida si se solicita.

---

## 1. Fuentes Anteriores

* **Títulos y Encabezados (Serif):** `Fraunces` (pesos 400, 700, 900, con estilos normal e italic, y eje óptico `9..144`). Fallback: `Georgia, serif`.
* **Cuerpo de Texto y UI (Sans-serif):** `Nunito Sans` (pesos 400, 500, 600, 700). Fallback: `sans-serif`.

---

## 2. Enlace de Google Fonts Anterior

En [`src/layouts/Layout.astro`](file:///d:/Documentos%20-%20copia/IA/vibecoding/fundacion2/src/layouts/Layout.astro):

```html
<!-- Google Fonts: Fraunces (serif titles) + Nunito Sans (body/UI) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Nunito+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Y en la etiqueta `<body>` de `src/layouts/Layout.astro`:
```html
<body class="font-nunito antialiased transition-colors duration-300" ...>
```

---

## 3. Configuración en `tailwind.config.mjs`

En [`tailwind.config.mjs`](file:///d:/Documentos%20-%20copia/IA/vibecoding/fundacion2/tailwind.config.mjs):

```javascript
fontFamily: {
  fraunces: ['Fraunces', 'Georgia', 'serif'],
  nunito:   ['Nunito Sans', 'sans-serif'],
  // Legado
  sora:     ['Fraunces', 'Georgia', 'serif'],
  inter:    ['Nunito Sans', 'sans-serif'],
}
```

---

## 4. Reglas CSS en `src/styles/global.css`

En [`src/styles/global.css`](file:///d:/Documentos%20-%20copia/IA/vibecoding/fundacion2/src/styles/global.css):

```css
@layer base {
  body {
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background);
    color: var(--foreground);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Fraunces', Georgia, serif;
    letter-spacing: -0.015em;
  }

  .prose h2 {
    font-family: 'Fraunces', Georgia, serif;
    letter-spacing: -0.015em;
  }
  .prose h3 {
    font-family: 'Fraunces', Georgia, serif;
    letter-spacing: -0.015em;
  }
}

@layer utilities {
  .font-fraunces {
    font-family: 'Fraunces', Georgia, serif;
    letter-spacing: -0.015em;
  }
  .font-nunito {
    font-family: 'Nunito Sans', sans-serif;
  }
  .font-sora {
    font-family: 'Fraunces', Georgia, serif;
    letter-spacing: -0.015em;
  }
  .font-inter {
    font-family: 'Nunito Sans', sans-serif;
  }
}
```
