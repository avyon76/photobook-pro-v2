import fs from "fs";
import path from "path";

const pricingCsvPath = path.join(process.cwd(), "content", "pricing", "pricing.cz.csv");

let priceMap: Record<string, number> = {};

// načíst CSV, tolerantně vůči oddělovači a hlavičce
try {
  const raw = fs.readFileSync(pricingCsvPath, "utf8");
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (const line of lines) {
    if (!line) continue;
    if (/slug/i.test(line) && /price/i.test(line)) continue; // skip header
    const sep = line.includes(";") ? ";" : ",";
    const [slugRaw, priceRaw] = line.split(sep).map(s => s.trim());
    if (!slugRaw) continue;
    const priceNum = Number((priceRaw || "").replace(/[^
\d.-]/g, ""));
    if (!Number.isNaN(priceNum) && priceNum > 0) {
      priceMap[slugRaw] = Math.round(priceNum);
    }
  }
} catch (e) {
  // file may be missing in dev; priceMap stays empty
}

/** Format CZK with thousands according to cs-CZ and NBSP before "Kč" */
function formatCZK(n: number) {
  try {
    const s = new Intl.NumberFormat("cs-CZ").format(Math.round(n));
    return `${s}\u00A0Kč`;
  } catch {
    return `${Math.round(n)}\u00A0Kč`;
  }
}

/** Vrátí "od X\u00A0Kč" pro číselnou hodnotu */
export function getPriceFromCZK(value: number): string {
  return `od ${formatCZK(value)}`;
}

/** Hledá cenu podle slug z CSV a vrací formátovaný label nebo undefined */
export function getPriceBySlug(slug: string): string | undefined {
  const p = priceMap[slug];
  if (p && !Number.isNaN(p)) return getPriceFromCZK(p);
  return undefined;
}

export default {
  getPriceFromCZK,
  getPriceBySlug,
};
