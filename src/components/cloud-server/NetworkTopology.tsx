'use client';

/**
 * NetworkTopology - Phần trực quan hóa mô hình mạng và hạ tầng.
 * Hiển thị bản đồ node trừu tượng với các điểm phát sáng (VNPT, Viettel IDC Core, FPT),
 * thông số Local Latency < 5ms và Network Capacity 4.2 Tbps trên nền tối cyberpunk.
 */

import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export default function NetworkTopology() {
  return (
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
  );
}
