'use client';
import { motion } from 'motion/react';
import { User, LayoutTemplate, Briefcase, Heart, CheckCircle2, Star } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const stats = [
  {
    icon: User,
    badge: <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-500 absolute -bottom-1.5 -right-1.5 bg-rose-50 rounded-full p-0.5 ring-2 ring-white" aria-hidden="true" />,
    title: 'Khách hàng tin dùng',
    value: '230K+',
    gradient: 'from-[#0066FF] to-blue-400',
    bgIcon: 'bg-blue-50 text-[#0066FF]',
  },
  {
    icon: LayoutTemplate,
    badge: <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 absolute -bottom-1.5 -right-1.5 bg-emerald-50 rounded-full p-0.5 ring-2 ring-white" aria-hidden="true" />,
    title: 'Giao diện chuẩn SEO',
    value: '400+',
    gradient: 'from-emerald-500 to-teal-400',
    bgIcon: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Briefcase,
    badge: <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500 absolute -bottom-1.5 -right-1.5 bg-amber-50 rounded-full p-0.5 ring-2 ring-white" aria-hidden="true" />,
    title: 'Lĩnh vực đáp ứng',
    value: '50+',
    gradient: 'from-amber-500 to-orange-400',
    bgIcon: 'bg-amber-50 text-amber-600',
  },
];

export default function StatsSection() {
  const reduced = useReducedMotion();

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <section className="relative z-30 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 font-sans transform -translate-y-6 md:-translate-y-24" aria-label="Thống kê nổi bật">
      <motion.div 
        variants={reduced ? undefined : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-3 gap-3 md:gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={reduced ? undefined : itemVariants}
            className="bg-white/70 backdrop-blur-3xl rounded-[16px] md:rounded-[32px] p-3 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white ring-1 ring-slate-100/80 flex flex-row md:flex-row items-center gap-2 md:gap-6 group hover:shadow-[0_30px_60px_-15px_rgba(0,102,255,0.15)] transition-all duration-500 overflow-hidden relative"
          >
            {/* Lighing hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className={`w-10 h-10 md:w-16 md:h-16 rounded-[10px] md:rounded-[20px] ${stat.bgIcon} flex items-center justify-center shrink-0 relative group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm z-10 box-border`}>
              <stat.icon size={26} className="hidden md:block" strokeWidth={1.5} aria-hidden="true" />
              <stat.icon size={18} className="md:hidden" strokeWidth={1.5} aria-hidden="true" />
              {stat.badge}
            </div>
            <div className="flex flex-col text-left md:text-left z-10 min-w-0 overflow-hidden text-ellipsis">
              <p className="text-slate-500 font-medium text-[8px] sm:text-[11px] md:text-[13px] uppercase tracking-wider mb-0 md:mb-1 truncate">{stat.title}</p>
              <span className={`font-black text-[16px] sm:text-[24px] md:text-[36px] text-transparent bg-clip-text bg-gradient-to-br ${stat.gradient} leading-tight md:leading-none tracking-tight drop-shadow-sm`}>
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
