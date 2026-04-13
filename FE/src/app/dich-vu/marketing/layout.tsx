import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch vụ Digital Marketing',
  description:
    'Giải pháp Digital Marketing toàn diện: SEO, Google Ads, Social Media, Email Marketing. Tối ưu chi phí, tăng trưởng doanh thu bền vững cùng MTIEN SOLUTION.',
  openGraph: {
    title: 'Dịch vụ Digital Marketing | MTIEN SOLUTION',
    description:
      'SEO, Google Ads, Social Media, Email Marketing - Tối ưu chi phí, tăng trưởng doanh thu.',
  },
  alternates: {
    canonical: '/dich-vu/marketing',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
