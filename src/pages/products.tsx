import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getProductCards } from "../data/products";
import { getPriceFromCZK, getPriceBySlug } from "../lib/pricing";

type ProductCard = {
  slug: string;
  title?: string;
  name?: string;
  priceCZK?: number | string;
  price?: number | string;
  [k: string]: any;
};

type Props = {
  products: ProductCard[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const cards = await getProductCards();
  return {
    props: {
      products: cards,
    },
    revalidate: 60,
  };
};

export default function ProductsPage({ products }: Props) {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Produkty</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => {
          const slug = p.slug ?? p.id;
          const title = p.title ?? p.name ?? slug;
          const rawPrice = p.priceCZK ?? p.price;
          const priceLabel =
            rawPrice != null
              ? getPriceFromCZK(Number(rawPrice))
              : (slug ? getPriceBySlug(String(slug)) : undefined);

          return (
            <article key={slug} className="border p-4 rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              {priceLabel && <p className="text-lg mb-4">{priceLabel}</p>}
              <div className="flex gap-2">
                <Link
                  href={`/quote?product=${encodeURIComponent(String(slug))}`}
                  className="inline-block px-3 py-2 bg-blue-600 text-white rounded"
                >
                  Konfigurovat
                </Link>
                <Link
                  href={`/products/${encodeURIComponent(String(slug))}`}
                  className="inline-block px-3 py-2 border rounded"
                >
                  Detail
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
