
// PBP TSX Loader — v0006h (fetch→module-blob or eval; ESM & UMD tolerant)
(async function () {
  try {
    const entry = "/src/main.tsx";
    const resp = await fetch(entry, { cache: "no-store" });
    if (!resp.ok) return; // No TSX → static site

    async function fetchText(url) {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status + " for " + url);
      const ct = r.headers.get("content-type") || "";
      const t = await r.text();
      return { text: t, ct };
    }

    function looksLikeHTML(s) {
      const head = s.slice(0, 128).trimStart().toLowerCase();
      return head.startsWith("<!doctype") || head.startsWith("<html");
    }
    function looksLikeESM(s) {
      // Heuristic: "export " or "import.meta" or top-level "import" token
      return /\bexport\s|import\.meta|\bimport\s*\(/.test(s) || /\bimport\s+[\w*\s{},]+from\b/.test(s);
    }

    async function loadEsbuildFlexible() {
      const candidates = [
        "/pbp/compat/vendor/browser.min.js",
        "/pbp/compat/vendor/browser.js",
        "/pbp/compat/vendor/lib/browser.min.js",
        "/pbp/compat/vendor/esm/browser.min.js"
      ];
      let lastErr = null;
      for (const u of candidates) {
        try {
          const { text, ct } = await fetchText(u);
          // Skip HTML (SPA fallback)
          if (looksLikeHTML(text)) { console.warn("[PBP] vendor looks like HTML:", u, ct); continue; }

          // Try as ESM via module-blob import (ignores server MIME)
          try {
            if (looksLikeESM(text)) {
              const url = URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
              const m = await import(url);
              URL.revokeObjectURL(url);
              const api = (m && (m.default?.initialize ? m.default : (m.initialize ? m : null))) || window.esbuild;
              if (api && api.initialize) { window.esbuild = api; return u + " (module-blob)"; }
            }
          } catch (e) {
            lastErr = e;
            console.warn("[PBP] module-blob import failed for", u, e);
          }

          // Try as classic script: eval into global scope
          try {
            const fn = new Function("window", text + "\n;return window.esbuild;");
            const api = fn(window);
            if (api && api.initialize) { window.esbuild = api; return u + " (eval)"; }
          } catch (e) {
            lastErr = e;
            console.warn("[PBP] classic eval failed for", u, e);
          }
        } catch (e) {
          lastErr = e;
          console.warn("[PBP] vendor fetch failed for", u, e);
        }
      }
      throw lastErr || new Error("esbuild vendor JS not found/valid");
    }

    const source = await loadEsbuildFlexible();

    // Initialize WASM (self-host). esbuild will fetch it; MIME usually application/wasm (we set via _headers).
    await window.esbuild.initialize({ wasmURL: "/pbp/compat/vendor/esbuild.wasm" });

    // Minimal HTTP fetch plugin (supports bare imports via esm.sh)
    const fetchPlugin = {
      name: "fetch-plugin",
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (/^https?:\/\//.test(args.path)) return { path: args.path, namespace: "http-url" };
          if (args.path.startsWith("/") || args.path.startsWith("./") || args.path.startsWith("../")) {
            const url = new URL(args.path, location.origin + (args.path.startsWith("/") ? "" : location.pathname)).toString();
            return { path: url, namespace: "http-url" };
          }
          return { path: "https://esm.sh/" + args.path, namespace: "http-url" };
        });
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
          const r = await fetch(args.path, { cache: "no-store" });
          if (!r.ok) throw new Error("Fetch failed: " + args.path + " " + r.status);
          const t = await r.text();
          const ext = args.path.split("?")[0].split("#")[0].split(".").pop().toLowerCase();
          let loader = "js";
          if (ext === "tsx") loader = "tsx"; else if (ext === "ts") loader = "ts"; else if (ext === "jsx") loader = "jsx";
          else if (ext === "css") loader = "css"; else if (["png","jpg","jpeg","gif","webp","svg"].includes(ext)) loader = "dataurl";
          return { contents: t, loader };
        });
      }
    };

    const result = await window.esbuild.build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: "esm",
      define: { "process.env.NODE_ENV": "\"production\"" },
      plugins: [fetchPlugin],
      loader: {
        ".tsx":"tsx", ".ts":"ts", ".jsx":"jsx", ".css":"css",
        ".png":"dataurl", ".jpg":"dataurl", ".jpeg":"dataurl", ".gif":"dataurl", ".webp":"dataurl", ".svg":"dataurl"
      }
    });

    const js = result.outputFiles[0].text;
    const blob = new Blob([js], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    await import(url);
    URL.revokeObjectURL(url);
    console.info("[PBP] TSX boot OK — esbuild:", source);
  } catch (e) {
    console.error("[PBP] TSX boot failed (v0006h)", e);
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>Check vendor files and redirects/headers. See console for details.";
    document.body.appendChild(el);
  }
})();