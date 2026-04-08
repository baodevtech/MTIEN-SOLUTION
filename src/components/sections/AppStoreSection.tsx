'use client';

import { motion } from 'motion/react';
import { 
  ArrowRight, MessageCircle, Award, Gift, BarChart3, 
  AppWindow, Zap, Layers, Sparkles, ShoppingBag, Globe, Shield, CreditCard,
  CheckCircle2, TrendingUp, Cpu, MousePointer2
} from 'lucide-react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const apps = [
  { icon: MessageCircle, name: 'Messenger AI', tag: 'Hot', color: 'from-blue-500 to-cyan-400', size: 'large', desc: 'Tự động hóa CSKH 24/7 với trí tuệ nhân tạo.' },
  { icon: ShoppingBag, name: 'Smart Checkout', color: 'from-indigo-500 to-blue-600', size: 'medium', desc: 'Tối ưu luồng thanh toán.' },
  { icon: Shield, name: 'Security Pro', color: 'from-slate-800 to-slate-900', size: 'small' },
  { icon: Globe, name: 'Global Connect', color: 'from-sky-400 to-blue-500', size: 'small' },
  { icon: BarChart3, name: 'Analytics', color: 'from-violet-600 to-purple-500', size: 'medium', desc: 'Báo cáo ROI & Traffic thời gian thực.' },
  { icon: CreditCard, name: 'E-Invoice', color: 'from-amber-500 to-orange-400', size: 'small' },
  { icon: Zap, name: 'Turbo Speed', color: 'from-emerald-500 to-teal-400', size: 'small' },
  { icon: Layers, name: 'Sync Hub', color: 'from-blue-600 to-indigo-600', size: 'small' },
];

