'use client';

/**
 * HardwareSpecs - Phần thông số phần cứng cấp doanh nghiệp.
 * Hiển thị 4 card trên nền tối: CPU (Intel Xeon / AMD EPYC),
 * RAM (DDR4/DDR5 ECC), NVMe Enterprise, và Network 10Gbps.
 */

import { Cpu, Database, HardDrive, Network } from 'lucide-react';

export default function HardwareSpecs() {
  return (
    <section className="py-12 md:py-24 bg-[#0A0D14] text-white relative z-20 overflow-hidden mx-3 lg:mx-8 my-6 md:my-10 rounded-[2rem] md:rounded-[3.5rem] shadow-2xl">
        <div className="absolute inset-0 opacity-[0.04] hidden md:block" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="mb-8 md:mb-16 text-center max-w-2xl mx-auto">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-blue-300 text-[11px] font-bold mb-6 border border-white/10 uppercase tracking-widest">
               <Cpu size={14} /> Cấu hình vật lý
             </div>
            <h2 className="text-[26px] md:text-[44px] font-bold tracking-tighter mb-4 leading-tight">Phần cứng máy chủ.<br/><span className="text-slate-400">Đích thực và nguyên bản.</span></h2>
            <p className="text-slate-400 font-medium text-[14px] md:text-[16px] leading-relaxed">Cam kết tài nguyên 100% Dedicated. Không over-sell. Trải nghiệm sức mạnh từ bộ vi xử lý và hệ thống lưu trữ Enterprise hàng đầu thế giới.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
             {[
               { icon: Cpu, t: 'Vi Xử Lý (CPU)', d: 'Dual Intel Xeon Platinum / AMD EPYC. Xung nhịp tới 3.5GHz.' },
               { icon: Database, t: 'Bộ Nhớ (RAM)', d: 'DDR4 / DDR5 ECC Registered. Tự sửa lỗi bit nhị phân.' },
               { icon: HardDrive, t: 'Lưu Trữ NVMe', d: 'Enterprise SSDs. Cấu hình RAID-10 đảm bảo an toàn.' },
               { icon: Network, t: '10 Gbps Network', d: 'Card mạng LACP. Băng thông rộng không nghẽn cổ chai.' }
             ].map((s, i) => (
               <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-2xl md:rounded-[2rem] hover:bg-white/[0.06] transition-colors group">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[1rem] bg-blue-500/20 flex items-center justify-center text-blue-400 mb-3 md:mb-6 group-hover:scale-110 transition-transform"><s.icon size={18} className="md:w-[22px] md:h-[22px]" /></div>
                 <p className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 tracking-tight">{s.t}</p>
                 <p className="text-[12px] md:text-[14px] text-slate-400 leading-relaxed font-medium">{s.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
  );
}
