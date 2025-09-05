/**
 * PBP TSX Loader — v0006c (self-host)
 * - No external CDNs. Loads esbuild from same-origin:
 *     /pbp/compat/vendor/browser.min.js
 *     /pbp/compat/vendor/esbuild.wasm
 * - Make sure both files exist in your repo.
 */
(async function(){
  try{
    const entry = "/src/main.tsx";
    const resp = await fetch(entry, { cache: "no-store" });
    if(!resp.ok){ return; } // no TSX → nothing to do (static build probably)

    // 1) Load local esbuild browser
    await new Promise((resolve, reject)=>{
      const s = document.createElement("script");
      s.src = "/pbp/compat/vendor/browser.min.js";
      s.async = true;
      s.crossOrigin = "anonymous";
      s.onload = resolve;
      s.onerror = ()=>reject(new Error("Failed to load /pbp/compat/vendor/browser.min.js"));
      document.head.appendChild(s);
    });
    if(!window.esbuild){ throw new Error("esbuild global missing"); }

    // 2) Init with local WASM
    await window.esbuild.initialize({ wasmURL: "/pbp/compat/vendor/esbuild.wasm" });

    // 3) Minimal fetch plugin resolving /src/... and bare imports via esm.sh (can be toggled to local later)
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
        ".tsx":"tsx",".ts":"ts",".jsx":"jsx",".css":"css",
        ".png":"dataurl",".jpg":"dataurl",".jpeg":"dataurl",".gif":"dataurl",".webp":"dataurl",".svg":"dataurl"
      }
    });
    const js = result.outputFiles[0].text;
    const blob = new Blob([js], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    await import(url);
    URL.revokeObjectURL(url);
    console.info("[PBP] TSX boot OK (self-host)");
  }catch(e){
    console.error("[PBP] TSX boot failed (self-host)", e);
    // visible hint for operators
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>Check that <code>/pbp/compat/vendor/browser.min.js</code> and <code>/pbp/compat/vendor/esbuild.wasm</code> are present and served with correct MIME types.";
    document.body.appendChild(el);
  }
})();