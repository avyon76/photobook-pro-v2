export type ProductCard = {
  title: string;
  slug: string;
  category: string;
  image: string;
  badges: string[];
  ctaLabel: string;
  ctaHref: string;
  priceFromCZK?: number;
  priceFrom?: string;
};

import { getPriceFromCZK } from "@/src/lib/pricing/index";

export async function getProductCards(): Promise<ProductCard[]> {
  const cards: ProductCard[] = [
{
      title: "Vizitky",
      slug: "vizitky",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: ["Bestseller"],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=business-cards",
    },
{
      title: "Let\u00e1ky a prospekty",
      slug: "letaky-prospekty",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=leaflets",
    },
{
      title: "Skl\u00e1dan\u00e9 let\u00e1ky",
      slug: "skladane-letaky",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=folded",
    },
{
      title: "Laminovan\u00e1 menu",
      slug: "laminovana-menu",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=menu",
    },
{
      title: "Ob\u00e1lky \u2013 firemn\u00ed",
      slug: "obalky-firemni",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=envelopes",
    },
{
      title: "Pohlednice",
      slug: "pohlednice",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=postcards",
    },
{
      title: "Pozv\u00e1nky & p\u0159\u00e1n\u00ed",
      slug: "pozvanky-prani",
      category: "Mal\u00fd form\u00e1t",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/small-format?v=invites",
    },
{
      title: "Kalend\u00e1\u0159e \u2013 n\u00e1st\u011bnn\u00e9/stoln\u00ed",
      slug: "kalendar",
      category: "Knihy & Kalend\u00e1\u0159e",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/calendars?preset=table-a5",
    },
{
      title: "Krou\u017ekov\u00e1 vazba \u2013 Wiro/Twin",
      slug: "wiro",
      category: "Knihy & Kalend\u00e1\u0159e",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/calendars?preset=wiro",
    },
{
      title: "Vnit\u0159n\u00ed plak\u00e1ty",
      slug: "vnitrni-plakaty",
      category: "Plak\u00e1ty & Obrazy",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=poster&material=indoor",
    },
{
      title: "Venkovn\u00ed plak\u00e1ty",
      slug: "venkovni-plakaty",
      category: "Plak\u00e1ty & Obrazy",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=poster&material=outdoor",
    },
{
      title: "Fotografick\u00e9 plak\u00e1ty",
      slug: "fotograficke-plakaty",
      category: "Plak\u00e1ty & Obrazy",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=poster&material=photo",
    },
{
      title: "PVC bannery",
      slug: "pvc-bannery",
      category: "Bannery & Roll-upy",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=banner",
    },
{
      title: "S\u00ed\u0165ovan\u00e9 (mesh) bannery",
      slug: "mesh-bannery",
      category: "Bannery & Roll-upy",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=mesh",
    },
{
      title: "Roll-up sady",
      slug: "rollup-sady",
      category: "Bannery & Roll-upy",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=rollup",
    },
{
      title: "Samolepky (PVC)",
      slug: "samolepky-pvc",
      category: "\u0160t\u00edtky & Samolepky",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=labels",
    },
{
      title: "Etikety na archu / v rol\u00edch",
      slug: "etikety-arch-role",
      category: "\u0160t\u00edtky & Samolepky",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=labels",
    },
{
      title: "P\u00edskovan\u00e9/ornamentn\u00ed f\u00f3lie",
      slug: "piskovane-folie",
      category: "Samolepic\u00ed f\u00f3lie & Interi\u00e9r",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/quote?product=piskovane-folie",
    },
{
      title: "Tapety \u2013 tisk na m\u00edru",
      slug: "tapety-na-miru",
      category: "Samolepic\u00ed f\u00f3lie & Interi\u00e9r",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/quote?product=tapety-na-miru",
    },
{
      title: "Samolepky na okna / ze\u010f",
      slug: "samolepky-okna-zed",
      category: "Samolepic\u00ed f\u00f3lie & Interi\u00e9r",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/quote?product=samolepky-okna-zed",
    },
{
      title: "Cedulov\u00e9 pouta\u010de / desky",
      slug: "cedulove-poutace",
      category: "Desky & Cedule",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=boards",
    },
{
      title: "Plexi cedule s potiskem",
      slug: "plexi-cedule",
      category: "Desky & Cedule",
      image: "/img/placeholders/product-card.png",
      badges: [],
      ctaLabel: "Konfigurovat",
      ctaHref: "/configure/large-format?p=plexi",
    }];

  // Enrich prices at build/server time
  for (const c of cards) {
    const p = getPriceFromCZK(c.slug);
    if (p.raw != null) {
      c.priceFromCZK = p.raw;
      c.priceFrom = p.formatted!;
    } else {
      // fallback to 0 to avoid "Na dotaz" on cards
      c.priceFromCZK = 0;
      c.priceFrom = "0 Kč";
    }
  }

  return cards;
}