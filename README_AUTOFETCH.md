# v0006e — Auto-fetch vendor files (Cloudflare Pages build)

This patch adds a `build.sh` script. Set your Cloudflare Pages **Build command** to:
```
bash build.sh
```
Framework: **None** • Output dir: **/**

What it does:
- Creates `pbp/compat/vendor/`
- Downloads `browser.min.js` and `esbuild.wasm` (esbuild-wasm@0.19.12) from public mirrors (jsDelivr → unpkg → jspm)
- Leaves everything else unchanged

If you don't have the MIME rules yet, append `_headers.APPEND.txt` to your `_headers` file.
