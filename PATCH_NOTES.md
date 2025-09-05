# v0006c — Self-host esbuild (patch)
**What to do**
1) Copy the *contents* of this patch into your repo root (merge folders).
2) Download two vendor files into `pbp/compat/vendor/`:
   - `browser.min.js`
   - `esbuild.wasm`
   See `pbp/compat/vendor/README.txt` for one-liners.
3) Open your existing `_headers` and **append** the rules from `_headers.APPEND.txt` (MIME fixes).
4) Commit & deploy. Then verify:
   - `/pbp/version.json` still accessible
   - Home page renders and console shows `[PBP] TSX boot OK (self-host)`

**Why**
Your network/CDN blocked third-party `esbuild-wasm` with wrong MIME or CORS. This patch serves the files
from your own origin with explicit Content-Type headers, so the browser won't reject them with `nosniff`.
