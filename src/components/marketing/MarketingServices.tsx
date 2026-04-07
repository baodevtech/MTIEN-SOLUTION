'use client';

/**
 * MarketingServices - Cac dich vu Marketing chinh
 * Gom 4 section dich vu: SEO, Performance Ads, Social & Content, Email & CRM Automation.
 * Moi dich vu trinh bay dang 2 cot (hinh anh + noi dung) voi layout xen ke.
 */

import { motion } from 'motion/react';
import { Search, CheckCircle2, MousePointerClick, Megaphone, Mail } from 'lucide-react';

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

export default function MarketingServices() {
  return (
    <>
      {/* SECTION 5: SERVICE - SEO */}
      <section className="py-32 px-6 bg-white overflow-hidden border-y border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80" alt="SEO" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-8 left-8 text-white">
                <Search size={40} className="mb-4 text-emerald-400"/>
                <div className="text-2xl font-bold">Top 1 Google</div>
             </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 font-bold mb-6"><Search size={18} /> Search Engine Optimization</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Tối ưu hóa SEO <br/>thống trị kết quả tìm kiếm.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Nguồn khách hàng miễn phí và bền vững nhất đến từ Google. Chúng tôi cung cấp giải pháp SEO tổng thể, bao vây thị trường bằng nội dung chất lượng cao và backlink uy tín.</p>
            <ul className="space-y-4">
               {['SEO Tổng thể (Audit, Onpage, Offpage)', 'Nghiên cứu & Tracking Keyword Mapping', 'Technical SEO tối ưu tốc độ website'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-emerald-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: SERVICE - PERFORMANCE ADS */}
      <section className="py-32 px-6 bg-neutral-50 overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Performance Ads" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-bold mb-6"><MousePointerClick size={18} /> Performance Ads</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Quảng cáo Đa nền tảng <br/>mang về doanh số thực.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Triển khai chiến dịch Paid Ads quy mô lớn trên Meta (Facebook, Instagram), Google (Search, Display, Shopping) và TikTok. Tối ưu liên tục dựa trên CPA và ROAS mục tiêu.</p>
            <ul className="space-y-4">
               {['Media Planning & Ngân sách chiến lược', 'A/B Testing Creatives & Target Audiences', 'Retargeting (Bám đuổi tệp khách hàng tiềm năng)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: SERVICE - SOCIAL MEDIA */}
      <section className="py-32 px-6 bg-white overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80" alt="Social Media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-800 font-bold mb-6"><Megaphone size={18} /> Social & Content</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Sáng tạo Nội dung Viral.<br/>Lan tỏa mạnh mẽ.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Xây dựng cộng đồng trung thành bằng những nội dung mang tính giải trí, giáo dục và có sức lan tỏa (Viral). Chúng tôi quản trị toàn diện hệ thống Fanpage, TikTok channel của bạn.</p>
            <ul className="space-y-4">
               {['Sản xuất Video Short, Reels & TikTok', 'Kịch bản Content Marketing Calendar', 'Community building (Seeding & Quản trị)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-blue-600" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: SERVICE - EMAIL & AUTOMATION */}
      <section className="py-32 px-6 bg-neutral-50 overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
             <img src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80" alt="Email Marketing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-bold mb-6"><Mail size={18} /> Automated CRM</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">Hệ thống Auto-Marketing <br/>Chăm sóc tự động 24/7.</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">Thiết lập luồng (flow) Email & SMS tự động, nuôi dưỡng Leads đến khi họ sẵn sàng mua hàng. Biến khách hàng cũ thành những người ủng hộ trung thành nhất.</p>
            <ul className="space-y-4">
               {['Email Drip Campaigns', 'Kịch bản Chatbot & SMS tự động', 'Tích hợp hệ thống CRM (Klaviyo, Mailchimp)'].map((l, i)=><li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> {l}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
