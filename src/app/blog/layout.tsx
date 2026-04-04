import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Tin tức',
  description: 'Cập nhật tin tức công nghệ, xu hướng thiết kế, giải pháp IT mới nhất từ MTIEN SOLUTION.',
  openGraph: {
    title: 'Blog & Tin tức | MTIEN SOLUTION',
    description: 'Cập nhật tin tức công nghệ, xu hướng thiết kế, giải pháp IT mới nhất.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
