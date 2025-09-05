
// PBP TSX Loader — v0006k
// Fix: imports like "/react@18", "/react-dom@18", etc. were treated as local paths.
// Now we redirect ANY leading-slash bare specifier (that isn't a local file) to esm.sh.
// Also keep JSX handling for .js/.mjs.
(async function(){
  try {
    const entry = "/src/main.tsx";
    const vendorJS = "/pbp/compat/vendor/browser.min.js";
    const wasmURL  = "/pbp/compat/vendor/esbuild.wasm";

    // --- fetch vendor & load (ESM via blob import -> fallback eval) ---
    const vendResp = await fetch(vendorJS, { cache: "no-store" });
    const vendText = await vendResp.text();
    if (!vendResp.ok) throw new Error("vendor HTTP " + vendResp.status);
    const head = vendText.slice(0, 40).trimStart().toLowerCase();
    if (head.startsWith("<!doctype") || head.startsWith("<html")) throw new Error("vendor returned HTML");
    let api = null;
    try {
      const u = URL.createObjectURL(new Blob([vendText], { type: "text/javascript" }));
      const m = await import(u); URL.revokeObjectURL(u);
      api = (m && (m.default?.initialize ? m.default : (m.initialize ? m : null))) || self.esbuild;
    } catch {}
    if (!api) {
      try { api = new Function("window", vendText + "\n;return window.esbuild;")(self); } catch {}
    }
    if (!api || !api.initialize) throw new Error("esbuild API not found after import/eval");
    self.esbuild = api;

    await self.esbuild.initialize({ wasmURL });

    const isLocalAsset = (p) => {
      // treat anything under /src or /pbp as local
      if (p.startsWith("/src/") || p.startsWith("/pbp/")) return true;
      // if it has a file extension, consider it a real file path
      const clean = p.split("?")[0].split("#")[0];
      return /\.[a-z0-9]+$/i.test(clean);
    };

    const fetchPlugin = {
      name: "fetch-plugin",
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          const p = args.path;
          if (/^https?:\/\//i.test(p)) return { path: p, namespace: "http-url" };

          if (p.startsWith("/")) {
            // Absolute path on same origin. If it doesn't look like a local file, treat as bare to esm.sh
            if (!isLocalAsset(p)) {
              const spec = p.replace(/^\/+/, ""); // strip leading slashes
              return { path: "https://esm.sh/" + spec, namespace: "http-url" };
            }
            // real local file
            return { path: new URL(p, location.origin).toString(), namespace: "http-url" };
          }

          if (p.startsWith("./") || p.startsWith("../")) {
            return { path: new URL(p, location.origin + location.pathname).toString(), namespace: "http-url" };
          }

          // bare specifier -> esm.sh
          return { path: "https://esm.sh/" + p, namespace: "http-url" };
        });

        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
          const r = await fetch(args.path, { cache: "no-store" });
          if (!r.ok) throw new Error("Fetch failed: " + args.path + " " + r.status);
          const t = await r.text();
          const cleanPath = args.path.split("?")[0].split("#")[0];
          const m = cleanPath.match(/\.([a-z0-9]+)$/i);
          const ext = (m ? m[1] : "").toLowerCase();
          let loader = "js";
          if (ext === "tsx") loader = "tsx";
          else if (ext === "ts") loader = "ts";
          else if (ext === "jsx") loader = "jsx";
          else if (ext === "mjs" || ext === "js") loader = "jsx"; // handle JSX-in-JS/MJS
          else if (ext === "css") loader = "css";
          else if (["png","jpg","jpeg","gif","webp","svg"].includes(ext)) loader = "dataurl";
          return { contents: t, loader };
        });
      }
    };

    const result = await self.esbuild.build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: "esm",
      jsx: "automatic",
      jsxImportSource: "react",
      define: { "process.env.NODE_ENV": "\"production\"" },
      plugins: [fetchPlugin],
      loader: {
        ".tsx":"tsx",".ts":"ts",".jsx":"jsx",".mjs":"jsx",".js":"jsx",".css":"css",
        ".png":"dataurl",".jpg":"dataurl",".jpeg":"dataurl",".gif":"dataurl",".webp":"dataurl",".svg":"dataurl"
      }
    });

    const js = result.outputFiles[0].text;
    const blob = new Blob([js], { type: "text/javascript" });
    const url  = URL.createObjectURL(blob);
    await import(url);
    URL.revokeObjectURL(url);
    console.info("[PBP] TSX boot OK (v0006k)");
  } catch (e) {
    console.error("[PBP] TSX boot failed (v0006k)", e);
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>See console for errors (v0006k).";
    document.body.appendChild(el);
  }
})();