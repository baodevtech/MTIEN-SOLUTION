'use client';

import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

/**
 * ServicesHero - Phần hero banner xanh đậm với tiêu đề "Giải pháp số. Sức mạnh thật."
 * Bao gồm badge hệ sinh thái, hiệu ứng nền trang trí và mô tả tổng quan dịch vụ.
 */
export default function ServicesHero() {
  return (
    <section className="bg-[#001A5F] pt-28 pb-32 md:pb-48 relative z-10 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[150px] opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00D68F] rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-[11px] md:text-xs font-bold mb-6"
          >
            <Zap size={14} className="text-[#00D68F]" />
            <span className="uppercase tracking-wider">Hệ sinh thái công nghệ toàn diện</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[38px] md:text-[56px] lg:text-[64px] font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            Giải pháp số. <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-emerald-300">
              Sức mạnh thật.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100/80 text-[15px] md:text-[18px] max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Từ lập trình phần mềm, thiết kế thương hiệu, cung cấp máy chủ Cloud đến phân phối thiết bị IT. MTIEN SOLUTION cung cấp mọi mảnh ghép cho doanh nghiệp của bạn.
          </motion.p>
        </div>
      </section>
  );
}
