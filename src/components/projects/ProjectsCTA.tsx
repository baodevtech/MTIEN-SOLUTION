'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * ProjectsCTA - Phan keu goi hanh dong cuoi trang
 * Khuyen khich khach hang lien he de thao luan ve du an cua ho
 */
export default function ProjectsCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-blue-50 rounded-[3rem] p-12 text-center border border-blue-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Bạn có một dự án đang ấp ủ?</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Hãy để đội ngũ chuyên gia của chúng tôi biến ý tưởng của bạn thành sản phẩm thực tế với chất lượng cao nhất.</p>
        <Link href="/contact" className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-200 hover:-translate-y-1">
          Bắt đầu thảo luận <ArrowUpRight size={20} />
        </Link>
      </div>
    </section>
  );
}
