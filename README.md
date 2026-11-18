# Portfolio — Fernando Díaz

Portfolio personal con estilo de editor de código, hecho con [Astro](https://astro.build). Bilingüe ES/EN, con tema claro/oscuro y una página por sección.

## Estructura

- `src/layouts/IdeLayout.astro` — el "editor": barra de título, explorador, pestañas, números de línea, barra de estado y navegación mobile.
- `src/pages/` — una página por sección (`index`, `about`, `work`, `skills`, `education`, `contact`), en español por defecto.
- `src/data/routes.ts` — lista de secciones (ruta, nombre de archivo, ícono, color).
- `src/scripts/main.js` — idioma (traducciones en inglés), tema, números de línea, efecto de tipeo y partículas.
- `src/styles/global.css` — estilos.
- `public/assets/` — favicon y CV en PDF.

## Desarrollo

Requiere Node 22.23.4 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:4321/portfolio/.

Para probar la versión final: `npm run build` y después `npm run preview`.

## Editar contenido

- Textos traducibles llevan `data-i18n="clave"`; el español se edita en `src/pages/` y el inglés en el objeto `en` de `src/scripts/main.js`.
- Para agregar una sección: crear la página en `src/pages/` y sumarla a `src/data/routes.ts`.

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica el sitio en cada push a `main`.
En GitHub: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
