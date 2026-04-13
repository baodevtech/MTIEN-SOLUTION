import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch vụ IT toàn diện',
  description: 'Dịch vụ phần mềm, hạ tầng cloud, thiết kế marketing và thiết bị IT chuyên nghiệp từ MTIEN SOLUTION.',
  openGraph: {
    title: 'Dịch vụ IT toàn diện | MTIEN SOLUTION',
    description: 'Dịch vụ phần mềm, cloud, marketing và thiết bị IT chuyên nghiệp.',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
