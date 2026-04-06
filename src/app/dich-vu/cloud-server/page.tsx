'use client';

import { motion } from 'motion/react';
import { 
  ArrowRight, Shield, Zap, Globe, Cpu, Server, Activity, 
  CheckCircle2, Cloud, HardDrive, Command,
  Terminal, Network, Database, RefreshCcw, Clock, 
  Fingerprint, MonitorPlay, LifeBuoy, LineChart, Sparkles,
  ShieldCheck, Lock, Award, Building2, MapPin, Gauge, Headphones, Workflow,
  ArrowRightLeft
} from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// --- DATA MOCK ---
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

const pricingPlans = [
  { 
    name: 'Starter', price: '120', desc: 'Môi trường test, Web cá nhân', 
    specs: ['1 vCPU Core (Intel Xeon)', '2 GB ECC RAM', '30 GB NVMe Storage', 'Băng thông Unlimited', '1 IPv4 Dedicated'], pro: false 
  },
  { 
    name: 'Professional', price: '250', desc: 'Doanh nghiệp SMEs, Database', 
    specs: ['2 vCPU Cores (Intel Xeon)', '4 GB ECC RAM', '60 GB NVMe Storage', 'Băng thông Unlimited', 'Free Weekly Backup'], pro: true 
  },
  { 
    name: 'Business', price: '480', desc: 'E-commerce, Hệ thống chịu tải lớn', 
    specs: ['4 vCPU Cores (Intel Xeon)', '8 GB ECC RAM', '120 GB NVMe Storage', 'Băng thông Unlimited', 'Free Daily Backup'], pro: false 
  },
];

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

