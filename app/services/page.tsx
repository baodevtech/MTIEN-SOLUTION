'use client';

import { motion } from 'motion/react';
import { 
  Code2, 
  Server, 
  PenTool, 
  MonitorSmartphone, 
  Headset, 
  Settings, 
  Cloud, 
  ShoppingCart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    id: 'software-development',
    code: '6201',
    title: 'Phát Triển Phần Mềm & Ứng Dụng',
    description: 'Thiết kế website, lập trình phần mềm, app di động và phần mềm theo yêu cầu chuyên biệt cho doanh nghiệp.',
    icon: Code2,
    features: ['Ứng dụng iOS & Android', 'Web App & PWA', 'Hệ thống ERP/CRM', 'Bảo trì & Nâng cấp hệ thống'],
    color: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50'
  },
  {
    id: 'it-consulting',
    code: '6202',
    title: 'Tư Vấn Giải Pháp IT',
    description: 'Tư vấn máy vi tính và quản trị hệ thống máy vi tính. Đưa ra các giải pháp phần mềm tối ưu hóa quy trình vận hành.',
    icon: Settings,
    features: ['Đánh giá hệ thống hiện tại', 'Quy hoạch kiến trúc IT', 'Chuyển đổi số doanh nghiệp', 'Bảo mật thông tin'],
    color: 'from-orange-400 to-orange-600',
    bgLight: 'bg-orange-50'
  },
  {
    id: 'cloud-hosting',
    code: '6311',
    title: 'Cloud, Hosting & Xử Lý Dữ Liệu',
    description: 'Xử lý dữ liệu, cho thuê và các hoạt động liên quan. Cung cấp giải pháp Cloud, máy chủ ảo, và lưu trữ an toàn.',
    icon: Cloud,
    features: ['AWS / Google Cloud / Azure', 'VPS & Dedicated Server', 'Sao lưu & Phục hồi dữ liệu', 'Quản trị cơ sở dữ liệu'],
    color: 'from-cyan-400 to-blue-500',
    bgLight: 'bg-cyan-50'
  },
  {
    id: 'design-advertising',
    code: '7310 & 7410',
    title: 'Thiết Kế Đồ Họa & Quảng Cáo',
    description: 'Hoạt động thiết kế chuyên dụng: Thiết kế banner, poster, hình ảnh truyền thông, logo và nhận diện thương hiệu.',
    icon: PenTool,
    features: ['Thiết kế UI/UX', 'Bộ nhận diện thương hiệu', 'Ấn phẩm truyền thông', 'Video & Animation'],
    color: 'from-pink-500 to-rose-500',
    bgLight: 'bg-pink-50'
  },
  {
    id: 'it-support',
    code: '6209',
    title: 'Hỗ Trợ Kỹ Thuật & Bảo Trì',
    description: 'Hoạt động dịch vụ CNTT và dịch vụ khác liên quan đến máy vi tính. Hỗ trợ kỹ thuật, bảo trì phần mềm định kỳ.',
    icon: Headset,
    features: ['Hỗ trợ IT Helpdesk 24/7', 'Bảo trì phần cứng/phần mềm', 'Xử lý sự cố mạng', 'Cài đặt & Cấu hình'],
    color: 'from-emerald-400 to-emerald-600',
    bgLight: 'bg-emerald-50'
  },
  {
    id: 'hardware-retail',
    code: '4651 & 4741',
    title: 'Cung Cấp Thiết Bị IT',
    description: 'Bán buôn, bán lẻ máy vi tính, thiết bị ngoại vi và phần mềm. Cung cấp linh kiện máy tính, thiết bị công nghệ chính hãng.',
    icon: MonitorSmartphone,
    features: ['Máy tính bộ & Laptop', 'Máy chủ (Server)', 'Thiết bị mạng (Router, Switch)', 'Bản quyền phần mềm'],
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/30 -z-10" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/50 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wider mb-6 border border-blue-100">
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Giải Pháp Công Nghệ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                Toàn Diện & Chuyên Nghiệp
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
              Chúng tôi cung cấp hệ sinh thái dịch vụ IT đa dạng, từ tư vấn chiến lược, phát triển phần mềm, đến cung cấp thiết bị phần cứng, giúp doanh nghiệp của bạn bứt phá trong kỷ nguyên số.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${service.bgLight} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${service.color}`} style={{ color: 'url(#gradient)' }} />
                    <svg width="0" height="0">
                      <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="currentColor" offset="0%" />
                        <stop stopColor="currentColor" offset="100%" />
                      </linearGradient>
                    </svg>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mã ngành: {service.code}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href={`/contact?service=${service.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-orange-500 transition-colors"
                  >
                    Nhận báo giá <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Quy Trình Làm Việc</h2>
            <p className="text-lg text-slate-600">
              Chúng tôi áp dụng quy trình chuẩn quốc tế, đảm bảo tính minh bạch, đúng tiến độ và chất lượng cao nhất cho mọi dự án.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Khảo sát & Tư vấn', desc: 'Lắng nghe nhu cầu, phân tích hệ thống và đề xuất giải pháp.' },
              { step: '02', title: 'Thiết kế & Lập kế hoạch', desc: 'Lên wireframe, kiến trúc hệ thống và timeline chi tiết.' },
              { step: '03', title: 'Triển khai & Phát triển', desc: 'Lập trình, cài đặt thiết bị và thực hiện theo đúng thiết kế.' },
              { step: '04', title: 'Bàn giao & Bảo trì', desc: 'Kiểm thử, bàn giao, đào tạo và hỗ trợ kỹ thuật 24/7.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center"
              >
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/techbg/1920/1080')] opacity-10 mix-blend-overlay bg-cover bg-center" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Sẵn sàng nâng tầm doanh nghiệp của bạn?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Hãy để TechNova đồng hành cùng bạn trên con đường chuyển đổi số và tối ưu hóa hệ thống công nghệ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold rounded-full text-slate-900 bg-white hover:bg-slate-50 transition-colors shadow-lg"
              >
                Liên hệ tư vấn ngay
              </Link>
              <Link 
                href="/projects" 
                className="inline-flex justify-center items-center px-8 py-4 text-base font-bold rounded-full text-white border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Xem dự án đã làm
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
