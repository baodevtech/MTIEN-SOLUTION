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
  const services = [
    { icon: Search, label: 'SEO', color: 'text-emerald-400', title: 'Tối ưu hóa SEO thống trị tìm kiếm', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80', tags: ['Audit & Onpage', 'Keyword Mapping', 'Technical SEO'], features: ['SEO Tổng thể (Audit, Onpage, Offpage)', 'Nghiên cứu & Tracking Keyword Mapping', 'Technical SEO tối ưu tốc độ website'], badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-600', checkColor: 'text-emerald-500', bgSection: 'bg-white overflow-hidden border-y border-neutral-100', dir: 'md:flex-row' },
    { icon: MousePointerClick, label: 'Performance Ads', color: 'text-blue-400', title: 'Quảng cáo đa nền tảng mang về doanh số', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', tags: ['Media Planning', 'A/B Testing', 'Retargeting'], features: ['Media Planning & Ngân sách chiến lược', 'A/B Testing Creatives & Target Audiences', 'Retargeting (Bám đuổi tệp khách hàng tiềm năng)'], badgeBg: 'bg-blue-100', badgeText: 'text-blue-700', checkColor: 'text-blue-500', bgSection: 'bg-neutral-50 overflow-hidden border-b border-neutral-100', dir: 'md:flex-row-reverse' },
    { icon: Megaphone, label: 'Social & Content', color: 'text-pink-400', title: 'Sáng tạo nội dung Viral, lan tỏa mạnh', img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80', tags: ['Video Short', 'Content Calendar', 'Community'], features: ['Sản xuất Video Short, Reels & TikTok', 'Kịch bản Content Marketing Calendar', 'Community building (Seeding & Quản trị)'], badgeBg: 'bg-blue-100', badgeText: 'text-blue-800', checkColor: 'text-blue-600', bgSection: 'bg-white overflow-hidden border-b border-neutral-100', dir: 'md:flex-row' },
    { icon: Mail, label: 'Automated CRM', color: 'text-purple-400', title: 'Auto-Marketing chăm sóc tự động 24/7', img: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80', tags: ['Email Drip', 'Chatbot & SMS', 'CRM Klaviyo'], features: ['Email Drip Campaigns', 'Kịch bản Chatbot & SMS tự động', 'Tích hợp hệ thống CRM (Klaviyo, Mailchimp)'], badgeBg: 'bg-purple-100', badgeText: 'text-purple-700', checkColor: 'text-purple-500', bgSection: 'bg-neutral-50 overflow-hidden border-b border-neutral-100', dir: 'md:flex-row-reverse' },
  ];

  return (
    <>
      {/* ===== MOBILE: Bento 2 rows ===== */}
      <section className="md:hidden py-10 px-4 space-y-4">
        {/* Row 1: SEO tall left + Ads right stacked */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-3 h-[280px]">
          <div className="flex-1 relative rounded-[20px] overflow-hidden">
            <img src={services[0].img} alt={services[0].label} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-black/30 to-black/10" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center mb-2"><Search size={14} className="text-white" /></div>
              <h3 className="text-[15px] font-bold text-white leading-snug mb-1.5">{services[0].title}</h3>
              <div className="flex flex-wrap gap-1">
                {services[0].tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[10px] font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex-1 relative rounded-[20px] overflow-hidden bg-neutral-900">
              <img src={services[1].img} alt={services[1].label} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <MousePointerClick size={12} className="text-blue-400" />
                  <span className="text-blue-400 text-[10px] font-semibold uppercase">Ads</span>
                </div>
                <h3 className="text-[13px] font-bold text-white leading-snug">{services[1].title}</h3>
              </div>
            </div>
            <div className="bg-[#F5F5F7] rounded-[16px] p-3 flex flex-wrap gap-1.5 content-center">
              {services[1].tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-white text-neutral-700 text-[10px] font-semibold shadow-sm">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Row 2: Social tall left + Email right stacked */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="flex gap-3 h-[280px]">
          <div className="flex-1 relative rounded-[20px] overflow-hidden">
            <img src={services[2].img} alt={services[2].label} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-black/30 to-black/10" />
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center mb-2"><Megaphone size={14} className="text-white" /></div>
              <h3 className="text-[15px] font-bold text-white leading-snug mb-1.5">{services[2].title}</h3>
              <div className="flex flex-wrap gap-1">
                {services[2].tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[10px] font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex-1 relative rounded-[20px] overflow-hidden bg-neutral-900">
              <img src={services[3].img} alt={services[3].label} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Mail size={12} className="text-purple-400" />
                  <span className="text-purple-400 text-[10px] font-semibold uppercase">CRM</span>
                </div>
                <h3 className="text-[13px] font-bold text-white leading-snug">{services[3].title}</h3>
              </div>
            </div>
            <div className="bg-[#F5F5F7] rounded-[16px] p-3 flex flex-wrap gap-1.5 content-center">
              {services[3].tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-white text-neutral-700 text-[10px] font-semibold shadow-sm">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== DESKTOP: Original 4 sections ===== */}
      {services.map((s, idx) => (
        <section key={idx} className={`hidden md:block py-32 px-6 ${s.bgSection}`}>
          <div className={`max-w-7xl mx-auto flex flex-col ${s.dir} items-center gap-16`}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="flex-1 relative h-[500px] w-full rounded-[40px] shadow-2xl overflow-hidden group border border-neutral-200">
               <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               {idx === 0 && <><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><div className="absolute bottom-8 left-8 text-white"><Search size={40} className="mb-4 text-emerald-400"/><div className="text-2xl font-bold">Top 1 Google</div></div></>}
               {idx === 1 && <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />}
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex-1">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${s.badgeBg} ${s.badgeText} font-bold mb-6`}><s.icon size={18} /> {s.label}</div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6">{s.title.split(',').join('.<br/>')}</h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">{idx === 0 ? 'Nguồn khách hàng miễn phí và bền vững nhất đến từ Google. Chúng tôi cung cấp giải pháp SEO tổng thể, bao vây thị trường bằng nội dung chất lượng cao và backlink uy tín.' : idx === 1 ? 'Triển khai chiến dịch Paid Ads quy mô lớn trên Meta (Facebook, Instagram), Google (Search, Display, Shopping) và TikTok. Tối ưu liên tục dựa trên CPA và ROAS mục tiêu.' : idx === 2 ? 'Xây dựng cộng đồng trung thành bằng những nội dung mang tính giải trí, giáo dục và có sức lan tỏa (Viral). Chúng tôi quản trị toàn diện hệ thống Fanpage, TikTok channel của bạn.' : 'Thiết lập luồng (flow) Email & SMS tự động, nuôi dưỡng Leads đến khi họ sẵn sàng mua hàng. Biến khách hàng cũ thành những người ủng hộ trung thành nhất.'}</p>
              <ul className="space-y-4">
                 {s.features.map((l, i) => <li key={i} className="flex items-center gap-3 text-neutral-800 font-medium"><CheckCircle2 className={s.checkColor} size={20}/> {l}</li>)}
              </ul>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