export default function UltimateCinematicCloud() {
  const reduced = useReducedMotion();

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans overflow-hidden selection:bg-blue-200">
      
      {/* ==========================================
          1. HERO SECTION
      ========================================== */}
       <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/50">
  {/* 1. Background Effects - Thêm Grid và Glow mờ */}
  {!reduced && (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply" />
      <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] bg-indigo-300/20 rounded-full blur-[100px] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      
      {/* Lớp gradient dưới cùng để mượt mà phần viền */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  )}

  <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
    
    {/* 2. Badge - Thêm hiệu ứng nhấp nháy (Ping) thể hiện trạng thái Live */}
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full text-blue-700 text-[13px] font-semibold mb-8 shadow-sm border border-white/80 ring-1 ring-slate-900/5 hover:bg-white/80 transition-colors">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
      </span>
      Hệ sinh thái Cloud (IaaS)
    </motion.div>
    
    {/* 3. Heading - Chữ đậm hơn, khoảng cách chật lại, màu gradient sâu hơn */}
   <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl lg:text-[76px] font-extrabold text-slate-900 tracking-[-0.04em] leading-[1.05] mb-6">
  Kiến tạo sức mạnh. <br className="hidden md:block"/>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Công nghệ cốt lõi.</span>
</motion.h1>
    {/* 4. Description - Làm nổi bật key value "30 giây" */}
    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-500 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
      Khởi tạo Server chuyên nghiệp chỉ trong <strong className="text-slate-800 font-semibold">30 giây</strong>. Sử dụng 100% ổ cứng NVMe Enterprise và chip Intel Xeon. Tốc độ vượt trội, ổn định tuyệt đối.
    </motion.p>
    
    {/* 5. Buttons - Hiệu ứng Hover mượt mà */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto mb-20">
      <button className="group relative bg-[#111113] hover:bg-black text-white rounded-full px-8 py-4 font-semibold text-[15px] transition-all flex items-center justify-center gap-2 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 flex items-center gap-2">Khởi tạo Server <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
      </button>
      <button className="bg-white/60 hover:bg-white backdrop-blur-md text-slate-700 rounded-full px-8 py-4 font-semibold text-[15px] transition-all shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-white ring-1 ring-slate-900/5 flex items-center justify-center gap-2">
        <Command size={18} className="text-slate-400"/> Thông số phần cứng
      </button>
    </motion.div>

    {/* 6. Floating Trust Metrics - Thiết kế dạng "Đảo" (Island) cao cấp */}
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full max-w-4xl relative">
      {/* Lớp ánh sáng (Glow) mờ phía sau box */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 blur-3xl rounded-full" />
      
      {/* Box chính */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-3xl p-2 flex flex-wrap justify-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/50">
        {[
          { i: Activity, t: "Uptime SLA", d: "99.99%" },
          { i: Zap, t: "Deploy Speed", d: "< 30s" },
          { i: Shield, t: "Bảo mật", d: "Anti-DDoS" },
          { i: LifeBuoy, t: "Support", d: "24/7 Local" }
        ].map((m, i) => (
          <div key={i} className="group flex items-center gap-4 px-6 py-4 w-full sm:w-auto hover:bg-white/60 transition-colors rounded-2xl cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-blue-50/50 flex items-center justify-center text-blue-600 shadow-sm border border-white group-hover:scale-110 transition-transform duration-300">
              <m.i size={20} strokeWidth={2}/>
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{m.t}</p>
              <p className="text-base font-extrabold text-slate-800">{m.d}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
    
  </div>
</section>

      {/* ==========================================
          2. ENTERPRISE TRUST (Ý TƯỞNG 1)
      ========================================== */}
      <section className="py-24 bg-white relative z-20 overflow-hidden border-b border-slate-200/50">
        <div className="max-w-[1260px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-slate-600 text-[11px] font-bold mb-6 border border-slate-200 uppercase tracking-widest">
              <Award size={14} className="text-blue-500"/> Bảo chứng doanh nghiệp
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl md:text-[40px] font-bold text-slate-900 tracking-tighter mb-4 leading-tight">
              Sự lựa chọn tin cậy của các <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">tập đoàn công nghệ hàng đầu.</span>
            </motion.h2>
          </div>

          {/* Infinite Marquee Logos */}
          <div className="relative w-full overflow-hidden mb-24 flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }} className="flex whitespace-nowrap gap-20 items-center w-max">
              {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-300 hover:text-slate-900 transition-all duration-300 grayscale hover:grayscale-0 cursor-default">
                  <Building2 size={32} strokeWidth={1.5} />
                  <span className="text-2xl font-black tracking-tighter">{logo}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Compliance Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-slate-50/50 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-8 hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${badge.bg} ${badge.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white`}><badge.icon size={26} strokeWidth={2} /></div>
                <h3 className="text-[18px] font-bold text-slate-900 tracking-tight mb-2">{badge.title}</h3>
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. BENTO CORE FEATURES
      ========================================== */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1260px] mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-[44px] font-bold text-slate-900 tracking-tighter mb-4 leading-tight">Mọi thông số. <br/><span className="text-slate-400">Đều được tối ưu hóa.</span></h2>
              <p className="text-slate-500 font-medium text-[16px] leading-relaxed">Sự minh bạch tuyệt đối về cấu hình phần cứng giúp hệ thống của bạn luôn vận hành ở hiệu năng đỉnh cao nhất.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bentoFeatures.map((feat, idx) => (
              <motion.div whileHover={{ y: -5 }} key={idx} className={`${feat.colSpan} bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group ring-1 ring-slate-900/5`}>
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-[1.2rem] bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg mb-6 ring-2 ring-white/60`}><feat.icon size={24} strokeWidth={2} /></div>
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

      {/* ==========================================
          4. CONTROL PANEL VIBE
      ========================================== */}
      <section className="py-24 bg-white border-y border-slate-200/60 relative z-20 overflow-hidden">
        {/* Nội dung giữ nguyên như cũ, tôi rút gọn bình luận để tập trung vào mã */}
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-slate-600 text-[11px] font-bold mb-6 border border-slate-200 uppercase tracking-widest w-max">
              <Sparkles size={14} className="text-blue-500"/> Giao diện quản trị (Panel)
            </div>
            <h2 className="text-[34px] md:text-[42px] font-bold text-slate-900 tracking-tighter leading-[1.1] mb-6">
              Làm chủ Server.<br/><span className="text-slate-400">Trực quan và mạnh mẽ.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-4">
               {[
                 { i: RefreshCcw, t: "Rebuild 1-Click", d: "Cài lại hệ điều hành nhanh chóng." },
                 { i: Terminal, t: "Web Console SSH", d: "Truy cập terminal ngay trên web." },
                 { i: LineChart, t: "Realtime Monitor", d: "Theo dõi CPU, RAM, Disk I/O." },
                 { i: Clock, t: "Auto Snapshots", d: "Sao lưu toàn bộ máy chủ." },
               ].map((feat, idx) => (
                 <div key={idx} className="flex flex-col gap-2">
                   <div className="w-10 h-10 rounded-[1rem] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm"><feat.i size={18}/></div>
                   <h4 className="font-bold text-slate-900 text-[15px] tracking-tight mt-1">{feat.t}</h4>
                   <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{feat.d}</p>
                 </div>
               ))}
            </div>
          </div>
          <div className="lg:col-span-7 relative h-[450px] lg:h-[600px] order-1 lg:order-2">
            <div className="absolute inset-0 bg-[#E8E8ED] rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-300 ring-1 ring-white/50 overflow-hidden flex flex-col">
               <div className="w-full h-full bg-[#1D1D1F] rounded-[3rem] p-1.5 overflow-hidden relative shadow-inner">
                 <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner">
                   <div className="h-10 w-full bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/5" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/5" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/5" />
                      </div>
                      <div className="bg-slate-200/50 rounded-full px-12 py-1 text-[9px] text-slate-400 font-bold tracking-tight">CLOUD.MTIENSOLUTION.VN</div>
                      <div className="w-10" />
                   </div>
                   <div className="flex-1 relative bg-slate-50/50">
                      <Image src="https://picsum.photos/seed/mac_dashboard_pro/1200/900" alt="Control Panel" fill className="object-cover object-top opacity-95" priority />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. HARDWARE SPECS 
      ========================================== */}
      <section className="py-24 bg-[#0A0D14] text-white relative z-20 overflow-hidden mx-4 lg:mx-8 my-10 rounded-[3.5rem] shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-300 text-[11px] font-bold mb-6 border border-white/10 uppercase tracking-widest">
               <Cpu size={14} /> Cấu hình vật lý
             </div>
            <h2 className="text-4xl md:text-[44px] font-bold tracking-tighter mb-4 leading-tight">Phần cứng máy chủ.<br/><span className="text-slate-400">Đích thực và nguyên bản.</span></h2>
            <p className="text-slate-400 font-medium text-[16px] leading-relaxed">Cam kết tài nguyên 100% Dedicated. Không over-sell. Trải nghiệm sức mạnh từ bộ vi xử lý và hệ thống lưu trữ Enterprise hàng đầu thế giới.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Cpu, t: 'Vi Xử Lý (CPU)', d: 'Dual Intel Xeon Platinum / AMD EPYC. Xung nhịp tới 3.5GHz.' },
               { icon: Database, t: 'Bộ Nhớ (RAM)', d: 'DDR4 / DDR5 ECC Registered. Tự sửa lỗi bit nhị phân.' },
               { icon: HardDrive, t: 'Lưu Trữ NVMe', d: 'Enterprise SSDs. Cấu hình RAID-10 đảm bảo an toàn.' },
               { icon: Network, t: '10 Gbps Network', d: 'Card mạng LACP. Băng thông rộng không nghẽn cổ chai.' }
             ].map((s, i) => (
               <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.06] transition-colors group">
                 <div className="w-12 h-12 rounded-[1rem] bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform"><s.icon size={22} /></div>
                 <p className="text-xl font-bold text-white mb-2 tracking-tight">{s.t}</p>
                 <p className="text-[14px] text-slate-400 leading-relaxed font-medium">{s.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. INFRASTRUCTURE & TOPOLOGY MAP (Ý TƯỞNG 2)
      ========================================== */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1260px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-[11px] font-bold mb-6 border border-blue-500/20 uppercase tracking-widest">
                <Globe size={14}/> Quy mô hạ tầng mạng
              </div>
              <h2 className="text-4xl md:text-[44px] font-bold text-white tracking-tighter leading-tight">Mạng lưới tốc độ cao.<br/><span className="text-slate-500">Độ trễ tiệm cận Zero.</span></h2>
            </div>
            
            <div className="flex gap-8">
              <div>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">Local Latency</p>
                <p className="text-4xl font-black text-white tracking-tighter">&lt; 5<span className="text-xl text-blue-500">ms</span></p>
              </div>
              <div>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-1">Network Capacity</p>
                <p className="text-4xl font-black text-white tracking-tighter">4.2<span className="text-xl text-emerald-500">Tbps</span></p>
              </div>
            </div>
          </div>

          {/* Abstract Node Map */}
          <div className="relative h-[400px] w-full rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden flex items-center justify-center">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
              <path d="M 200 200 Q 400 50 600 200 T 1000 200" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
              <path d="M 300 100 Q 500 300 800 150" fill="none" stroke="#6366f1" strokeWidth="2" className="opacity-50" />
            </svg>

            {/* Glowing Nodes */}
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[45%] left-[20%] flex flex-col items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_30px_10px_rgba(59,130,246,0.5)] border-2 border-white" />
              <span className="mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-md">VNPT Data Center</span>
            </motion.div>

            <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute top-[35%] left-[50%] flex flex-col items-center">
              <div className="w-6 h-6 bg-emerald-500 rounded-full shadow-[0_0_40px_15px_rgba(16,185,129,0.5)] border-2 border-white flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full animate-ping"/>
              </div>
              <span className="mt-2 text-[10px] font-bold text-white uppercase tracking-widest bg-emerald-500/20 border border-emerald-500/50 px-3 py-1 rounded-full backdrop-blur-md">Viettel IDC (Core)</span>
            </motion.div>

            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute top-[55%] right-[25%] flex flex-col items-center">
              <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_30px_10px_rgba(99,102,241,0.5)] border-2 border-white" />
              <span className="mt-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-md">FPT Tân Thuận</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. ZERO-DOWNTIME & WHITE-GLOVE SUPPORT (Ý TƯỞNG 3)
      ========================================== */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-[1260px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-emerald-600 text-[11px] font-bold mb-6 border border-emerald-200 uppercase tracking-widest">
                <Workflow size={14}/> Di dời hệ thống
              </div>
              <h2 className="text-4xl md:text-[44px] font-bold text-slate-900 tracking-tighter mb-6 leading-tight">Chuyển đổi dữ liệu.<br/><span className="text-slate-400">Không một giây gián đoạn.</span></h2>
              <p className="text-slate-500 text-[16px] font-medium leading-relaxed mb-10">Đội ngũ kỹ sư L2/L3 của chúng tôi sẽ trực tiếp lên phương án và thực hiện di dời toàn bộ dữ liệu từ nhà cung cấp cũ sang hệ thống mới một cách an toàn tuyệt đối (Zero-downtime).</p>
              
              <div className="space-y-6">
                 {[
                   { icon: Activity, title: "1. Khảo sát & Đánh giá", desc: "Phân tích kiến trúc hiện tại và lên kịch bản di dời." },
                   { icon: ArrowRightLeft, title: "2. Chuyển đổi dữ liệu", desc: "Đồng bộ hóa Database & Files ngầm mà không gây downtime." },
                   { icon: Gauge, title: "3. Tối ưu hiệu năng", desc: "Tinh chỉnh Kernel, Webserver (Nginx/LiteSpeed) & Caching." }
                 ].map((step, i) => (
                   <div key={i} className="flex gap-4 items-start group">
                     <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors shrink-0">
                       <step.icon size={20}/>
                     </div>
                     <div>
                       <h4 className="text-[16px] font-bold text-slate-900 tracking-tight mb-1">{step.title}</h4>
                       <p className="text-[14px] text-slate-500 font-medium">{step.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200/60 relative overflow-hidden">
                {/* Visual Graphic */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="w-16 h-16 rounded-[1.2rem] bg-white border border-slate-200 flex items-center justify-center text-emerald-500 shadow-xl mb-8"><Headphones size={32} strokeWidth={1.5}/></div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">NOC Support 24/7/365</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phản hồi Ticket</p>
                    <p className="text-2xl font-black text-slate-900">&lt; 15 Phút</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Mức độ hỗ trợ</p>
                    <p className="text-2xl font-black text-slate-900">Bậc L3</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm col-span-2 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bảo toàn dữ liệu</p>
                      <p className="text-2xl font-black text-slate-900">100% Cam kết</p>
                    </div>
                    <CheckCircle2 size={32} className="text-emerald-500 opacity-20"/>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ==========================================
          8. PRICING TIERS
      ========================================== */}
      <section className="py-20 relative z-20 bg-[#F8FAFC] border-t border-slate-200/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[44px] font-bold text-slate-900 tracking-tighter mb-4">Chi phí tối giản. <br/><span className="text-slate-400">Giá trị tối đa.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`rounded-[2.5rem] p-10 flex flex-col relative transition-all duration-500 ${plan.pro ? 'bg-[#1D1D1F] text-white shadow-2xl scale-105 border border-slate-800 z-10' : 'bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] text-slate-900 ring-1 ring-slate-900/5'}`}>
                {plan.pro && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Khuyên dùng</div>}
                <h3 className={`text-[22px] font-bold mb-2 tracking-tight ${plan.pro ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                <p className={`text-[13px] mb-8 font-medium ${plan.pro ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-slate-200/10">
                  <span className={`text-5xl font-black tracking-tighter ${plan.pro ? 'text-white' : 'text-slate-900'}`}>{plan.price}k</span>
                  <span className={`text-sm font-medium ${plan.pro ? 'text-slate-400' : 'text-slate-500'}`}>/ tháng</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.specs.map((spec, i) => (
                    <li key={i} className={`flex items-start gap-3 text-[13px] font-semibold tracking-tight ${plan.pro ? 'text-slate-300' : 'text-slate-600'}`}>
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${plan.pro ? 'text-blue-400' : 'text-blue-500'}`} strokeWidth={2.5}/> {spec}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-full font-bold text-[14px] transition-all ${plan.pro ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                  Khởi tạo ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          9. FINAL CTA
      ========================================== */}
      <section className="py-24 relative z-20 bg-[#F8FAFC]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] ring-1 ring-slate-900/5">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/20 mb-8"><Cloud size={32}/></div>
              <h2 className="text-4xl md:text-[56px] font-bold tracking-tighter mb-6 text-slate-900 leading-[1.1]">Sẵn sàng để đưa <br/>hệ thống lên Cloud?</h2>
              <p className="text-slate-500 text-[16px] mb-10 max-w-xl mx-auto font-medium">Khởi tạo và thiết lập máy chủ chuyên nghiệp chỉ với vài thao tác. Tận hưởng hiệu năng phần cứng đỉnh cao ngay hôm nay.</p>
              <button className="bg-[#1D1D1F] hover:bg-blue-600 text-white rounded-full px-10 py-4 font-bold text-[15px] transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 mx-auto">
                Tạo tài khoản miễn phí <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}