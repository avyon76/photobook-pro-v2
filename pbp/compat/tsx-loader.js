// PBP TSX Loader — v0006g (MIME-agnostic self-host; fetch+eval)
(async function(){
  try {
    const entry = "/src/main.tsx";
    const resp = await fetch(entry, { cache: "no-store" });
    if (!resp.ok) return; // no TSX → skip

    async function fetchText(url){
      const r = await fetch(url, { cache: "no-store" });
      if(!r.ok) throw new Error("HTTP "+r.status+" for "+url);
      return await r.text();
    }

    async function loadEsbuildViaFetchEval(){
      const candidates = [
        "/pbp/compat/vendor/browser.min.js",
        "/pbp/compat/vendor/browser.js",
        "/pbp/compat/vendor/lib/browser.min.js",
        "/pbp/compat/vendor/esm/browser.min.js"
      ];
      let lastErr = null;
      for(const u of candidates){
        try{
          const code = await fetchText(u);
          // quick guard: if looks like HTML (SPA fallback), try next
          const head = code.slice(0, 32).toLowerCase();
          if (head.includes("<!doctype") || head.startsWith("<html")) continue;

          // Evaluate as classic script to populate window.esbuild (UMD build)
          const fn = new Function("window", code + "\n;return window.esbuild;");
          const api = fn(window);
          if (api && api.initialize) {
            window.esbuild = api;
            return u + " (eval)";
          }
        }catch(e){ lastErr = e; }
      }
      throw lastErr || new Error("esbuild vendor JS not found/valid");
    }

    const source = await loadEsbuildViaFetchEval();

    // Build WASM URL (self-hosted). Even if MIME isn't application/wasm, fetch inside esbuild will still load it.
    await window.esbuild.initialize({ wasmURL: "/pbp/compat/vendor/esbuild.wasm" });

    const fetchPlugin = {
      name: "fetch-plugin",
      setup(build){
        build.onResolve({ filter: /.*/ }, args=>{
          if(/^https?:\/\//.test(args.path)) return { path: args.path, namespace: "http-url" };
          if(args.path.startsWith("/") || args.path.startsWith("./") || args.path.startsWith("../")){
            const url = new URL(args.path, location.origin + (args.path.startsWith("/") ? "" : location.pathname)).toString();
            return { path: url, namespace: "http-url" };
          }
          return { path: "https://esm.sh/" + args.path, namespace: "http-url" };
        });
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args)=>{
          const r = await fetch(args.path, { cache: "no-store" });
          if(!r.ok) throw new Error("Fetch failed: "+args.path+" "+r.status);
          const t = await r.text();
          const ext = args.path.split("?")[0].split("#")[0].split(".").pop().toLowerCase();
          let loader = "js";
          if (ext==="tsx") loader="tsx"; else if (ext==="ts") loader="ts"; else if (ext==="jsx") loader="jsx";
          else if (ext==="css") loader="css"; else if (["png","jpg","jpeg","gif","webp","svg"].includes(ext)) loader="dataurl";
          return { contents: t, loader };
        });
      }
    };

    const result = await window.esbuild.build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: "esm",
      define: {"process.env.NODE_ENV":"\"production\""},
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
  } catch(e){
    console.error("[PBP] TSX boot failed (v0006g)", e);
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>Check vendor files and redirects/headers. See console for details.";
    document.body.appendChild(el);
  }
})();