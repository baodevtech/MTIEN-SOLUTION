'use client';

/**
 * EnterpriseTrust - Thanh tin nhiệm doanh nghiệp.
 * Hiển thị danh sách đối tác (marquee vô hạn) và các chứng chỉ bảo mật
 * (ISO 27001, Tier III, PCI-DSS, GDPR) dưới dạng badge card.
 */

import { motion } from 'motion/react';
import { Award, Building2, ShieldCheck, Server, Lock, Fingerprint } from 'lucide-react';

const complianceBadges = [
  { icon: ShieldCheck, title: 'ISO/IEC 27001', desc: 'Hệ thống Quản lý An toàn Thông tin.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: Server, title: 'Tier III Data Center', desc: 'Hạ tầng máy chủ đạt chuẩn Uptime Institute.', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { icon: Lock, title: 'PCI-DSS Compliant', desc: 'Bảo mật tuyệt đối dữ liệu thanh toán.', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Fingerprint, title: 'GDPR Ready', desc: 'Tuân thủ nghiêm ngặt bảo vệ quyền riêng tư.', color: 'text-slate-700', bg: 'bg-slate-500/10' }
];

const partnerLogos = [
  "Techcombank", "VNG Corp", "Shopee", "FPT Software", 
  "MoMo", "Tiki", "Gojek", "Vinhomes", "ZaloPay", "VNPay"
];

export default function EnterpriseTrust() {
  return (
    <section className="py-12 md:py-24 bg-white relative z-20 overflow-hidden border-b border-slate-200/50">
        <div className="max-w-[1260px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-slate-600 text-[11px] font-bold mb-6 border border-slate-200 uppercase tracking-widest">
              <Award size={14} className="text-blue-500"/> Bảo chứng doanh nghiệp
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[40px] font-bold text-slate-900 tracking-tighter mb-4 leading-tight">
              Sự lựa chọn tin cậy của các <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">tập đoàn công nghệ hàng đầu.</span>
            </motion.h2>
          </div>

          {/* Infinite Marquee Logos */}
          <div className="relative w-full overflow-hidden mb-12 md:mb-24 flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }} className="flex whitespace-nowrap gap-10 md:gap-20 items-center w-max">
              {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-3 text-slate-300 hover:text-slate-900 transition-all duration-300 grayscale hover:grayscale-0 cursor-default">
                  <Building2 size={24} strokeWidth={1.5} className="md:w-8 md:h-8" />
                  <span className="text-lg md:text-2xl font-black tracking-tighter">{logo}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Compliance Badges */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {complianceBadges.map((badge, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-slate-50/50 backdrop-blur-xl border border-slate-200/60 rounded-2xl md:rounded-[2rem] p-4 md:p-8 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 group">
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${badge.bg} ${badge.color} flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white`}><badge.icon size={20} strokeWidth={2} className="md:w-[26px] md:h-[26px]" /></div>
                <h3 className="text-[14px] md:text-[18px] font-bold text-slate-900 tracking-tight mb-1 md:mb-2">{badge.title}</h3>
                <p className="text-[12px] md:text-[14px] text-slate-500 font-medium leading-relaxed">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}
