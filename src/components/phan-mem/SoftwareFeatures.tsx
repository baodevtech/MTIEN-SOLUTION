'use client';

/**
 * SoftwareFeatures - Các khối tính năng nổi bật của dịch vụ phần mềm
 * Bao gồm bộ đếm số dự án, thông tin tư vấn & thiết kế, và chuyển đổi số.
 */

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const NumberCounter = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / to));
      const timer = setInterval(() => {
        start += Math.ceil(to / 100);
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default function SoftwareFeatures() {
  return (
    <section className="bg-[#F4F7FF] py-[120px]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0} viewport={{ once: true }} className="bg-white p-[40px] rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(16,83,243,0.1)] transition-all duration-500 border border-transparent hover:border-blue-50 group">
            <div className="flex items-center mb-[30px]">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((num) => (
                  <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="khach-hang" className="w-[52px] h-[52px] rounded-full border-4 border-white object-cover shadow-sm group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${num * 50}ms` }} />
                ))}
                <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#1053F3] to-blue-700 border-4 border-white flex items-center justify-center text-white font-bold text-sm z-10 relative shadow-md">
                  +500
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <h3 className="text-[50px] font-extrabold text-[#1053F3] leading-none tracking-tight drop-shadow-sm">
                <NumberCounter to={500} />+
              </h3>
              <motion.img animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/scribble.webp" className="w-[50px]" alt="shape" />
            </div>
            <p className="text-slate-500 text-base leading-relaxed mb-[30px]">Dự án phần mềm & web đã triển khai thành công.</p>
            <a href="#lien-he" className="inline-flex items-center justify-between w-full bg-[#061153] text-white px-[30px] py-[15px] rounded-full font-semibold hover:bg-[#1053F3] hover:shadow-[0_10px_20px_rgba(16,83,243,0.3)] transition-all duration-300 group/btn">
              <span className="relative overflow-hidden flex flex-col h-[24px]">
                <span className="group-hover/btn:-translate-y-full transition-transform duration-300">Nhận báo giá ngay</span>
                <span className="absolute top-full group-hover/btn:-translate-y-full transition-transform duration-300">Nhận báo giá ngay</span>
              </span>
              <span className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-[#1053F3] transition-colors shadow-sm">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </a>
          </motion.div>

          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true }} className="bg-white p-[40px] rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(16,83,243,0.1)] transition-all duration-500 relative group hover:-translate-y-2 border border-transparent hover:border-blue-50">
            <div className="absolute top-[40px] right-[40px]">
              <div className="w-[50px] h-[50px] rounded-full bg-[#F4F7FF] flex items-center justify-center text-[#061153] group-hover:bg-[#1053F3] group-hover:text-white transition-all duration-300 cursor-pointer">
                <ArrowRight size={18} strokeWidth={2.5} className="group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div className="mb-[40px]">
              <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon01.webp" alt="icon" className="h-[60px] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-[24px] font-extrabold text-[#061153] mb-4 leading-snug tracking-tight">Tư Vấn & Thiết Kế <br /> Kiến Trúc IT</h2>
            <p className="text-slate-500 leading-relaxed text-base">Phân tích quy trình kinh doanh, định hướng nền tảng công nghệ bền vững cho doanh nghiệp.</p>
          </motion.div>

          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true }} className="bg-gradient-to-br from-[#061153] to-blue-950 p-[40px] rounded-[30px] relative group hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_30px_rgba(6,17,83,0.2)] hover:shadow-[0_20px_40px_rgba(16,83,243,0.3)]">
            <div className="absolute top-[40px] right-[40px]">
              <div className="w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#1053F3] transition-all duration-300 cursor-pointer">
                <ArrowRight size={18} strokeWidth={2.5} className="group-hover:-rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <div className="mb-[40px]">
              <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon02.webp" alt="icon" className="h-[60px] brightness-0 invert group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h2 className="text-[24px] font-extrabold text-white mb-4 leading-snug tracking-tight">Chuyển Đổi Số & <br /> Tự Động Hóa</h2>
            <p className="text-blue-100/80 leading-relaxed text-base">Số hóa quy trình làm việc thủ công, nâng cao hiệu suất và bảo mật dữ liệu an toàn tuyệt đối.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
