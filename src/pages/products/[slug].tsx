import fs from "fs/promises";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import React from "react";
import { getProductCards } from "../../data/products";
import { getPriceFromCZK, getPriceBySlug } from "../../lib/pricing";

type Props = {
  slug: string;
  frontmatter: Record<string, any>;
  contentHtml: string;
  priceLabel?: string | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cards = await getProductCards();
  const paths = cards.map((c: any) => ({ params: { slug: c.slug ?? c.id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || "");
  const mdPath = path.join(process.cwd(), "content", "products", `${slug}.md`);
  const raw = await fs.readFile(mdPath, "utf8");
  const { data: frontmatter, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const priceNumber = frontmatter?.priceCZK ?? frontmatter?.price ?? null;
  const priceLabel = priceNumber
    ? getPriceFromCZK(Number(priceNumber))
    : getPriceBySlug(slug) ?? null;

  return {
    props: {
      slug,
      frontmatter: frontmatter || {},
      contentHtml,
      priceLabel,
    },
    revalidate: 60,
  };
};

export default function ProductDetailPage({ slug, frontmatter, contentHtml, priceLabel }: Props) {
  const ld: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: frontmatter?.title ?? frontmatter?.name ?? slug,
    description: frontmatter?.description ?? "",
    sku: frontmatter?.sku ?? slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "CZK",
      price: frontmatter?.priceCZK ?? frontmatter?.price ?? undefined,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{frontmatter?.title ?? frontmatter?.name ?? slug}</h1>
      {priceLabel && <p className="text-lg mb-4">{priceLabel}</p>}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="mt-6">
        <a
          href={`/quote?product=${encodeURIComponent(slug)}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
        >
          Konfigurovat
        </a>
      </div>
    </main>
  );
}
