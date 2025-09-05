#!/usr/bin/env bash
set -euo pipefail

echo "[build] Preparing vendor dir..."
mkdir -p pbp/compat/vendor

fetch() {
  url="$1"
  out="$2"
  echo "[build] Downloading $url -> $out"
  curl -fsSL "$url" -o "$out"
}

# Try multiple mirrors for each file
if ! fetch "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/browser.min.js" "pbp/compat/vendor/browser.min.js"; then
  if ! fetch "https://unpkg.com/esbuild-wasm@0.19.12/browser.min.js" "pbp/compat/vendor/browser.min.js"; then
    fetch "https://ga.jspm.io/npm:esbuild-wasm@0.19.12/browser.min.js" "pbp/compat/vendor/browser.min.js"
  fi
fi

if ! fetch "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/esbuild.wasm" "pbp/compat/vendor/esbuild.wasm"; then
  if ! fetch "https://unpkg.com/esbuild-wasm@0.19.12/esbuild.wasm" "pbp/compat/vendor/esbuild.wasm"; then
    fetch "https://ga.jspm.io/npm:esbuild-wasm@0.19.12/esbuild.wasm" "pbp/compat/vendor/esbuild.wasm"
  fi
fi

echo "[build] Done. Files:"
ls -lh pbp/compat/vendor
