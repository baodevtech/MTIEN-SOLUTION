'use client';

/**
 * BentoFeatures - Lưới Bento hiển thị các tính năng cốt lõi của Cloud Server.
 * Bao gồm NVMe Gen 4, Anti-DDoS, Uptime 99.99% và Mạng lưới 10Gbps
 * với layout dạng bento grid (col-span khác nhau).
 */

import { motion } from 'motion/react';
import { HardDrive, Shield, Activity, Network, CheckCircle2 } from 'lucide-react';

const bentoFeatures = [
  {
    title: 'Lưu trữ NVMe Gen 4 Enterprise',
    desc: 'Hệ thống lưu trữ 100% NVMe chuẩn doanh nghiệp được thiết lập RAID-10.',
    icon: HardDrive,
    color: 'from-blue-500 to-cyan-400',
    colSpan: 'lg:col-span-2',
    specs: ['Tốc độ đọc/ghi 7,500 MB/s', 'IOPS lên đến 1.5 Triệu', 'Bảo vệ toàn vẹn dữ liệu (End-to-end)']
  },
  {
    title: 'Anti-DDoS Đa Tầng',
    desc: 'Firewall phần cứng cản lọc lưu lượng xấu chủ động.',
    icon: Shield,
    color: 'from-indigo-500 to-violet-400',
    colSpan: 'lg:col-span-1',
    specs: ['Bảo vệ L3/L4 & L7', 'Lọc traffic tới 2Tbps', 'Miễn phí WAF']
  },
  {
    title: 'Cam kết 99.99% Uptime',
    desc: 'Kiến trúc High Availability (HA) tự động failover.',
    icon: Activity,
    color: 'from-emerald-400 to-teal-400',
    colSpan: 'lg:col-span-1',
    specs: ['Tự động chuyển node < 3s', 'Redundant Power', 'Hoàn tiền SLA']
  },
  {
    title: 'Mạng lưới 10Gbps Uplink',
    desc: 'Cổng kết nối mạng nội bộ và quốc tế siêu tốc, không nghẽn cổ chai.',
    icon: Network,
    color: 'from-amber-400 to-orange-400',
    colSpan: 'lg:col-span-2',
    specs: ['Băng thông Unlimited', '1 IPv4 & IPv6 /64', 'Private Network 10Gbps']
  }
];

export default function BentoFeatures() {
  return (
    <section className="py-12 md:py-24 relative z-20">
        <div className="max-w-[1260px] mx-auto px-5 md:px-6">
          <div className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[26px] md:text-[44px] font-bold text-slate-900 tracking-tighter mb-3 md:mb-4 leading-tight">Mọi thông số. <br/><span className="text-slate-400">Đều được tối ưu hóa.</span></h2>
              <p className="text-slate-500 font-medium text-[14px] md:text-[16px] leading-relaxed">Sự minh bạch tuyệt đối về cấu hình phần cứng giúp hệ thống của bạn luôn vận hành ở hiệu năng đỉnh cao nhất.</p>
            </div>
          </div>
          
          {/* Mobile: compact horizontal cards */}
          <div className="md:hidden space-y-3">
            {bentoFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-2xl rounded-2xl p-4 border border-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5 flex items-start gap-4">
                <div className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg ring-2 ring-white/60`}><feat.icon size={18} strokeWidth={2} /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-slate-900 tracking-tight mb-0.5">{feat.title}</h3>
                  <p className="text-slate-500 font-medium text-[12px] leading-relaxed mb-2">{feat.desc}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {feat.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="flex items-center gap-1 text-[11px] font-bold text-slate-600 tracking-tight">
                        <CheckCircle2 size={12} className="text-blue-500 shrink-0" /> {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: bento grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, idx) => (
              <motion.div whileHover={{ y: -5 }} key={idx} className={`${feat.colSpan} bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group ring-1 ring-slate-900/5`}>
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-[1.2rem] bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg mb-6 ring-2 ring-white/60`}><feat.icon size={20} strokeWidth={2} /></div>
                  <div>
                    <h3 className="text-[22px] font-bold text-slate-900 tracking-tight mb-2">{feat.title}</h3>
                    <p className="text-slate-500 font-medium text-[14px] leading-relaxed mb-8">{feat.desc}</p>
                    <ul className="space-y-3 mt-auto pt-6 border-t border-slate-100">
                      {feat.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-[13px] font-bold text-slate-700 tracking-tight">
                           <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" /> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br ${feat.color} rounded-full blur-[80px] opacity-[0.08] pointer-events-none group-hover:opacity-20 transition-opacity duration-700`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}
