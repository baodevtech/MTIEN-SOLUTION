import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dịch vụ Marketing & Design',
  description: 'Dịch vụ thiết kế UI/UX chuyên nghiệp, thiết kế nhận diện thương hiệu và ấn phẩm Marketing sáng tạo, tối ưu chuyển đổi.',
  openGraph: {
    title: 'Dịch vụ Marketing & Design | MTIEN SOLUTION',
    description: 'Nâng tầm diện mạo thương hiệu với giải pháp thiết kế UI/UX và Marketing chuẩn quốc tế.',
  },
};

export default function MarketingDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}