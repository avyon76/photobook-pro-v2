# Changelog

## v0003 — Tools (Mockup/Preflight) + i18n · 2025-09-05T13:55:08Z
- Přidány **/pbp/tools**: Mockup Studio (canvas export PNG) a Preflight (DPI/bleed/safe).
- Jednoduchá **i18n** pro Tools a Admin (CS/EN).
- Aktualizován `pbp/version.json`.
- Přidány **release notes** (docs/releases) a tento **CHANGELOG.md**.

## v0002 — Local Admin + Bridge shell
- `/pbp/admin.html` – lokální konfigurace Bridge (Base URL, API Key, test `/ping`).
- `/pbp/index.html` – interní portál nástrojů.
- `pbp/version.json` → v0002.

## v0001 — Initial Lovable 1:1 Clone
- 1:1 přenos UI/UX + assets z Lovable.
- `/_redirects`, `/_headers`, `pbp/health.txt`, `pbp/version.json`.


## v0004 — Products Probe + SKU mapping · 2025-09-05T13:59:51Z
- `/pbp/tools/products/` s načítáním přes Bridge, exporty CSV/JSON.
- Lokální mapování interních SKU (import/export JSON).
- `pbp/version.json` → v0004.


## v0005 — Orders Probe + Pricing Test + Telemetry · 2025-09-05T14:06:37Z
- `/pbp/tools/orders/` (read-only) + export CSV/JSON.
- `/pbp/tools/pricing/` s DPH a presety.
- `/pbp/tools/telemetry.js` — lokální logování a přepínač ON/OFF.
