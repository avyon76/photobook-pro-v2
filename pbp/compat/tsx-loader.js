(async function(){
  try{
    const entry = "/src/main.tsx";
    const resp = await fetch(entry, { cache: "no-store" });
    if(!resp.ok) return; // No TSX source, nothing to do

    // Multiple CDNs fallback (some proxies/filters rewrite Content-Type on unpkg → blocked by nosniff)
    const CDN_LIST = [
      { js: "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/browser.min.js",
        wasm: "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.19.12/esbuild.wasm" },
      { js: "https://unpkg.com/esbuild-wasm@0.19.12/browser.min.js",
        wasm: "https://unpkg.com/esbuild-wasm@0.19.12/esbuild.wasm" },
      { js: "https://ga.jspm.io/npm:esbuild-wasm@0.19.12/browser.min.js",
        wasm: "https://ga.jspm.io/npm:esbuild-wasm@0.19.12/esbuild.wasm" }
    ];

    async function loadEsbuildFrom(cdn){
      await new Promise((resolve, reject)=>{
        const s = document.createElement("script");
        s.src = cdn.js; s.async = true; s.crossOrigin = "anonymous";
        s.onload = resolve; s.onerror = ()=>reject(new Error("script load failed: "+cdn.js));
        document.head.appendChild(s);
      });
      if(!window.esbuild) throw new Error("esbuild global not present from "+cdn.js);
      await window.esbuild.initialize({ wasmURL: cdn.wasm });
      return true;
    }

    let ok = false, lastErr = null;
    for(const cdn of CDN_LIST){
      try{ await loadEsbuildFrom(cdn); ok = true; break; }catch(e){ lastErr = e; console.warn("[PBP] esbuild load fail:", e); }
    }
    if(!ok){ console.error("[PBP] TSX boot failed: all CDNs blocked/failed", lastErr); return; }

    const fetchPlugin = {
      name: "fetch-plugin",
      setup(build){
        build.onResolve({ filter: /.*/ }, args=>{
          if(/^https?:\/\//.test(args.path)) return { path: args.path, namespace: "http-url" };
          if(args.path.startsWith("/") || args.path.startsWith("./") || args.path.startsWith("../")){
            const url = new URL(args.path, location.origin + (args.path.startsWith("/") ? "" : location.pathname)).toString();
            return { path: url, namespace: "http-url" };
          }
          // bare import → esm.sh
          return { path: "https://esm.sh/" + args.path, namespace: "http-url" };
        });
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args)=>{
          const r = await fetch(args.path, { cache: "no-store" });
          if(!r.ok) throw new Error("Fetch failed: "+args.path+" "+r.status);
          const t = await r.text();
          const ext = args.path.split("?")[0].split("#")[0].split(".").pop().toLowerCase();
          let loader = "js";
          if(ext==="tsx") loader="tsx"; else if(ext==="ts") loader="ts"; else if(ext==="jsx") loader="jsx";
          else if(ext==="css") loader="css"; else if(["png","jpg","jpeg","gif","webp","svg"].includes(ext)) loader="dataurl";
          return { contents: t, loader };
        });
      }
    };

    const result = await window.esbuild.build({
      define: {"process.env.NODE_ENV":"\"production\""},
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: "esm",
      plugins: [fetchPlugin],
      loader: { ".tsx":"tsx", ".ts":"ts", ".jsx":"jsx", ".css":"css", ".png":"dataurl", ".jpg":"dataurl", ".jpeg":"dataurl", ".gif":"dataurl", ".webp":"dataurl", ".svg":"dataurl" }
    });
    const js = result.outputFiles[0].text;
    const blob = new Blob([js], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    await import(url);
    URL.revokeObjectURL(url);
    console.info("[PBP] TSX boot OK");
  }catch(e){
    console.error("[PBP] TSX boot failed", e);
  }
})();