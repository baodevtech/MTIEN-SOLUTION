'use client';

/**
 * SoftwareFAQ - Câu hỏi thường gặp với accordion tương tác
 * Bao gồm phần FAQ accordion (activeFaq state), thẻ hỗ trợ khách hàng,
 * và CTA section liên hệ ở cuối trang.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, MessageCircle, ChevronRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const fadeInRightBig = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay: typeof delay === 'number' ? delay : 0, ease: "easeInOut" as const } })
};

const faqs = [
  { question: "Thời gian hoàn thành một dự án website hoặc ứng dụng là bao lâu?", answer: "Thời gian triển khai phụ thuộc vào quy mô và độ phức tạp của dự án. Thông thường, một website cơ bản mất từ 2-4 tuần, trong khi hệ thống phần mềm có thể từ 2-6 tháng. Chúng tôi sẽ cung cấp tiến độ chi tiết sau khi khảo sát." },
  { question: "Công ty có hỗ trợ bảo hành và bảo trì sau khi bàn giao không?", answer: "Chắc chắn rồi! Tất cả các dự án đều được bảo hành miễn phí từ 6-12 tháng. Sau thời gian này, chúng tôi cung cấp các gói bảo trì server với chi phí tối ưu để hệ thống hoạt động ổn định 24/7." },
  { question: "Tôi có được sở hữu toàn bộ Source Code sau khi hoàn thành không?", answer: "Có. Sau khi dự án được nghiệm thu và thanh toán hoàn tất, chúng tôi sẽ bàn giao toàn bộ Source Code, tài liệu kỹ thuật và quyền quản trị cao nhất cho doanh nghiệp của bạn." },
  { question: "Chi phí xây dựng phần mềm được tính như thế nào?", answer: "Chi phí được tính dựa trên số lượng tính năng, nền tảng công nghệ và thời gian hoàn thành. Bạn có thể tham khảo các gói cơ bản ở trên, hoặc liên hệ trực tiếp để nhận báo giá thiết kế riêng." }
];

export default function SoftwareFAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <>
      {/* 6.5 FAQ SECTION - PREMIUM SAAS STYLE */}
      <section className="py-[50px] md:py-[80px] lg:py-[120px] bg-white relative overflow-hidden z-10 border-t border-[#E8EDFA]">
        
        {/* Background Mesh Decor */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#F4F7FF] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-5 md:px-6 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] md:gap-[50px] lg:gap-[80px] items-start">
            
            {/* LEFT COLUMN: Title & Support Card (Sticky) */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 lg:sticky lg:top-[120px]">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F7FF] border border-blue-100 shadow-sm mb-3 md:mb-5">
                <span className="text-[#1053F3] font-extrabold text-[10px] md:text-[11px] uppercase tracking-widest">Hỗ Trợ Khách Hàng</span>
              </div>
              
              <h2 className="text-[26px] md:text-3xl md:text-5xl font-extrabold text-[#061153] leading-[1.15] tracking-tight mb-4 md:mb-[24px]">
                Những Câu Hỏi <br /> Thường Gặp
              </h2>
              
              <p className="text-slate-500 text-[14px] md:text-[16px] leading-relaxed mb-6 md:mb-[40px] max-w-[90%]">
                Tìm hiểu thêm về quy trình làm việc, chính sách bảo hành và các dịch vụ đi kèm. Đội ngũ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
              </p>
              
              {/* Premium Support Card */}
              <div className="bg-gradient-to-br from-[#061153] to-[#18225F] rounded-2xl md:rounded-[24px] p-5 md:p-6 shadow-[0_20px_40px_rgba(6,17,83,0.15)] relative overflow-hidden border border-[#1053F3]/20 max-w-[360px]">
                {/* Glow effect inside card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1053F3]/40 rounded-full blur-2xl"></div>
                
                <h4 className="text-white font-bold text-[16px] md:text-[18px] mb-1.5 md:mb-2 relative z-10">Vẫn còn thắc mắc?</h4>
                <p className="text-blue-200/80 text-[13px] md:text-[14px] mb-4 md:mb-6 relative z-10 leading-relaxed">
                  Liên hệ trực tiếp với chuyên gia công nghệ của chúng tôi để được tư vấn 1:1.
                </p>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((num) => (
                      <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="team" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#061153] object-cover shadow-sm" />
                    ))}
                  </div>
                  
                  <a href="#lien-he" className="flex items-center gap-2 bg-[#1053F3] text-white px-5 py-2.5 rounded-full text-[13px] font-bold hover:bg-white hover:text-[#061153] transition-colors duration-300 shadow-md">
                    <MessageCircle size={16} /> Chat ngay
                  </a>
                </div>
              </div>

            </motion.div>

            {/* RIGHT COLUMN: Interactive Accordions */}
            <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7 space-y-3 md:space-y-[16px]">
              {faqs.map((faq, index) => {
                const isActive = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl md:rounded-[24px] overflow-hidden transition-all duration-300 border ${
                      isActive 
                        ? 'border-[#1053F3]/30 shadow-[0_15px_30px_rgba(16,83,243,0.08)] bg-[#F4F7FF]/50' 
                        : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm'
                    }`}
                  >
                    <button 
                      onClick={() => setActiveFaq(isActive ? null : index)} 
                      className="w-full text-left px-5 py-5 md:px-8 md:py-7 flex items-center justify-between focus:outline-none group"
                    >
                      <h4 className={`text-[14px] md:text-[16px] md:text-[18px] font-extrabold pr-4 md:pr-6 transition-colors duration-300 leading-snug tracking-tight ${isActive ? 'text-[#1053F3]' : 'text-[#061153] group-hover:text-[#1053F3]'}`}>
                        {faq.question}
                      </h4>
                      
                      {/* Interactive Plus Icon */}
                      <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border ${
                        isActive 
                          ? 'bg-[#1053F3] text-white border-[#1053F3] rotate-45' 
                          : 'bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-[#F4F7FF] group-hover:text-[#1053F3] group-hover:border-blue-100'
                      }`}>
                        <Plus size={20} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 md:px-8 md:pb-8 text-slate-500 text-[13px] md:text-[15px] leading-relaxed border-t border-blue-100/50 pt-4 md:pt-5 mt-1">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. COLLABORATE CTA SECTION - LIGHT MODE APPLE-LIKE */}
      <section id="lien-he" className="py-[50px] md:py-[80px] lg:py-[120px] bg-[#F8FAFC] relative overflow-hidden border-t border-[#E8EDFA]">
        
        {/* Background Ambient (Very subtle global glow) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#1053F3]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          
          <motion.div 
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="bg-white rounded-[28px] md:rounded-[40px] md:rounded-[64px] p-8 md:p-[50px] md:p-[80px] lg:p-[100px] relative overflow-hidden flex flex-col items-center text-center shadow-[0_20px_80px_rgba(6,17,83,0.04)] border border-[#E8EDFA]"
          >
            {/* Soft Monochromatic Inner Glows */}
            <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] bg-blue-50/60 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-[#1053F3]/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Minimalist Top Label */}
            <h4 className="text-[#1053F3] font-bold text-[11px] md:text-[13px] md:text-[14px] uppercase tracking-[0.15em] mb-3 md:mb-5 relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1053F3] animate-pulse"></span>
              Khởi tạo tương lai
            </h4>
            
            {/* Stark, Clean Headline */}
            <h2 className="text-[28px] md:text-[42px] md:text-[64px] lg:text-[80px] font-extrabold text-[#061153] mb-4 md:mb-6 leading-[1.05] tracking-tighter relative z-10">
              Sẵn Sàng Để <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1053F3] to-[#5080FF]">
                Chuyển Đổi Số.
              </span>
            </h2>
            
            {/* Clean Subtitle */}
            <p className="text-slate-500 text-[15px] md:text-[18px] md:text-[21px] leading-[1.6] max-w-2xl mb-8 md:mb-10 md:mb-12 font-medium relative z-10">
              Đội ngũ kỹ sư chuyên sâu của chúng tôi luôn sẵn sàng lắng nghe bài toán của bạn. Nhận bản phác thảo kiến trúc hệ thống và báo giá hoàn toàn miễn phí.
            </p>
            
            {/* Apple-style Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full relative z-10">
              
              {/* Primary CTA: Solid Brand Blue */}
              <a href="#lien-he" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1053F3] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-semibold text-[14px] md:text-[16px] md:text-[17px] hover:bg-[#061153] hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(16,83,243,0.25)] transition-all duration-300">
                Đăng ký tư vấn
              </a>

              {/* Secondary CTA: Soft Monochromatic Button with Chevron */}
              <a href="mailto:contact@yourdomain.com" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F4F7FF] text-[#061153] px-6 md:px-8 py-3.5 md:py-4 rounded-full font-semibold text-[14px] md:text-[16px] md:text-[17px] hover:bg-blue-50 hover:text-[#1053F3] transition-colors duration-300 group">
                Gửi email cho chúng tôi
                <ChevronRight size={18} className="ml-1 text-slate-400 group-hover:text-[#1053F3] group-hover:translate-x-1 transition-all" />
              </a>
              
            </div>
            
          </motion.div>
        </div>
      </section>
    </>
  );
}
