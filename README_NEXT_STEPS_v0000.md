# README_NEXT_STEPS_v0000.md

Tento soubor je „startovní kartička“, aby GPT navázal v novém chatu přesně tam, kde jsme skončili.  
Projekt běží na Cloudflare Pages, Vite + React + TS, režim SPA.

---

## 1) Co mi zítra nahraješ
- ZIP **aktuálního repa** (OBSAH složky): `package.json`, `vite.config.ts`, `index.html`, složka `src/`, `public/`, soubory `_redirects`, `_headers`, případně `README-CF.md`.
- Přilož prosím do zprávy:
  - **URL GitHub repa**
  - **URL posledního Pages náhledu** (a produkční domény, pokud je)
  - **Tag/jméno verze**: _v0000_ (zítra posuneme na _v0001_)

> Nechci žádné locky mimo npm: pokud se v repu objeví `bun.lockb`, `yarn.lock` nebo `pnpm-lock.yaml`, smažeme je.

---

## 2) Ověřené nastavení (jen zkontrolovat)
- Cloudflare Pages → **Build command:** `npm install && npm run build`
- **Build output directory:** `dist`
- **Environment:** `NODE_VERSION = 20`
- V kořeni je `_redirects` s řádkem: `/*  /index.html  200` (SPA redirect).

---

## 3) Co udělám já jako první
1. **Kontrola struktury** repa a `package.json` (scripts/deps).
2. **Potvrzení SPA režimu**: `_redirects` + doplnění `path="*"` (404) v routeru.
3. **Mapování tras**: `/`, `/products`, `/configurator/:productType?`, `/faq`, `/blog`, `/about`, `/contact`, `/studio`, …
4. **Meta/SEO**: `<title>`, `description`, favicon + OG image do `public/`.
5. **Vizuální 1:1**: doladím cesty k assetům a styly.
6. **QA**: klikání bez reloadu, refresh deep linku funguje, hezká 404.
7. **Release**: vytvořím `v0001` + krátký changelog.

---

## 4) Podklady (volitelné, ale super)
- Prioritní seznam „co je 1:1 na pixel“.
- Logo, favicon, OG (1200×630) → do `public/`.
- Externí fonty/ikony – soubory nebo odkazy.

---

## 5) Rychlé řešení známých problémů
- **Build spadne na `bun install --frozen-lockfile`:** byl `bun.lockb` → smazat → Re-run deployment.
- **404 po refreshi:** chybí SPA redirect → `/* /index.html 200` v `_redirects`.
- **Bílá stránka po deploy:** mrknout do Console/Network; často špatná cesta k assetu → přesun do `public/` a používat `/soubor.ext`.

---

## 6) Verzování
- Každý balík změn → tag `v0001`, `v0002`, …
- Poznámky v `README-CF.md` nebo `CHANGELOG.md`.

---

## 7) Co mi pošleš v novém chatu
- ZIP s obsahem repa (_v0000_) + link na repo a Pages.
- Jednu větu: **„Cíl v0001 je …“** (např. SEO + favicon + 404).

