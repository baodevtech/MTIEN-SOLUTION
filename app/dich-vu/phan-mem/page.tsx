'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  CheckCircle2, ArrowRight, Home, Users, Settings, 
  Lightbulb, Smartphone, MonitorPlay, Search, Briefcase, 
  XCircle, PhoneCall, ArrowUpRight
} from 'lucide-react';

// --- DỮ LIỆU TĨNH ---
const PROCESS_STEPS = [
  { step: '01', title: 'Consult Understand', desc: 'We deeply analyze your business needs to build a clear roadmap for accurate and effective solutions.' },
  { step: '02', title: 'Plan Strategize', desc: 'We create a structured strategy with focused actions to ensure strong and sustainable project outcomes.' },
  { step: '03', title: 'Implement Execute', desc: 'We apply the planned solutions with precision, ensuring smooth execution and high-quality results.' },
  { step: '04', title: 'Support Optimize', desc: 'We continue monitoring and refining the system to improve performance and maintain long-term growth.' },
];

const PRICING_PLANS = [
  { name: 'Starter', price: '29', features: [true, true, true, false, false], popular: false },
  { name: 'Standard', price: '39', features: [true, true, true, true, false], popular: true },
  { name: 'Business', price: '49', features: [true, true, true, true, true], popular: false },
];

const PRICING_FEATURES = ['3 Users available', 'Limited tools', 'Unlimited Supports', 'API Access', 'Premium apps'];

// --- COMPONENT ĐẾM SỐ (Clone Odometer) ---
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

