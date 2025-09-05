
// PBP TSX Loader — v0006i (focused path + verbose diagnostics)
(async function(){
  try {
    const entry = "/src/main.tsx";
    const resp = await fetch(entry, { cache: "no-store" });
    if (!resp.ok) return; // static site

    const vendorJS = "/pbp/compat/vendor/browser.min.js";
    const wasmURL = "/pbp/compat/vendor/esbuild.wasm";

    // Fetch vendor JS (log status, content-type, first 120 chars)
    const r = await fetch(vendorJS, { cache: "no-store" });
    const ct = r.headers.get("content-type");
    const text = await r.text();
    console.log("[PBP] vendor fetch", r.status, ct, text.slice(0,120));

    if (!r.ok) throw new Error("vendor HTTP " + r.status);
    // Quick guard if HTML
    const head = text.slice(0, 40).trimStart().toLowerCase();
    if (head.startsWith("<!doctype") || head.startsWith("<html")) {
      throw new Error("vendor returned HTML (check _redirects order)");
    }

    // Try ESM via module blob
    let api = null;
    try {
      const url = URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
      const m = await import(url);
      URL.revokeObjectURL(url);
      api = (m && (m.default?.initialize ? m.default : (m.initialize ? m : null))) || window.esbuild;
    } catch(e) {
      console.warn("[PBP] module import failed, trying eval", e);
    }
    if (!api) {
      // Fallback to classic eval
      try {
        api = new Function("window", text + "\n;return window.esbuild;")(window);
      } catch(e) {
        console.warn("[PBP] eval failed", e);
      }
    }
    if (!api || !api.initialize) throw new Error("esbuild API not found after import/eval");
    window.esbuild = api;

    await window.esbuild.initialize({ wasmURL });

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
    console.info("[PBP] TSX boot OK");
  } catch(e) {
    console.error("[PBP] TSX boot failed (v0006i)", e);
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;inset:12px auto auto 12px;background:#fff;border:1px solid #f00;padding:10px;border-radius:8px;z-index:2147483647;font:12px/1.4 -apple-system,Segoe UI,Roboto";
    el.innerHTML = "TSX loader error.<br>See console for precise diagnostics.";
    document.body.appendChild(el);
  }
})();