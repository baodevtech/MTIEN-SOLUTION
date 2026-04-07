'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HelpCircle, Search, Command, PhoneCall, Mail, MessageSquare, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const faqs = [
  { question: 'Thiết kế web là gì?', answer: 'Thiết kế web là công việc tạo ra một trang web cho cá nhân, công ty, doanh nghiệp hoặc tổ chức. Có 2 phương thức chính để thiết kế web đó là thiết kế web tĩnh và thiết kế web động.' },
  { question: 'Thiết kế website có những dạng nào?', answer: 'Có nhiều dạng website như web bán hàng, web doanh nghiệp, landing page, blog, v.v.' },
  { question: 'Giá thiết kế website là bao nhiêu?', answer: 'Giá thiết kế website phụ thuộc vào yêu cầu tính năng và giao diện cụ thể của bạn.' },
  { question: 'Thiết kế trang web có tùy chỉnh được không?', answer: 'Có, bạn hoàn toàn có thể tùy chỉnh giao diện và tính năng theo ý muốn.' },
  { question: 'Có được dùng thử web trước khi dùng không?', answer: 'MTIEN SOLUTION cung cấp 7 ngày dùng thử miễn phí để bạn trải nghiệm dịch vụ.' },
  { question: 'Thiết kế website có chịu thuế GTGT không?', answer: 'Dịch vụ phần mềm và thiết kế website thường thuộc đối tượng không chịu thuế GTGT hoặc thuế suất 0% tùy quy định.' },
];

export default function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section className="py-8 md:py-32 bg-[#F8FAFC] relative overflow-hidden" aria-label="Câu hỏi thường gặp">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 text-[11px] md:text-[12px] font-bold mb-3 md:mb-6 w-fit">
              <HelpCircle size={12} className="text-[#0066FF]" aria-hidden="true" />
              <span className="uppercase tracking-wider">Trung tâm trợ giúp</span>
            </div>

            <h2 className="text-[20px] md:text-[44px] font-black text-slate-900 leading-[1.15] tracking-tight mb-2 md:mb-4">
              Giải đáp nhanh <br className="hidden md:block" /><span className="text-[#0066FF]">mọi thắc mắc</span>
            </h2>

            <p className="text-slate-500 text-[12px] md:text-[16px] leading-relaxed mb-3 md:mb-8 hidden md:block">
              Tìm hiểu chi tiết về quy trình triển khai, tính năng nền tảng và chính sách hỗ trợ.
            </p>

            {/* Search — hidden on mobile */}
            <div className="hidden md:block relative group mb-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
              <input type="text" placeholder="Nhập từ khóa cần tìm..." className="w-full bg-white border border-slate-200 focus:border-[#0066FF] focus:ring-4 focus:ring-blue-50 rounded-xl py-3.5 pl-12 pr-16 text-[15px] outline-none shadow-sm" aria-label="Tìm kiếm câu hỏi" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1.5 rounded border border-slate-200" aria-hidden="true">
                <Command size={12} /> K
              </div>
            </div>

            {/* Helpdesk Card — hidden on mobile to save space */}
            <div className="hidden md:block bg-white rounded-xl md:rounded-[24px] p-5 md:p-8 shadow-sm md:shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100">
              <div className="flex -space-x-2 md:-space-x-3 mb-4 md:mb-6">
                {[1, 2, 3].map((avatar) => (
                  <div key={avatar} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative shadow-sm">
                    <Image src={`https://i.pravatar.cc/100?img=${avatar + 30}`} alt="Nhân viên hỗ trợ" fill className="object-cover" sizes="48px" />
                  </div>
                ))}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-blue-50 text-[#0066FF] flex items-center justify-center text-[10px] font-bold shadow-sm z-10">
                  <MessageSquare size={14} aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-[15px] md:text-lg mb-1 md:mb-2">Vẫn cần hỗ trợ thêm?</h3>
              <p className="text-slate-500 text-[13px] md:text-[14px] mb-4 md:mb-6">Đội ngũ chuyên gia sẵn sàng tư vấn 1:1.</p>
              <div className="flex flex-col gap-1.5 md:gap-2">
                <button className="w-full bg-slate-900 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-[13px] md:text-[14px] flex items-center justify-center gap-1.5 md:gap-2">
                  <PhoneCall size={14} aria-hidden="true" /> Hotline: 1900 xxxx
                </button>
                <button className="w-full bg-slate-50 text-slate-700 border border-slate-200 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-[13px] md:text-[14px] flex items-center justify-center gap-1.5 md:gap-2">
                  <Mail size={14} className="text-slate-400" aria-hidden="true" /> Gửi yêu cầu qua Email
                </button>
              </div>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-7 pt-2 lg:pt-0">
            <div className="space-y-2 md:space-y-4" role="region" aria-label="Danh sách câu hỏi thường gặp">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`group bg-white rounded-xl md:rounded-[20px] transition-all duration-300 border ${activeFaq === idx ? 'border-[#0066FF] shadow-md md:shadow-[0_10px_40px_rgba(0,102,255,0.08)] relative z-10' : 'border-slate-200 shadow-sm'}`}>
                  <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full px-4 py-3 md:px-8 md:py-6 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg md:rounded-[20px]" aria-expanded={activeFaq === idx} aria-controls={`faq-answer-${idx}`}>
                    <span className={`font-bold text-[13px] md:text-[18px] pr-2 md:pr-6 transition-colors ${activeFaq === idx ? 'text-[#0066FF]' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${activeFaq === idx ? 'bg-[#0066FF] text-white' : 'bg-slate-50 text-slate-400'}`} aria-hidden="true">
                      {activeFaq === idx ? <Minus size={12} strokeWidth={2.5} /> : <Plus size={12} strokeWidth={2.5} />}
                    </div>
                  </button>
                  {reduced ? (
                    activeFaq === idx && (
                      <div id={`faq-answer-${idx}`} role="region">
                        <div className="px-4 md:px-8 pb-3 md:pb-8 pt-0.5 md:pt-1">
                          <div className="w-full h-px bg-slate-100 mb-4 md:mb-6" aria-hidden="true"></div>
                          <p className="text-slate-600 text-[14px] md:text-[16px] leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div id={`faq-answer-${idx}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden" role="region">
                          <div className="px-4 md:px-8 pb-3 md:pb-8 pt-0.5 md:pt-2">
                            <div className="w-full h-px bg-gradient-to-r from-slate-100 via-slate-200 to-transparent mb-4 md:mb-6" aria-hidden="true"></div>
                            <p className="text-slate-600 text-[14px] md:text-[16px] leading-relaxed">{faq.answer}</p>
                            <div className="mt-4 md:mt-8 hidden md:flex flex-row items-center justify-between gap-4 pt-4 border-t border-slate-50">
                              <span className="text-[13px] font-medium text-slate-400">Câu trả lời này có hữu ích không?</span>
                              <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-500 text-[12px] font-bold border border-slate-100">👍 Có</button>
                                <button className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-500 text-[12px] font-bold border border-slate-100">👎 Không</button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
