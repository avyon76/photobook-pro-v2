import fs from "fs";
import path from "path";

type Row = Record<string, string>;

let pricingCache: Row[] | null = null;

function detectDelimiter(headerLine: string): string {
  return headerLine.includes(";") ? ";" : ",";
}

function parseCsv(text: string): Row[] {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];
  const delim = detectDelimiter(lines[0]);
  const headers = lines[0].split(delim).map(h => h.trim());
  return lines.slice(1).map(line => {
    const cells = line.split(delim).map(c => c.trim());
    const row: Row = {};
    headers.forEach((h, i) => (row[h] = cells[i] ?? ""));
    return row;
  });
}

function loadPricing(): Row[] {
  if (pricingCache) return pricingCache;
  const csvPath = path.join(process.cwd(), "content", "pricing", "pricing.cz.csv");
  const text = fs.readFileSync(csvPath, "utf-8");
  pricingCache = parseCsv(text);
  return pricingCache!;
}

function toNumber(v: string): number | null {
  if (!v) return null;
  const n = Number(String(v).replace(/[^\d.,-]/g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n) : null;
}

function matchSlug(row: Row, slug: string): boolean {
  const keys = ["slug", "product", "name", "group"];
  return keys.some(k => (row[k] || "").toLowerCase() === slug.toLowerCase());
}

export function getMinPriceForSlug(slug: string): number | null {
  const rows = loadPricing().filter(r => matchSlug(r, slug));
  let min: number | null = null;
  for (const r of rows) {
    const cand = toNumber(r.priceCZK || r.price_czk || r.price || r["price_czk"]);
    if (cand != null) {
      if (min == null || cand < min) min = cand;
    }
  }
  return min;
}

export function formatCZK(value: number): string {
  const s = new Intl.NumberFormat("cs-CZ").format(value);
  return `${s}\u00A0Kč`;
}

export function getPriceFromCZK(slug: string): { raw: number | null; formatted: string | null } {
  const raw = getMinPriceForSlug(slug);
  return { raw, formatted: raw != null ? formatCZK(raw) : null };
}