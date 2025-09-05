(function(){
  const KEY = "pbp.telemetry.enabled";
  function enabled(){ return localStorage.getItem(KEY) === "1"; }
  function set(val){ localStorage.setItem(KEY, val ? "1" : "0"); }
  function log(action, meta){
    if(!enabled()) return;
    try{
      const payload = { ts: new Date().toISOString(), page: location.pathname, action, meta: meta||{} };
      // Local-only: just console
      console.log("[PBP:telemetry]", payload);
    }catch(e){ /* noop */ }
  }
  function ui(){
    const btn = document.createElement("button");
    btn.textContent = enabled() ? "Telemetry: ON" : "Telemetry: OFF";
    btn.style.position="fixed"; btn.style.bottom="12px"; btn.style.right="12px";
    btn.style.padding="8px 12px"; btn.style.borderRadius="12px"; btn.style.border="1px solid rgba(0,0,0,.1)";
    btn.style.background="#fff"; btn.style.cursor="pointer"; btn.style.zIndex="99999";
    btn.addEventListener("click", ()=>{ set(!enabled()); btn.textContent = enabled() ? "Telemetry: ON" : "Telemetry: OFF"; });
    document.body.appendChild(btn);
  }
  window.PBPT = { log, enabled, set, ui };
  document.addEventListener("DOMContentLoaded", ()=>{ log("page_load"); ui(); });
})();