export default function AppStoreRedesign() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#FBFBFC] pt-6 md:pt-45 pb-16 md:pb-16 relative mt-0 md:-mt-35 z-10 border-y border-slate-200/60 overflow-hidden font-sans md:min-h-[80vh] flex items-center" aria-label="Hệ sinh thái ứng dụng">
      
      {/* Background Cinematic Texture & Lights */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      )}

      <div className="max-w-[1260px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-16 items-center">
          
          {/* Cột Trái: High-Density Bento Gallery */}
          <div className="md:col-span-6 flex flex-col order-2 md:order-1">
            <header className="hidden md:block mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white shadow-sm border border-slate-100 rounded-full text-blue-600 text-[11px] font-bold mb-4 uppercase tracking-widest">
                <Cpu size={12} /> <span>Hệ sinh thái MTIEN SOLUTION</span>
              </div>
              <h2 className="text-5xl font-bold text-slate-900 tracking-tighter leading-[1.1] mb-4">
                Mở rộng sức mạnh. <br/>
                <span className="text-slate-400">Không giới hạn tính năng.</span>
              </h2>
            </header>

            {/* Bento Grid: Optimized for High Density */}
            <div className="grid grid-cols-4 gap-2.5 md:gap-3 auto-rows-[80px] md:auto-rows-[105px]">
              {apps.map((app, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 0.99 }}
                  className={`
                    relative rounded-[1.2rem] md:rounded-[1.8rem] p-3 md:p-4 flex flex-col overflow-hidden group border border-white bg-white/70 backdrop-blur-xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]
                    ${app.size === 'large' ? 'col-span-2 row-span-2' : ''}
                    ${app.size === 'medium' ? 'col-span-2 row-span-1' : ''}
                    ${app.size === 'small' ? 'col-span-1 row-span-1' : ''}
                  `}
                >
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <div className={`w-7 h-7 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/10`}>
                      <app.icon size={14} strokeWidth={2.5} className="md:hidden" />
                      <app.icon size={18} strokeWidth={2.5} className="hidden md:block" />
                    </div>
                    {app.tag && <span className="text-[8px] md:text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 md:px-2 py-0.5 rounded-full uppercase tracking-tighter">{app.tag}</span>}
                  </div>
                  
                  <div className="mt-auto">
                    <h4 className="font-bold text-slate-900 text-[11px] md:text-[13px] tracking-tight">{app.name}</h4>
                    {app.desc && <p className="text-[9px] md:text-[11px] text-slate-400 mt-0.5 md:mt-1 line-clamp-1 font-medium">{app.desc}</p>}
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-[0.02] transition-opacity`} />
                </motion.div>
              ))}
              
              {/* Special CTA Bento Card */}
              <div className="col-span-2 row-span-1 bg-slate-900 rounded-[1.2rem] md:rounded-[1.8rem] p-3 md:p-5 flex items-center justify-between group cursor-pointer hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
                 <div className="flex flex-col">
                    <span className="text-white font-bold text-xs md:text-sm tracking-tight">Khám phá 100+</span>
                    <span className="text-white/50 text-[8px] md:text-[10px] font-medium">Tiện ích tích hợp sẵn</span>
                 </div>
                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                   <ArrowRight size={16} />
                 </div>
              </div>
            </div>
          </div>

          {/* Cột Phải: Apple Studio Display (Cinema Visual) */}
          <div className="md:col-span-6 relative order-1 md:order-2 flex items-center">
            
            {/* Mobile: unified rounded card wrapping image + text */}
            <div className="w-full rounded-[2rem] md:rounded-none overflow-hidden relative md:h-[400px] lg:h-[500px] md:overflow-visible">

              {/* Mockup + floating data wrapper */}
              <div className="relative md:h-full flex items-center">

            {/* Mobile Text Overlay — inside image */}
            <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-6 pt-24 bg-gradient-to-t from-black/70 via-black/40 to-transparent md:hidden">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] font-bold mb-3 uppercase tracking-widest">
                <Cpu size={11} /> <span>Hệ sinh thái</span>
              </div>
              <h2 className="text-[28px] font-bold text-white tracking-tight leading-[1.08]">
                Mở rộng sức mạnh.<br/>
                <span className="text-white/60">Không giới hạn.</span>
              </h2>
            </div>

            {/* Professional Floating Data */}
            {!reduced && (
              <>
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-10 right-0 z-30 bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-white items-center gap-3 ring-1 ring-black/5 hidden md:flex"
                >
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white"><CheckCircle2 size={16}/></div>
                   <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
                      <p className="text-xs font-black text-slate-900">Verified App</p>
                   </div>
                </motion.div>

                <motion.div 
                  animate={{ x: [0, 8, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-10 -left-8 z-30 bg-white/95 backdrop-blur-xl p-4 rounded-[1.8rem] shadow-2xl border border-white items-center gap-4 min-w-[180px] ring-1 ring-black/5 hidden md:flex"
                >
                   <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><TrendingUp size={20} /></div>
                   <div className="space-y-0.5">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Efficiency</p>
                      <p className="text-lg font-black text-slate-900">+85% <span className="text-[10px] text-emerald-500 font-bold">UP</span></p>
                   </div>
                </motion.div>
              </>
            )}

            {/* Apple Studio Display Mockup */}
            <div className="relative w-full h-[320px] md:h-auto md:aspect-[4/3] bg-[#E8E8ED] rounded-none md:rounded-[3.5rem] p-0 md:p-2.5 shadow-none md:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border-0 md:border md:border-slate-300 md:ring-1 md:ring-white/50 overflow-hidden">
               <div className="w-full h-full bg-[#1D1D1F] rounded-[1.8rem] md:rounded-[3rem] p-1 md:p-1.5 overflow-hidden relative shadow-inner">
                  
                  {/* Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 z-20 pointer-events-none" />

                  <div className="w-full h-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner">
                    <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/5" />
                         <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/5" />
                         <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/5" />
                       </div>
                       <div className="bg-slate-200/50 rounded-full px-12 py-1 text-[9px] text-slate-400 font-bold tracking-tight">mtiensolution.vn/apps</div>
                       <div className="w-10" />
                    </div>
                    
                    <div className="flex-1 relative bg-slate-50">
                       <Image 
                        src="https://picsum.photos/seed/apple_bento_pro/1200/900" 
                        alt="App Interface" 
                        fill 
                        className="object-cover object-top opacity-95 transition-all duration-[4s] hover:scale-105" 
                        priority 
                       />
                       {/* Overlay Gradient for depth inside mockup */}
                       <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
               </div>
               
               {/* Stand Shadow Underneath */}
               <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[70%] h-10 bg-blue-900/5 blur-3xl rounded-full -z-10 hidden md:block" />
            </div>
              </div>{/* end mockup + floating wrapper */}
            </div>{/* end unified rounded card */}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-12 pt-5 md:pt-8 border-t border-slate-200/60 flex items-center justify-between gap-4">
           <div className="flex items-center gap-2 md:gap-8 text-[10px] md:text-[11px] font-semibold md:font-black text-slate-400 md:text-slate-900 md:grayscale md:opacity-40 md:hover:opacity-100 md:transition-all md:duration-700 overflow-x-auto scrollbar-hide md:uppercase md:tracking-widest">
              {['Google Partner', 'Meta Business', 'TikTok Agency', 'GHN Delivery', 'Visa Secured'].map((brand, i) => (
                <span key={brand} className="whitespace-nowrap flex items-center gap-2">
                  {i > 0 && <span className="w-0.5 h-0.5 md:w-0 md:h-0 rounded-full bg-slate-300 shrink-0" aria-hidden="true"></span>}
                  {brand}
                </span>
              ))}
           </div>
           <button className="shrink-0 text-blue-600 font-semibold text-[12px] md:text-sm hover:text-blue-700 transition-colors inline-flex items-center gap-1">
              Dùng thử <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </section>
  );
}