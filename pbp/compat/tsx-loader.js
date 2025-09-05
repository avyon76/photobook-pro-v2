
// PBP TSX Loader — v0006o
// Combines both strategies:
// 1) If importer is from esm.sh and the import path is absolute ("/…"), keep it on esm.sh.
// 2) Force-route known esm.sh absolute patterns (/v###/, /dev/, /react@…, /react-dom@…) to esm.sh.
// 3) Local files only under /src or /pbp or with a real extension; all else -> esm.sh.
// 4) Treat .js/.mjs as JSX.
(async function(){
  try {
    const entry = "/src/main.tsx";
    const vendorJS = "/pbp/compat/vendor/browser.min.js";
    const wasmURL  = "/pbp/compat/vendor/esbuild.wasm";

    // Load vendor (ESM via blob import -> fallback eval)
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
    if (!api) { try { api = new Function("window", vendText + "\n;return window.esbuild;")(self); } catch {} }
    if (!api || !api.initialize) throw new Error("esbuild API not found after import/eval");
    self.esbuild = api;
    await self.esbuild.initialize({ wasmURL });

    const isLocalAsset = (p) => {
      if (p.startsWith("/src/") || p.startsWith("/pbp/")) return true;
      const clean = p.split("?")[0].split("#")[0];
      return /\.[a-z0-9]+$/i.test(clean);
    };
    const isEsm = (s) => /^https?:\/\/esm\.sh\//i.test(s || "");
    const toEsm = (p) => "https://esm.sh/" + p.replace(/^\/+/, "");

    const fetchPlugin = {
      name: "fetch-plugin",
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          const p = args.path;
          const importer = args.importer || "";
          if (/^https?:\/\//i.test(p)) return { path: p, namespace: "http-url" };

          if (p.startsWith("/")) {
            // If the importer itself came from esm.sh, keep absolute paths on esm.sh (covers /scheduleChunk..., etc.).
            if (isEsm(importer)) {
              return { path: "https://esm.sh" + p, namespace: "http-url" };
            }
            // Force-route known esm.sh path styles.
            if (/^\/(v\d+|dev)\//i.test(p) || /^\/react(?:-dom)?@/i.test(p)) {
              return { path: toEsm(p), namespace: "http-url" };
            }
            // Local file?
            if (isLocalAsset(p)) {
              return { path: new URL(p, location.origin).toString(), namespace: "http-url" };
            }
            // Otherwise -> esm.sh
            return { path: toEsm(p), namespace: "http-url" };
          }

          if (p.startsWith("./") || p.startsWith("../")) {
            return { path: new URL(p, location.origin + location.pathname).toString(), namespace: "http-url" };
          }

          // bare specifier -> esm.sh
          return { path: toEsm(p), namespace: "http-url" };
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
          else if (ext === "mjs" || ext === "js") loader = "jsx";
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
      platform: "browser",
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
    console.info("[PBP] TSX boot OK (v0006o)");
  } catch (e) {
    console.error("[PBP] TSX boot failed (v0006o)", e);
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>See console for errors (v0006o).";
    document.body.appendChild(el);
  }
})();