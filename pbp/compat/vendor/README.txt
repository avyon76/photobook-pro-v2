Place these two files here (exact names):
- browser.min.js   ← esbuild-wasm browser build
- esbuild.wasm     ← esbuild-wasm binary

Quick fetch (macOS/Linux):
  curl -L -o pbp/compat/vendor/browser.min.js https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/browser.min.js
  curl -L -o pbp/compat/vendor/esbuild.wasm     https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/esbuild.wasm

Windows (PowerShell):
  iwr https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/browser.min.js -OutFile pbp/compat/vendor/browser.min.js
  iwr https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/esbuild.wasm     -OutFile pbp/compat/vendor/esbuild.wasm

If your network blocks jsDelivr, use one of these mirrors and keep the same filenames:
  https://unpkg.com/esbuild-wasm@0.19.12/browser.min.js
  https://unpkg.com/esbuild-wasm@0.19.12/esbuild.wasm
  https://ga.jspm.io/npm:esbuild-wasm@0.19.12/browser.min.js
  https://ga.jspm.io/npm:esbuild-wasm@0.19.12/esbuild.wasm
