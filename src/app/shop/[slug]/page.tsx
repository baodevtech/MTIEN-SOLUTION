import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/shop/ProductDetail';
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from '@/data/products';

/* ------------------------------------------------------------------ */
/*  Category name map                                                   */
/* ------------------------------------------------------------------ */
const CATEGORY_NAMES: Record<string, string> = {
  laptop: 'Laptop & MacBook',
  pc: 'PC & Máy bàn',
  linhkien: 'Linh kiện',
  ngoaivi: 'Thiết bị ngoại vi',
  phanmem: 'Phần mềm',
  mang: 'Thiết bị mạng',
};

/* ------------------------------------------------------------------ */
/*  Static Params                                                       */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Sản phẩm không tồn tại | MTIEN SOLUTION' };

  const title = `${product.name} | MTIEN SOLUTION`;
  const description = `${product.shortDesc} Giá: ${product.priceDisplay}. Bảo hành: ${product.warranty}. Chính hãng, giao hàng nhanh tại MTIEN SOLUTION.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand,
      CATEGORY_NAMES[product.category] ?? product.category,
      'mua ' + product.name,
      'giá ' + product.name,
      'MTIEN SOLUTION',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/shop/${product.slug}`,
      images: [{ url: product.image, width: 600, height: 600, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 5);
  const categoryName = CATEGORY_NAMES[product.category] ?? product.category;

  /* JSON-LD Product schema */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'MTIEN SOLUTION',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail
        product={product}
        related={related}
        categoryName={categoryName}
      />
    </>
  );
}
