# Portfolio — Fernando Díaz

Portfolio personal estático (HTML + CSS + un poco de JS vanilla), bilingüe ES/EN.

## Estructura

- `index.html` — contenido (en español por defecto).
- `css/styles.css` — estilos.
- `js/main.js` — toggle de idioma (traducciones en inglés), menú mobile y animaciones de entrada.
- `assets/` — favicon y CV en PDF.

## Ver localmente

```bash
python3 -m http.server 8000
```

Abrir http://localhost:8000.

## Editar contenido

- Textos traducibles llevan `data-i18n="clave"`; el español se edita en `index.html` y el inglés en el objeto `en` de `js/main.js`.
- Los proyectos en `#projects` son placeholders (`<!-- TODO: reemplazar -->`).

## Publicar en GitHub Pages

Settings → Pages → Deploy from a branch → `main` / root.
