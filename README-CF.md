# Photobook Studio — Lovable 1:1 (Cloudflare Pages ready)

## Jak to nasadit jen přes web (bez terminálu)

1) Na GitHubu vytvoř prázdné repo (např. `photobook-studio`).
2) Rozbal tento ZIP a přes **Add file → Upload files** nahraj OBSAH složky do repa.
   - Nahoře musí být `package.json`, `index.html`, složka `src/`, `_redirects`, `_headers`…
3) Cloudflare Pages → **Create project → Connect to Git → vyber repo**.
   - Build command: **npm install && npm run build**
   - Build output directory: **dist**
   - (volitelné) Environment: **NODE_VERSION = 20**

> Je to SPA, proto je v kořeni `_redirects` s pravidlem `/* /index.html 200`.
