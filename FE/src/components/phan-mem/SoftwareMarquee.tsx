'use client';

/**
 * SoftwareMarquee - Banner cuộn vô hạn (infinite marquee/ticker)
 * Hiển thị danh sách dịch vụ chạy liên tục với hiệu ứng gradient text.
 */

import { motion } from 'motion/react';

export default function SoftwareMarquee() {
  return (
    <section className="bg-[#F4F7FF] py-[16px] md:py-[25px] overflow-hidden flex items-center border-y border-[#E8EDFA]">
      <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex whitespace-nowrap items-center min-w-max">
        {[1, 2, 3].map((set) => (
          <div key={set} className="flex items-center">
            {['Thiết Kế Website', 'Lập Trình App Mobile', 'Phần Mềm ERP', 'Kiểm Thử Phần Mềm', 'Bảo Mật Server'].map((text, idx) => (
              <div key={idx} className="flex items-center mx-[20px] md:mx-[40px] group">
                <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm3-icon1.png" alt="" className="w-[16px] h-[16px] md:w-[30px] md:h-[30px] mr-1.5 md:mr-4 group-hover:rotate-12 transition-transform" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#061153] to-[#061153] hover:from-[#1053F3] hover:to-[#5080FF] text-base md:text-4xl font-extrabold tracking-tight cursor-pointer transition-all duration-300" style={{ WebkitTextStroke: '1px #061153' }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
