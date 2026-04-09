import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Liên hệ MTIEN SOLUTION để được tư vấn giải pháp công nghệ. Hotline: 1800 6750. Email: support@mtiensolution.vn',
  openGraph: {
    title: 'Liên hệ | MTIEN SOLUTION',
    description: 'Liên hệ để được tư vấn giải pháp công nghệ toàn diện.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
