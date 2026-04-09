import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch vụ Cloud Server Doanh nghiệp',
  description:
    'Hạ tầng Cloud Server mạnh mẽ, bảo mật đa tầng, uptime 99.99%. Hỗ trợ di chuyển miễn phí, vận hành 24/7 từ MTIEN SOLUTION.',
  openGraph: {
    title: 'Dịch vụ Cloud Server Doanh nghiệp | MTIEN SOLUTION',
    description:
      'Cloud Server doanh nghiệp: bảo mật đa tầng, uptime 99.99%, hỗ trợ 24/7.',
  },
  alternates: {
    canonical: '/dich-vu/cloud-server',
  },
};

export default function CloudServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
