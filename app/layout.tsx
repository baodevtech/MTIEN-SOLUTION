import type { Metadata } from 'next';
import { Inter, Manrope, Noto_Sans } from 'next/font/google';
import './globals.css';
import './inotek-clone.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });
const manrope = Manrope({ subsets: ['latin'] });
const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
export const metadata: Metadata = {
  title: 'MTIEN SOLUTION - Giải pháp Công nghệ Toàn diện',
  description: 'Cung cấp dịch vụ lập trình, thiết kế, cloud, và thiết bị IT chuyên nghiệp.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${manrope.className} ${notoSans.className} bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900`} suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
