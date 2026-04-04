import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ShopHero from '@/components/shop/ShopHero';
import ShopCategories from '@/components/shop/ShopCategories';

const ShopDeals = dynamic(() => import('@/components/shop/ShopDeals'));
const ShopProducts = dynamic(() => import('@/components/shop/ShopProducts'));
const ShopServices = dynamic(() => import('@/components/shop/ShopServices'));
const ShopBrands = dynamic(() => import('@/components/shop/ShopBrands'));
const ShopFeatures = dynamic(() => import('@/components/shop/ShopFeatures'));

export const metadata: Metadata = {
  title: 'Shop Máy Tính & Linh Kiện | MTIEN SOLUTION',
  description:
    'Mua laptop, PC, linh kiện máy tính, thiết bị ngoại vi chính hãng giá tốt. Dịch vụ sửa chữa, nâng cấp máy tính chuyên nghiệp tại MTIEN SOLUTION.',
  keywords: [
    'mua laptop',
    'linh kiện máy tính',
    'PC gaming',
    'thiết bị ngoại vi',
    'sửa chữa máy tính',
    'nâng cấp máy tính',
    'MTIEN SOLUTION',
    'phần mềm bản quyền',
    'thiết bị mạng',
  ],
  openGraph: {
    title: 'Shop Máy Tính & Linh Kiện | MTIEN SOLUTION',
    description:
      'Laptop, PC, linh kiện chính hãng giá tốt. Sửa chữa & nâng cấp chuyên nghiệp.',
    type: 'website',
    url: '/shop',
  },
};

const shopJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'MTIEN SOLUTION Tech Store',
  description:
    'Bán lẻ máy vi tính, thiết bị ngoại vi, phần mềm. Dịch vụ sửa chữa & nâng cấp máy tính.',
  url: 'https://mtiensolution.com/shop',
  telephone: '+84-xxx-xxx-xxx',
  priceRange: '₫₫',
  currenciesAccepted: 'VND',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  openingHours: 'Mo-Sa 08:00-18:00',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Máy tính & Linh kiện',
    itemListElement: [
      { '@type': 'OfferCatalog', name: 'Laptop & MacBook' },
      { '@type': 'OfferCatalog', name: 'PC & Máy bàn' },
      { '@type': 'OfferCatalog', name: 'Linh kiện máy tính' },
      { '@type': 'OfferCatalog', name: 'Thiết bị ngoại vi' },
      { '@type': 'OfferCatalog', name: 'Phần mềm bản quyền' },
      { '@type': 'OfferCatalog', name: 'Thiết bị mạng & viễn thông' },
    ],
  },
};

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <main>
        <ShopHero />
        <ShopCategories />
        <ShopDeals />
        <ShopProducts />
        <ShopServices />
        <ShopBrands />
        <ShopFeatures />
      </main>
    </>
  );
}
