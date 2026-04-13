import type { Metadata } from 'next';
import EpicShopLayout from '@/components/shop/EpicShopLayout';

export const metadata: Metadata = {
  title: 'Shop Máy Tính & Linh Kiện | MTIEN SOLUTION',
  description: 'Mua laptop, PC, linh kiện máy tính, thiết bị ngoại vi chính hãng giá tốt. Dịch vụ sửa chữa, nâng cấp máy tính chuyên nghiệp tại MTIEN SOLUTION.',
  keywords: ['mua laptop', 'linh kiện máy tính', 'PC gaming', 'thiết bị ngoại vi', 'sửa chữa máy tính', 'nâng cấp máy tính', 'MTIEN SOLUTION', 'phần mềm bản quyền', 'thiết bị mạng'],
  openGraph: {
    title: 'Shop Máy Tính & Linh Kiện | MTIEN SOLUTION',
    description: 'Laptop, PC, linh kiện chính hãng giá tốt. Sửa chữa & nâng cấp chuyên nghiệp.',
    type: 'website',
    url: '/shop',
  },
};

const shopJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'MTIEN SOLUTION Tech Store',
  description: 'Bán lẻ máy vi tính, thiết bị ngoại vi, phần mềm. Dịch vụ sửa chữa & nâng cấp máy tính.',
  url: 'https://mtiensolution.vn/shop',
  telephone: '+84-1800-6750',
  priceRange: '₫₫',
  currenciesAccepted: 'VND',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  openingHours: 'Mo-Sa 08:00-18:00',
};

export default function ShopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }} />
      <EpicShopLayout />
    </>
  );
}
