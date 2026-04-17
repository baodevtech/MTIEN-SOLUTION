'use client';

/**
 * MarketingCoreValues - DNA cua su tang truong
 * Luoi Bento hien thi 4 gia tri cot loi: Data-Driven, Toi uu Funnel,
 * Thuc thi than toc, va Omni-Channel. Nen toi (neutral-950) voi bo goc lon.
 */

import Image from 'next/image';
import { motion } from 'motion/react';
import { PieChart, Crosshair, Zap, Globe2 } from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function MarketingCoreValues() {
  return (
      <section className="py-16 md:py-32 px-4 md:px-6 bg-neutral-950 text-white rounded-[24px] md:rounded-[80px] mx-3 md:mx-8 mb-16 md:mb-32 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[24px] md:text-5xl font-bold tracking-tight">DNA của Sự Tăng Trưởng</motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[140px] md:auto-rows-[250px]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="col-span-2 md:col-span-2 bg-neutral-900 rounded-[20px] md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center border border-white/10 hover:border-blue-600/50 transition-colors relative overflow-hidden group">
               <PieChart className="text-blue-600 w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6 relative z-10" />
               <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 relative z-10">Data-Driven</h3>
               <p className="text-neutral-400 relative z-10 text-xs md:text-base md:w-2/3 line-clamp-2 md:line-clamp-none">Chúng tôi không đoán. Chúng tôi sử dụng A/B Testing, Tracking Pixel và Machine Learning để đưa ra mọi quyết định.</p>
               <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="Data" fill className="object-cover opacity-20 object-right" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }} sizes="50vw" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-neutral-900 rounded-[20px] md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center border border-white/10 hover:border-cyan-500/50 transition-colors relative overflow-hidden group">
               <Image src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80" alt="Funnel" fill className="object-cover opacity-10 group-hover:opacity-20 transition-opacity" sizes="33vw" />
               <Crosshair className="text-cyan-500 w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6 relative z-10" />
               <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 relative z-10">Tối ưu Funnel</h3>
               <p className="text-neutral-400 relative z-10 text-xs md:text-base line-clamp-2 md:line-clamp-none">Nhắm trúng phễu từ Nhận thức đến Mua hàng.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="bg-gradient-to-br from-blue-700 to-cyan-600 text-white rounded-[20px] md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full pointer-events-none" />
               <Zap className="text-white w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6 relative z-10" />
               <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 relative z-10">Thực thi thần tốc</h3>
               <p className="text-blue-100 relative z-10 text-xs md:text-base line-clamp-2 md:line-clamp-none">Scale ngân sách ngay khi tìm thấy Winning Camp.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="col-span-2 md:col-span-2 bg-neutral-900 rounded-[20px] md:rounded-[32px] p-4 md:p-10 flex flex-col justify-center border border-white/10 hover:border-purple-500/50 transition-colors relative overflow-hidden">
               <Globe2 className="text-purple-500 w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6 relative z-10" />
               <h3 className="text-base md:text-2xl font-bold mb-1 md:mb-2 relative z-10">Omni-Channel</h3>
               <p className="text-neutral-400 relative z-10 text-xs md:text-base md:w-2/3 line-clamp-2 md:line-clamp-none">Khách hàng của bạn ở đâu, thương hiệu của bạn có mặt ở đó. Phủ sóng đồng điệu mọi điểm chạm số từ Google đến TikTok.</p>
               <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" alt="Omni" fill className="object-cover opacity-10 object-right" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }} sizes="50vw" />
            </motion.div>
          </div>
        </div>
      </section>
  );
}
