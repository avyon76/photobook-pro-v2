(function(){
  const LOCALE_KEY = "pbp.locale";
  const dict = {
    cs: {
      "tools.title": "Interní nástroje",
      "tools.mockup": "Mockup Studio (beta)",
      "tools.preflight": "Preflight (beta)",
      "tools.desc": "Pomocné nástroje pro Studio. Lokální, bez serveru.",
      "open": "Otevřít",
      "admin": "Admin",
      "health": "Health",
      "lang": "Jazyk",
      // Mockup
      "mockup.title": "Mockup Studio (beta)",
      "mockup.desc": "Sestav rychlou scénu z lokálních obrázků a exportuj PNG.",
      "mockup.canvas": "Plátno",
      "mockup.bg": "Pozadí",
      "mockup.upload": "Nahrát obrázek(y)",
      "mockup.clear": "Vyčistit",
      "mockup.export": "Export PNG",
      "mockup.scale": "Měřítko",
      "mockup.rotate": "Rotace",
      "mockup.x": "X pozice",
      "mockup.y": "Y pozice",
      "mockup.layer": "Vrstva",
      "mockup.bringFront": "Dopředu",
      "mockup.sendBack": "Dozadu",
      // Preflight
      "preflight.title": "Preflight (beta)",
      "preflight.desc": "Zkontroluj DPI, ořez/bleed a bezpečné okraje před tiskem.",
      "preflight.upload": "Nahrát obrázek",
      "preflight.size": "Cílový rozměr (cm)",
      "preflight.bleed": "Spadávka (mm)",
      "preflight.safe": "Safe margin (mm)",
      "preflight.dpiTarget": "Doporučené DPI",
      "preflight.analyze": "Analyzovat",
      "preflight.result": "Výsledky",
      "preflight.warnings": "Varování",
      "preflight.ok": "Vše v pořádku."
    },
    en: {
      "tools.title": "Internal Tools",
      "tools.mockup": "Mockup Studio (beta)",
      "tools.preflight": "Preflight (beta)",
      "tools.desc": "Helper tools for Studio. Local-only, no server.",
      "open": "Open",
      "admin": "Admin",
      "health": "Health",
      "lang": "Language",
      // Mockup
      "mockup.title": "Mockup Studio (beta)",
      "mockup.desc": "Compose a quick scene from local images and export PNG.",
      "mockup.canvas": "Canvas",
      "mockup.bg": "Background",
      "mockup.upload": "Upload image(s)",
      "mockup.clear": "Clear",
      "mockup.export": "Export PNG",
      "mockup.scale": "Scale",
      "mockup.rotate": "Rotate",
      "mockup.x": "X position",
      "mockup.y": "Y position",
      "mockup.layer": "Layer",
      "mockup.bringFront": "Bring to Front",
      "mockup.sendBack": "Send to Back",
      // Preflight
      "preflight.title": "Preflight (beta)",
      "preflight.desc": "Check DPI, bleed, and safe margins before print.",
      "preflight.upload": "Upload image",
      "preflight.size": "Target size (cm)",
      "preflight.bleed": "Bleed (mm)",
      "preflight.safe": "Safe margin (mm)",
      "preflight.dpiTarget": "Recommended DPI",
      "preflight.analyze": "Analyze",
      "preflight.result": "Results",
      "preflight.warnings": "Warnings",
      "preflight.ok": "Looks good."
    }
  };

  function t(key){
    const lang = localStorage.getItem(LOCALE_KEY) || "cs";
    return (dict[lang] && dict[lang][key]) || key;
  }
  function apply(){
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    // select current
    const sel = document.querySelector("#langSel");
    if(sel){
      const lang = localStorage.getItem(LOCALE_KEY) || "cs";
      sel.value = lang;
    }
  }
  window.PBPI18N = {
    set(lang){
      localStorage.setItem(LOCALE_KEY, lang);
      apply();
    },
    t, apply, LOCALE_KEY
  };
  document.addEventListener("DOMContentLoaded", apply);
})();