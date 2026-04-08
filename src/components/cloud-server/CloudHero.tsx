'use client';

/**
 * CloudHero - Phần hero banner chính của trang Cloud Server.
 * Bao gồm tiêu đề "Kiến tạo sức mạnh", badge trạng thái Live,
 * mô tả dịch vụ, các nút CTA và thanh chỉ số tin cậy (Uptime, Speed, Security, Support).
 */

import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Activity, Command, LifeBuoy } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function CloudHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-24 pb-10 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/50">
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

  <div className="max-w-[1200px] mx-auto px-5 md:px-6 relative z-10 flex flex-col items-center text-center">
    
    {/* 2. Badge - Thêm hiệu ứng nhấp nháy (Ping) thể hiện trạng thái Live */}
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2.5 px-3 md:px-4 py-1.5 md:py-2 bg-white/50 backdrop-blur-md rounded-full text-blue-700 text-[11px] md:text-[13px] font-semibold mb-6 md:mb-8 shadow-sm border border-white/80 ring-1 ring-slate-900/5 hover:bg-white/80 transition-colors">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
      </span>
      Hệ sinh thái Cloud (IaaS)
    </motion.div>
    
    {/* 3. Heading - Chữ đậm hơn, khoảng cách chật lại, màu gradient sâu hơn */}
   <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[32px] md:text-6xl lg:text-[76px] font-extrabold text-slate-900 tracking-[-0.04em] leading-[1.05] mb-4 md:mb-6">
  Kiến tạo sức mạnh. <br className="hidden md:block"/>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Công nghệ cốt lõi.</span>
</motion.h1>
    {/* 4. Description - Làm nổi bật key value "30 giây" */}
    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-500 text-[15px] md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
      Khởi tạo Server chuyên nghiệp chỉ trong <strong className="text-slate-800 font-semibold">30 giây</strong>. Sử dụng 100% ổ cứng NVMe Enterprise và chip Intel Xeon. Tốc độ vượt trội, ổn định tuyệt đối.
    </motion.p>
    
    {/* 5. Buttons - Hiệu ứng Hover mượt mà */}
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-row justify-center gap-3 md:gap-4 w-full sm:w-auto mb-10 md:mb-20">
      <button className="group relative bg-[#111113] hover:bg-black text-white rounded-full px-5 md:px-8 py-3 md:py-4 font-semibold text-[13px] md:text-[15px] transition-all flex items-center justify-center gap-2 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 flex items-center gap-1.5 md:gap-2">Khởi tạo Server <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" /></span>
      </button>
      <button className="bg-white/60 hover:bg-white backdrop-blur-md text-slate-700 rounded-full px-5 md:px-8 py-3 md:py-4 font-semibold text-[13px] md:text-[15px] transition-all shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-white ring-1 ring-slate-900/5 flex items-center justify-center gap-1.5 md:gap-2">
        <Command size={16} className="text-slate-400 md:w-[18px] md:h-[18px]"/> Thông số
      </button>
    </motion.div>

    {/* 6. Floating Trust Metrics - Thiết kế dạng "Đảo" (Island) cao cấp */}
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full max-w-4xl relative">
      {/* Lớp ánh sáng (Glow) mờ phía sau box */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 blur-3xl rounded-full" />
      
      {/* Box chính */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50 rounded-2xl md:rounded-3xl p-1.5 md:p-2 grid grid-cols-2 sm:grid-cols-4 sm:divide-x divide-slate-200/50">
        {[
          { i: Activity, t: "Uptime SLA", d: "99.99%" },
          { i: Zap, t: "Deploy", d: "< 30s" },
          { i: Shield, t: "Bảo mật", d: "Anti-DDoS" },
          { i: LifeBuoy, t: "Support", d: "24/7 Local" }
        ].map((m, i) => (
          <div key={i} className="group flex items-center gap-2.5 md:gap-4 px-3 md:px-6 py-2.5 md:py-4 hover:bg-white/60 transition-colors rounded-xl md:rounded-2xl cursor-default">
            <div className="w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-white to-blue-50/50 flex items-center justify-center text-blue-600 shadow-sm border border-white group-hover:scale-110 transition-transform duration-300">
              <m.i size={16} strokeWidth={2} className="md:w-5 md:h-5"/>
            </div>
            <div className="text-left min-w-0">
              <p className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 truncate">{m.t}</p>
              <p className="text-[13px] md:text-base font-extrabold text-slate-800">{m.d}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
    
  </div>
</section>
  );
}
