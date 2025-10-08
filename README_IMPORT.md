# Photobook Pro – v1.4b bundle

This bundle contains:
- 19 new CZ product pages in `content/products/`
- `config/configurators/small-format.json`
- `src/lib/pricing/index.ts` (CSV loader + CZK formatting)
- `src/data/products.v1_4b.ts` (22 cards with CTA mapping, server-side price enrichment)
- `.github/workflows/pr-bundle-check.yml`
- `scripts/validate-configurators.mjs`
- `tests/products.spec.ts` (smoke)

## How to import (non-coder friendly)

1. Create branch **feat/repro-products-v1_4b** from `main`.
2. In GitHub UI, go to `content/products/` → **Upload files** → select all 19 `.md` files from this bundle.
3. Upload the remaining files to their paths (you can drag entire folders in GitHub now).
4. Commit directly to the branch with message:

```
feat(products): 19 new product pages (copy v1.4) + pricing util + small-format configurator
```

5. Open PR: base `main` ← compare `feat/repro-products-v1_4b` with title:

```
feat/products-v1_4
```

6. Cloudflare Pages will create a **preview URL** for the PR. Check `/products` – all 22 cards should show, each with **„od X Kč“** (never „Na dotaz“).

## How to wire product grid
If your grid reads from `src/data/products.ts`, import/merge `getProductCards()` from `src/data/products.v1_4b.ts` or replace the dataset with it.

## Notes
- `getPriceFromCZK(slug)` reads `content/pricing/pricing.cz.csv`. Make sure your CSV has a `slug` (or `product/name/group`) and a price column like `priceCZK`.- Formatted CZK uses a non‑breaking space (` `) before „Kč“.
- Playwright smoke is optional in CI (won’t fail a PR if it cannot run).

