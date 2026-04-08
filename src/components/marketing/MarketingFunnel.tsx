'use client';

/**
 * MarketingFunnel - Mo hinh tang truong AARRR (Pirate Metrics)
 * Hien thi 5 buoc pheu: Acquisition, Activation, Retention, Revenue, Referral.
 * Moi buoc co thanh mau va do rong giam dan tao hieu ung hinh pheu.
 */

import { motion } from 'motion/react';
import { Target } from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.8, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const funnelSteps = [
  { t: 'Acquisition (Thu hút)', d: 'Kéo user từ Ads, SEO, Social Media.', c: 'bg-blue-600', w: 'w-full' },
  { t: 'Activation (Kích hoạt)', d: 'Biến user thành Leads (đăng ký, form, tin nhắn).', c: 'bg-cyan-500', w: 'w-11/12' },
  { t: 'Retention (Giữ chân)', d: 'Email, Remarketing để user quay lại.', c: 'bg-yellow-500', w: 'w-5/6' },
  { t: 'Revenue (Doanh thu)', d: 'Tối ưu Tỷ lệ chốt Sales & Upsell.', c: 'bg-green-500', w: 'w-3/4' },
  { t: 'Referral (Lan truyền)', d: 'Khách hàng giới thiệu khách hàng mới.', c: 'bg-blue-500', w: 'w-2/3' }
];

export default function MarketingFunnel() {
  return (
    <>
      {/* ===== MOBILE: Compact Bento Funnel ===== */}
      <section className="md:hidden py-10 px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-5">
          <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3"><Target size={20} /></div>
          <h2 className="text-[22px] font-bold tracking-tight text-neutral-900">Mô Hình AARRR</h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-1.5">
          {funnelSteps.map((f, i) => {
            const widths = ['w-full', 'w-[94%]', 'w-[86%]', 'w-[78%]', 'w-[70%]'];
            const bgs = ['bg-blue-600 text-white', 'bg-cyan-500 text-white', 'bg-amber-400 text-neutral-900', 'bg-emerald-500 text-white', 'bg-blue-500 text-white'];
            return (
              <div key={i} className={`${widths[i]} ${bgs[i]} mx-auto rounded-xl px-4 py-2.5 flex items-center justify-between`}>
                <span className="text-[13px] font-bold">{f.t.split('(')[0].trim()}</span>
                <span className="text-[10px] font-medium opacity-80">{f.t.match(/\(([^)]+)\)/)?.[1]}</span>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* ===== DESKTOP: Original Funnel ===== */}
      <section className="hidden md:block py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-8"><Target size={32} /></motion.div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Mô Hình Tăng Trưởng AARRR</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-lg text-neutral-600 leading-relaxed mb-16">Chúng tôi vạch ra lộ trình minh bạch để &quot;Hacking&quot; sự phát triển của bạn ở mọi tầng trong phễu.</motion.p>
          
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
             {funnelSteps.map((f, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className={`${f.w} mx-auto flex items-center shadow-md rounded-2xl overflow-hidden bg-white border border-neutral-100 relative`}>
                   <div className={`w-2 h-full absolute left-0 ${f.c} top-0 bottom-0`}></div>
                   <div className="p-5 pl-8 flex-1 text-left">
                     <span className="font-bold text-neutral-900 text-lg block">{f.t}</span>
                     <span className="text-neutral-500 text-sm">{f.d}</span>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
}
