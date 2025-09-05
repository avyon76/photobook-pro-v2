
// PBP TSX Loader — v0006j
// Fix: modules from esm.sh sometimes contain JSX in .js/.mjs files.
// We treat .js & .mjs as JSX and enable jsx: 'automatic' with react.
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
      const url = URL.createObjectURL(new Blob([vendText], { type: "text/javascript" }));
      const m = await import(url); URL.revokeObjectURL(url);
      api = (m && (m.default?.initialize ? m.default : (m.initialize ? m : null))) || self.esbuild;
    } catch {}
    if (!api) {
      try { api = new Function("window", vendText + "\n;return window.esbuild;")(self); } catch {}
    }
    if (!api || !api.initialize) throw new Error("esbuild API not found after import/eval");
    self.esbuild = api;

    // --- init wasm ---
    await self.esbuild.initialize({ wasmURL });

    // --- tiny HTTP plugin (with per-file loader) ---
    const fetchPlugin = {
      name: "fetch-plugin",
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (/^https?:\/\//.test(args.path)) return { path: args.path, namespace: "http-url" };
          if (args.path.startsWith("/") || args.path.startsWith("./") || args.path.startsWith("../")) {
            const url = new URL(args.path, location.origin + (args.path.startsWith("/") ? "" : location.pathname)).toString();
            return { path: url, namespace: "http-url" };
          }
          // bare import => esm.sh
          return { path: "https://esm.sh/" + args.path, namespace: "http-url" };
        });
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
          const r = await fetch(args.path, { cache: "no-store" });
          if (!r.ok) throw new Error("Fetch failed: " + args.path + " " + r.status);
          const t = await r.text();
          const cleanPath = args.path.split("?")[0].split("#")[0];
          const ext = (cleanPath.match(/\.([a-z0-9]+)$/i) || [,""])[1].toLowerCase();
          let loader = "js";
          if (ext === "tsx") loader = "tsx";
          else if (ext === "ts") loader = "ts";
          else if (ext === "jsx") loader = "jsx";
          else if (ext === "mjs" || ext === "js") loader = "jsx"; // <-- key change
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
    console.info("[PBP] TSX boot OK (v0006j)");
  } catch (e) {
    console.error("[PBP] TSX boot failed (v0006j)", e);
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>See console for errors (v0006j).";
    document.body.appendChild(el);
  }
})();