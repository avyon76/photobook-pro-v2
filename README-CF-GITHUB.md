# Photobook Forge Studio — v0006

Tento balíček je statický **1:1 klon** Lovable exportu s doplňky pro Cloudflare Pages + **TSX bootloaderem**.
- `_redirects` (SPA fallback), `_headers` (security/cache)
- `/pbp/health.txt`, `/pbp/version.json` → v0006
- `/pbp/` (Admin + Tools)
- **/pbp/compat/tsx-loader.js** — umí spustit `/src/main.tsx` bez build pipeline (řeší MIME problém).

## Nasazení (GitHub → Cloudflare Pages)
- Framework: **None**, Build command: _(prázdné)_, Output: `/`
- Nnahraj **obsah ZIPu do kořene** repa (ne ZIP jako soubor).
- Ověř: `/pbp/health.txt`, `/pbp/version.json`, `/pbp/`

Pozn.: Pro produkční rychlost doporučujeme později přejít na klasický build (npm build → `dist/`). TSX bootloader slouží ke kompatibilnímu běhu bez build serveru.
