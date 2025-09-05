# Studio Admin (v0002)

Tento panel je **lokální** (konfigurace se ukládá do localStorage v prohlížeči). Nemění veřejné UI a nevyžaduje backend na straně Studia.

## Co umí
- Nastavit **WP Bridge Base URL** (např. `https://www.cupoftea.cz/wp-json/pbp/v1`).
- Uložit **API Key** (odesílá se jako `X-PBP-API-Key` header).
- Otestovat konektivitu (`GET /ping`).

## Jak přistoupit
Otevři: `/pbp/admin.html` (např. `https://studio.cupoftea.cz/pbp/admin.html`).

## CORS
Na WordPressu povol **CORS** pro `https://studio.cupoftea.cz` (Access-Control-Allow-Origin). Bridge plugin obvykle zahrne vlastní CORS, případně doplň do `.htaccess` nebo přes plugin.

## Bezpečnost
Klíč se ukládá do **localStorage** – používej pouze na vlastních zařízeních. Pokud potřebuješ rotovat klíče, proveď to ve WP a tady klikni **Reset**.
