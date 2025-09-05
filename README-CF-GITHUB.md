# Photobook Forge Studio — v0001

Tento balíček je **1:1 statický klon** z tvého Lovable exportu, upravený pro nasazení přes **GitHub → Cloudflare Pages** (subdoména `studio.cupoftea.cz`).

## Co je uvnitř
- `index.html` + původní assets z Lovable (zachováno 1:1).
- `_redirects` → SPA fallback na `/index.html` (bez 404 při refreshi deep‑linků).
- `_headers` → základní **security** a **cache** hlavičky.
- `pbp/version.json` → verze a timestamp buildu.
- `pbp/health.txt` → jednoduchý health‑check.

## Nasazení — GitHub → Cloudflare Pages
1. Vytvoř nové repo na GitHubu (např. `photobook-forge-studio`).
2. Nahraj obsah tohoto ZIPu **do rootu** repa (soubor `index.html` je v kořeni).
3. V **Cloudflare Pages** → **Create a project** → **Connect to Git** → vyber repo.
4. Build Settings:
   - Framework preset: **None**
   - Build command: _(prázdné)_
   - Output directory: **/** nebo **.**
5. Po deployi otestuj preview URL (např. `https://<project>.pages.dev`).

### Custom domain
- V Pages → **Custom domains** → přidej `studio.cupoftea.cz`.
- DNS CNAME se nastaví automaticky; počkej na zelený stav.
- Ověř: `https://studio.cupoftea.cz` + `https://studio.cupoftea.cz/pbp/health.txt` (má vrátit `OK v0001`).

## Poznámky
- Ve zdrojích byly přepsány případné **absolutní odkazy** na Lovable preview domény na **relativní** tak, aby vše fungovalo pod jakoukoli URL.
- UI/UX, rozložení, obrázky a texty zůstávají **beze změny**.
- Pokud budeš chtít později přidat **Admin panel** a napojení na WP Bridge (REST), navážeme ve **v0002**.

---
Vytvořeno: 2025-09-05T13:41:29Z


---
## Tools v0003
- `/pbp/tools/` – index nástrojů
- `/pbp/tools/mockup/` – Mockup Studio (beta)
- `/pbp/tools/preflight/` – Preflight (beta)


---
## Tools v0004
- `/pbp/tools/products/` – Products Probe (Bridge), export CSV/JSON, lokální mapování SKU


---
## Tools v0005
- `/pbp/tools/orders/` – Orders Probe (Bridge, read-only)
- `/pbp/tools/pricing/` – Pricing kalkulátor (lokální)
- `/pbp/tools/telemetry.js` – lokální telemetrie s ON/OFF přepínačem
