'use client';

import { motion } from 'motion/react';
import { PenTool, Palette, CheckCircle2 } from 'lucide-react';

/**
 * DesignServiceBrand - Dich vu Thuong hieu va An pham Marketing
 * Bao gom: Section Brand Identity (logo, brand guidelines) va Section Marketing Assets (banner, pitch deck, brochure)
 */

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export default function DesignServiceBrand() {
  return (
    <>
      {/* SECTION 7: SERVICE - BRANDING */}
      <section className="py-32 px-6 bg-white overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[450px] w-full rounded-[40px] shadow-2xl border border-neutral-100 overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80" alt="Brand Identity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-bold mb-6"><PenTool size={18} /> Brand Identity</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Bộ nhận diện<br/>vượt thời gian.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Logo và màu sắc thương hiệu là tài sản tạo nên giá trị dài hạn. Chúng tôi thiết kế bộ Brand Guidelines toàn diện, đảm bảo hình ảnh doanh nghiệp của bạn đồng nhất trên mọi nền tảng.</p>
            <ul className="space-y-4">
               {['Thiết kế Logo tiêu chuẩn', 'Hệ thống màu sắc & Typography', 'Cẩm nang Brand Guidelines'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: SERVICE - MARKETING ASSETS */}
      <section className="py-32 px-6 bg-neutral-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[450px] w-full rounded-[40px] shadow-2xl border border-white/10 overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80" alt="Marketing Assets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-cyan-400 font-bold mb-6"><Palette size={18} /> Marketing Assets</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Thiết kế truyền thông<br/>tối đa chuyển đổi.</h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">Thống trị nhãn quan trên mạng xã hội bằng những ấn phẩm sắc nét. Chúng tôi cung cấp banner, profile, hồ sơ năng lực mang đậm tính Sales và Marketing chuyên nghiệp.</p>
            <ul className="space-y-4">
               {['Banner quảng cáo (Ads)', 'Hồ sơ năng lực (Pitch Deck)', 'Brochure & Catalog'].map((l, i)=><li key={i} className="flex items-center gap-3 font-medium"><CheckCircle2 className="text-cyan-400" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
