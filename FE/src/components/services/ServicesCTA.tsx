'use client';

import { motion } from 'motion/react';
import { CheckCircle2, PhoneCall } from 'lucide-react';

/**
 * ServicesCTA - Phần kêu gọi hành động kiểu Apple tối giản
 * Bao gồm ô nhập số điện thoại và nút "Gọi lại cho tôi" cùng các cam kết tư vấn.
 */
export default function ServicesCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#FBFBFD] relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1D1D1F] tracking-tight leading-tight mb-4">
              Bạn cần giải pháp gì? <br/>
              <span className="text-[#86868B]">Hãy để chúng tôi lo.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#86868B] mb-10 font-medium">
              Điền thông tin hoặc liên hệ trực tiếp. Chuyên gia của MTIEN SOLUTION sẽ gọi lại trong <strong className="text-slate-900">5 phút</strong>.
            </p>

            <div className="relative max-w-lg mx-auto bg-white p-1.5 rounded-full shadow-sm border border-slate-200 focus-within:border-[#0066FF] focus-within:ring-4 focus-within:ring-blue-50 transition-all flex items-center">
              <input 
                type="text" 
                placeholder="Nhập số điện thoại của bạn..." 
                className="flex-1 bg-transparent px-6 py-3 text-[15px] outline-none placeholder:text-slate-400 font-medium"
              />
              <button className="bg-[#0066FF] hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-[14px] transition-colors flex items-center gap-2 whitespace-nowrap shadow-md">
                Gọi lại cho tôi <PhoneCall size={16} />
              </button>
            </div>
            
            <div className="mt-6 flex justify-center gap-4 text-[12px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#00D68F]" /> Tư vấn miễn phí</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#00D68F]" /> Khảo sát tận nơi</span>
            </div>
          </motion.div>
        </div>
      </section>
  );
}