// --- CẤU HÌNH HIỆU ỨNG ---
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" } })
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: "easeOut" } })
};
const fadeInRightBig = {
  hidden: { opacity: 0, x: 100 },
  visible: (delay = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, delay, ease: "easeOut" } })
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#616161]">
      
      {/* 1. BREADCRUMB SECTION */}
      <section className="relative bg-[#061153] pt-[120px] pb-[120px] overflow-hidden rounded-b-[30px] md:mx-5 mt-5">
        <div className="absolute inset-0 bg-[#061153]/85 z-10"></div>
        <div className="absolute inset-0 z-0 bg-[url('https://inotek.themevally.com/wp-content/uploads/2025/10/breadcrumb.webp')] bg-cover bg-center"></div>
        
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
          <motion.img animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/star-1.webp" className="absolute top-20 right-[15%]" alt="star" />
          <motion.img animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/doot.webp" className="absolute bottom-20 right-[10%]" alt="dots" />
          <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/circle.webp" className="absolute top-1/2 left-[10%]" alt="circle" />
          <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/snake.webp" className="absolute bottom-10 left-[20%]" alt="snake" />
        </div>

        <div className="container mx-auto px-4 relative z-30 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-[50px] md:text-[64px] font-bold text-white mb-4 leading-tight font-['Manrope']"
          >
            Service
          </motion.h1>
          <motion.ul 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-3 text-white/80 font-medium text-lg"
          >
            <li><a href="/" className="hover:text-[#1053F3] transition-colors flex items-center gap-2"><Home size={18} /> Home</a></li>
            <li>/</li>
            <li className="text-white">Service</li>
          </motion.ul>
        </div>
      </section>

      {/* 2. FEATURE SECTION (ĐÃ CẬP NHẬT THEO HÌNH ẢNH) */}
      <section className="bg-[#F4F7FF] pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] relative z-40">
            
            {/* Card 1: Social Proof */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.2} viewport={{ once: true, margin: "-50px" }} className="bg-[#F0F4FA] p-10 rounded-[30px] shadow-sm relative">
              <div className="flex items-center mb-10">
                <div className="flex">
                  {[1, 2, 3, 4].map((num, i) => (
                    <img key={num} src={`https://inotek.themevally.com/wp-content/uploads/2025/11/social-img0${num}.webp`} alt="client" className={`w-[52px] h-[52px] rounded-full border-4 border-[#F0F4FA] object-cover ${i !== 0 ? '-ml-4' : ''} relative z-[${4-i}]`} />
                  ))}
                  <div className="w-[52px] h-[52px] rounded-full bg-[#1053F3] border-4 border-[#F0F4FA] flex items-center justify-center text-white font-bold text-sm -ml-4 relative z-0">
                    +3K
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-[56px] font-bold text-[#1053F3] leading-none font-['Manrope']">
                  <NumberCounter to={3600} />
                </h3>
                <motion.img animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/scribble.webp" className="w-10 opacity-70" alt="scribble shape" />
              </div>
              
              <p className="text-[#616161] text-[15px] mb-10">active customers</p>
              
              <a href="#" className="inline-flex items-center gap-2 bg-[#061153] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#1053F3] transition-all duration-300">
                Get Free Quote <ArrowUpRight size={18} />
              </a>
            </motion.div>

            {/* Card 2: IT Consultancy */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.4} viewport={{ once: true, margin: "-50px" }} className="bg-[#1053F3] p-10 rounded-[30px] relative">
              {/* CSS Cutout Trick góc trên bên phải */}
              <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-[#F4F7FF] rounded-bl-[24px] flex items-start justify-end p-2 z-10">
                 {/* Inverted curve trái */}
                 <div className="absolute top-0 -left-[20px] w-[20px] h-[20px] bg-transparent rounded-tr-[20px] shadow-[8px_-8px_0_8px_#F4F7FF]"></div>
                 {/* Inverted curve dưới */}
                 <div className="absolute -bottom-[20px] right-0 w-[20px] h-[20px] bg-transparent rounded-tr-[20px] shadow-[8px_-8px_0_8px_#F4F7FF]"></div>
                 
                 {/* Button mũi tên */}
                 <div className="w-[48px] h-[48px] bg-[#1053F3] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#061153] transition-colors relative z-20">
                    <ArrowUpRight size={20} />
                 </div>
              </div>

              <div className="mb-8 relative z-0 mt-4">
                <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon01.webp" alt="icon" className="h-[60px] brightness-0 invert" />
              </div>
              <h2 className="text-[26px] font-bold text-white mb-4 font-['Manrope'] leading-snug w-4/5">IT Consultancy and <br/> Management</h2>
              <p className="text-white/80 leading-relaxed text-[15px] w-5/6">Reintermediate technically sound to processes whereas market</p>
            </motion.div>

            {/* Card 3: Digital Transformation */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" custom={0.6} viewport={{ once: true, margin: "-50px" }} className="bg-[#061153] p-10 rounded-[30px] relative">
              {/* CSS Cutout Trick góc trên bên phải */}
              <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-[#F4F7FF] rounded-bl-[24px] flex items-start justify-end p-2 z-10">
                 {/* Inverted curve trái */}
                 <div className="absolute top-0 -left-[20px] w-[20px] h-[20px] bg-transparent rounded-tr-[20px] shadow-[8px_-8px_0_8px_#F4F7FF]"></div>
                 {/* Inverted curve dưới */}
                 <div className="absolute -bottom-[20px] right-0 w-[20px] h-[20px] bg-transparent rounded-tr-[20px] shadow-[8px_-8px_0_8px_#F4F7FF]"></div>
                 
                 {/* Button mũi tên */}
                 <div className="w-[48px] h-[48px] bg-[#061153] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#1053F3] transition-colors relative z-20">
                    <ArrowUpRight size={20} />
                 </div>
              </div>

              <div className="mb-8 relative z-0 mt-4">
                <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon02.webp" alt="icon" className="h-[60px] brightness-0 invert" />
              </div>
              <h2 className="text-[26px] font-bold text-white mb-4 font-['Manrope'] leading-snug w-5/6">Digital Transformation <br/> And Automation</h2>
              <p className="text-[#A0A3B5] leading-relaxed text-[15px] w-5/6">Reintermediate technically sound to processes whereas market</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="py-[120px] bg-[#F4F7FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[60px]">
            <span className="text-[#1053F3] font-bold flex items-center justify-center gap-2 mb-3 uppercase tracking-wider text-sm">
              <CheckCircle2 size={16} /> Services
            </span>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#061153] font-['Manrope'] leading-[1.2]">
              Empowering Companies with Reliable <br className="hidden md:block"/> and Scalable IT Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {[
              { img: 'hm1-icon01-1.webp', title: 'Content Marketing Optimization', desc: 'Elevating your digital presence requires more than just creating content; it...' },
              { img: 'hm1-icon02-1.webp', title: 'Influencer and Affiliate Marketing', desc: 'Strategic Integration for Enhanced Market Reach In the modern digital ecosystem...' },
              { img: 'hm1-icon03.webp', title: 'Social Media Marketing Management', desc: 'Elevating your brand presence in the digital sphere requires a strategic...' },
              { img: 'details-icon01.webp', title: 'Website and Mobile Apps Development', desc: 'In today\'s dynamic digital landscape, a powerful online presence is non-negotiable...' },
              { img: 'details-icon02.webp', title: 'Web and Mobile UI/UX Designing', desc: 'Elevate your digital presence with our meticulously crafted User Interface (UI)...' },
              { img: 'details-icon03.webp', title: 'Video Editing and 3D Animation', desc: 'Harness the power of dynamic visual media to significantly enhance your...' },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp} initial="hidden" whileInView="visible" custom={idx * 0.1} viewport={{ once: true, margin: "-50px" }}
                className="bg-white p-10 rounded-[20px] group hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(16,83,243,0.08)] transition-all duration-500 border border-transparent hover:border-[#1053F3]/10"
              >
                <div className="w-[80px] h-[80px] bg-[#F4F7FF] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#1053F3] transition-colors duration-500">
                  <img src={`https://inotek.themevally.com/wp-content/uploads/2025/11/${service.img}`} alt="icon" className="w-[40px] transition-all group-hover:brightness-0 group-hover:invert" />
                </div>
                <h4 className="text-[22px] font-bold text-[#061153] mb-5 font-['Manrope'] group-hover:text-[#1053F3] transition-colors cursor-pointer">
                  {service.title}
                </h4>
                <div className="w-12 h-[2px] bg-[#E8EDFA] mb-5 group-hover:bg-[#1053F3] transition-colors"></div>
                <p className="text-[#616161] mb-8 leading-relaxed">{service.desc}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#061153] font-bold text-sm uppercase tracking-wider group-hover:text-[#1053F3] transition-colors">
                  <span className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#1053F3] after:left-0 after:-bottom-1 group-hover:after:w-full after:transition-all after:duration-300">EXPLORE MORE</span> 
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MARQUEE SECTION */}
      <section className="bg-[#1053F3] py-6 overflow-hidden flex items-center border-y border-white/10">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap items-center min-w-max"
        >
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex items-center">
              {['Digital Marketing', 'Branding Solutions', 'Custom Website', 'Innovation Design', 'Cyber Security'].map((text, idx) => (
                <div key={idx} className="flex items-center mx-8">
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm3-icon1.png" alt="icon" className="w-6 h-6 mr-4" />
                  <span className="text-white text-[24px] font-bold font-['Manrope']">{text}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="relative bg-[#061153] pt-[120px] pb-[120px] rounded-b-[30px] overflow-hidden md:mx-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-shape-01.webp" alt="Shape" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-[80px]">
            <h2 className="text-[60px] md:text-[100px] font-extrabold text-white/5 tracking-[0.2em] uppercase">
              PR<span className="text-[#1053F3] opacity-100">O</span>CESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] relative">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInRightBig} initial="hidden" whileInView="visible" custom={idx * 0.2} viewport={{ once: true, margin: "-50px" }}
                className="relative group"
              >
                <h4 className="text-[#1053F3] font-bold mb-4 tracking-widest text-sm">STEP {step.step}</h4>
                <div className="bg-[#09155C] p-8 rounded-[20px] h-full border border-white/5 group-hover:bg-[#1053F3] transition-colors duration-500">
                  <div className="w-[70px] h-[70px] bg-[#18225F] rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                    <img src={`https://inotek.themevally.com/wp-content/uploads/2025/11/hm1-icon${idx+1}.webp`} className="w-8 h-8 group-hover:brightness-0 group-hover:invert" alt="icon" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 font-['Manrope']">{step.title}</h3>
                  <p className="text-gray-400 group-hover:text-white/80 transition-colors">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section className="py-[120px] bg-[#F4F7FF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[60px]">
            <span className="text-[#1053F3] font-bold flex items-center justify-center gap-2 mb-3 uppercase tracking-wider text-sm">
              <CheckCircle2 size={16} /> Pricing Plans
            </span>
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#061153] font-['Manrope'] leading-[1.2]">
              Choose the Perfect Plans for <br/> Your Business Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] max-w-[1170px] mx-auto items-end">
            {PRICING_PLANS.map((plan, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp} initial="hidden" whileInView="visible" custom={idx * 0.2} viewport={{ once: true }}
                className={`bg-white rounded-[30px] p-10 relative shadow-[0_10px_60px_rgba(0,0,0,0.05)] ${plan.popular ? 'border-2 border-[#1053F3] transform md:-translate-y-8' : ''}`}
              >
                {plan.popular && (
                  <>
                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#FF9D10] text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
                      <i className="fas fa-fire"></i> Most Popular
                    </div>
                    <motion.img animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} src="https://inotek.themevally.com/wp-content/uploads/2025/11/spin-shape02.webp" className="absolute top-6 right-6 w-[60px] opacity-20" alt="spin" />
                  </>
                )}

                <h5 className="text-[22px] font-bold text-[#061153] mb-4 font-['Manrope']">{plan.name}</h5>
                <div className="mb-4 flex items-baseline gap-2">
                  <h2 className="text-[44px] font-bold text-[#1053F3] leading-none">{plan.price} USD</h2>
                  <span className="text-[#616161] font-medium">/ month</span>
                </div>
                <p className="text-[#616161] mb-8">Organize Daily Task by free</p>
                
                <a href="#" className={`w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 mb-8 ${plan.popular ? 'bg-[#1053F3] text-white hover:bg-[#061153]' : 'bg-[#E8EDFA] text-[#061153] hover:bg-[#1053F3] hover:text-white'}`}>
                  Join this Plan <ArrowRight size={18} />
                </a>

                <h4 className="font-bold text-[#061153] mb-5">Key Features</h4>
                <ul className="space-y-4">
                  {PRICING_FEATURES.map((feat, i) => (
                    <li key={i} className={`flex items-center gap-3 font-medium ${plan.features[i] ? 'text-[#061153]' : 'text-gray-400 line-through'}`}>
                      {plan.features[i] ? <CheckCircle2 className="text-[#1053F3]" size={20}/> : <XCircle className="text-gray-300" size={20}/>}
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COLLABORATE CTA SECTION */}
      <section className="py-[120px] bg-white border-t border-[#E8EDFA]">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
            
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-[#1053F3] font-bold flex items-center gap-2 mb-3 uppercase tracking-wider text-sm">
                <CheckCircle2 size={16} /> Get In Touch
              </span>
              <h2 className="text-[40px] md:text-[48px] font-bold text-[#061153] mb-6 leading-[1.2] font-['Manrope']">
                Let’s Collaborate <br/> with Us
              </h2>
              <p className="text-[#616161] mb-10 text-lg leading-relaxed">
                Collaboratively supply bricks-and-clicks metrics for maintainable users from reinvent unique value for just in time consult.
              </p>
              <a href="#" className="inline-flex bg-[#1053F3] text-white px-8 py-4 rounded-full font-bold hover:bg-[#061153] transition-colors items-center gap-2">
                Contact with Us <ArrowRight size={18} />
              </a>
            </motion.div>
            
            <motion.div variants={fadeInRightBig} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative h-[500px] w-full">
               <div className="absolute inset-0 grid grid-cols-4 opacity-10 z-0">
                  <div className="border-r border-[#1053F3]"></div>
                  <div className="border-r border-[#1053F3]"></div>
                  <div className="border-r border-[#1053F3]"></div>
               </div>

               <div className="absolute inset-0 z-10 flex gap-4 items-center">
                  <div className="w-1/2 space-y-4">
                    <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details01.webp" alt="details1" className="w-full rounded-[20px] shadow-lg" />
                    <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details03.webp" alt="details3" className="w-[80%] ml-auto rounded-[20px] shadow-lg" />
                  </div>
                  <div className="w-1/2 space-y-4 -mt-10">
                    <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details02.webp" alt="details2" className="w-full rounded-[20px] shadow-lg" />
                    <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/details04.webp" alt="details4" className="w-[90%] rounded-[20px] shadow-lg" />
                  </div>
               </div>

               <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[100px] h-[100px] bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center justify-center">
                  <img src="https://inotek.themevally.com/wp-content/uploads/2025/11/icon-handshake.png" className="w-[50px]" alt="handshake" />
               </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}