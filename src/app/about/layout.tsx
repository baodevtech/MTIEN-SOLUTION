import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Về chúng tôi',
  description: 'Tìm hiểu về MTIEN SOLUTION - Đội ngũ, tầm nhìn, sứ mệnh và hành trình phát triển của chúng tôi.',
  openGraph: {
    title: 'Về chúng tôi | MTIEN SOLUTION',
    description: 'Tìm hiểu về MTIEN SOLUTION - Đội ngũ, tầm nhìn, sứ mệnh và hành trình phát triển.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
