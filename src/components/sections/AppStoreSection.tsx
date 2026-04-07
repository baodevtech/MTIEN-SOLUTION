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
    <section className="bg-[#FBFBFC] py-8 md:py-16 relative z-20 border-y border-slate-200/60 overflow-hidden font-sans lg:h-[90vh] flex items-center" aria-label="Hệ sinh thái ứng dụng">
      
      {/* Background Cinematic Texture & Lights */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      )}

      <div className="max-w-[1260px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          
          {/* Cột Trái: High-Density Bento Gallery */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1">
            <header className="mb-4 md:mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 md:px-3 py-0.5 md:py-1 bg-white shadow-sm border border-slate-100 rounded-full text-blue-600 text-[10px] md:text-[11px] font-bold mb-2 md:mb-4 uppercase tracking-widest">
                <Cpu size={12} /> <span>Hệ sinh thái MTIEN SOLUTION</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-slate-900 tracking-tighter leading-[1.1] mb-2 md:mb-4">
                Mở rộng sức mạnh. <br className="hidden md:block"/>
                <span className="text-slate-400">Không giới hạn tính năng.</span>
              </h2>
            </header>

            {/* Bento Grid: Optimized for High Density */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 auto-rows-[70px] md:auto-rows-[105px]">
              {apps.map((app, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 0.99 }}
                  className={`
                    relative rounded-[1.2rem] md:rounded-[1.8rem] p-2.5 md:p-4 flex flex-col overflow-hidden group border border-white bg-white/70 backdrop-blur-xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]
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
          <div className="lg:col-span-6 relative order-1 lg:order-2 h-[280px] lg:h-[500px] flex items-center">
            
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
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#E8E8ED] rounded-[2rem] md:rounded-[3.5rem] p-2 md:p-2.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-300 ring-1 ring-white/50 overflow-hidden">
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
               <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[70%] h-10 bg-blue-900/5 blur-3xl rounded-full -z-10" />
            </div>
          </div>
        </div>

        {/* Professional Footer Ticker - Mật độ cao nhưng gọn */}
        <div className="mt-6 md:mt-12 pt-5 md:pt-8 border-t border-slate-200/60 flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-4 md:gap-6">
           <div className="flex gap-8 items-center grayscale opacity-40 hover:opacity-100 transition-all duration-700 overflow-x-auto scrollbar-hide py-2">
              {['Google Partner', 'Meta Business', 'TikTok Agency', 'GHN Delivery', 'Visa Secured'].map(brand => (
                <span key={brand} className="text-[11px] font-black text-slate-900 whitespace-nowrap tracking-widest uppercase">{brand}</span>
              ))}
           </div>
           <button className="bg-blue-600 hover:bg-slate-900 text-white rounded-full px-8 py-3.5 font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center gap-3">
              Dùng thử miễn phí <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </section>
  );
}