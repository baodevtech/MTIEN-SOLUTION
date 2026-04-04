'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ExternalLink, Layers, Server, Smartphone, Monitor } from 'lucide-react';

const featuredProject = {
  title: 'Hệ thống Quản trị Nguồn lực ERP Lõi',
  client: 'Tập đoàn Sản xuất VinaCorp',
  category: 'Phần mềm Doanh nghiệp (6201)',
  image: 'https://picsum.photos/seed/erp_dashboard/1200/800',
  desc: 'Chuyển đổi số toàn diện quy trình vận hành cho tập đoàn 2000+ nhân sự. Hệ thống tích hợp quản lý kho, nhân sự, kế toán và chuỗi cung ứng theo thời gian thực.',
  metrics: [
    { label: 'Tăng hiệu suất', value: '300%' },
    { label: 'Giảm chi phí vận hành', value: '45%' },
    { label: 'Thời gian triển khai', value: '6 Tháng' },
  ],
  tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
};

const projects = [
  {
    title: 'SuperApp Thương mại Điện tử',
    category: 'App Di động (6201)',
    icon: <Smartphone size={20} />,
    image: 'https://picsum.photos/seed/ecommerce_app/800/600',
    desc: 'Ứng dụng mua sắm tích hợp ví điện tử, xử lý 10.000+ giao dịch đồng thời với trải nghiệm mượt mà.',
    tech: ['React Native', 'Go', 'Redis']
  },
  {
    title: 'Hạ tầng Cloud Core Banking',
    category: 'Cloud & Server (6311)',
    icon: <Server size={20} />,
    image: 'https://picsum.photos/seed/server_room/800/600',
    desc: 'Thiết kế kiến trúc Multi-Cloud, đảm bảo tính sẵn sàng cao (High Availability) và bảo mật cấp ngân hàng.',
    tech: ['Kubernetes', 'GCP', 'Terraform']
  },
  {
    title: 'Rebranding Chuỗi F&B Toàn quốc',
    category: 'Thiết kế Đồ họa (7410)',
    icon: <Layers size={20} />,
    image: 'https://picsum.photos/seed/branding_fb/800/600',
    desc: 'Tái định vị thương hiệu, thiết kế logo, bao bì và toàn bộ ấn phẩm truyền thông cho 50+ cửa hàng.',
    tech: ['Figma', 'Illustrator', 'Photoshop']
  },
  {
    title: 'Setup Hệ thống IT Tòa nhà',
    category: 'Thiết bị & Mạng (4651, 4741)',
    icon: <Monitor size={20} />,
    image: 'https://picsum.photos/seed/office_network/800/600',
    desc: 'Tư vấn, cung cấp và thi công toàn bộ hệ thống máy tính, server nội bộ và mạng LAN/Wifi cho tòa nhà 20 tầng.',
    tech: ['Cisco', 'Dell EMC', 'Ubiquiti']
  },
];

export default function Projects() {
  return (
    <div className="pt-20 pb-24 bg-white">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6"
          >
            Hồ sơ năng lực
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Những dấu ấn <span className="text-orange-500">Công nghệ</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Khám phá cách TechNova giải quyết các bài toán phức tạp, giúp khách hàng tối ưu hóa vận hành và bứt phá doanh thu.
          </motion.p>
        </div>
      </section>

      {/* 2. Featured Project */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        >
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-500/30">Dự án Nổi bật</span>
                <span className="text-slate-400 text-sm">{featuredProject.category}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{featuredProject.title}</h2>
              <p className="text-blue-200 font-medium mb-6">Khách hàng: {featuredProject.client}</p>
              <p className="text-slate-300 leading-relaxed mb-10">{featuredProject.desc}</p>
              
              <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-slate-700">
                {featuredProject.metrics.map((metric, i) => (
                  <div key={i}>
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">{metric.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-3">Công nghệ sử dụng:</p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 rounded-lg text-sm text-slate-200 border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <Image src={featuredProject.image} alt={featuredProject.title} fill className="object-cover" />
          </div>
        </motion.div>
      </section>

      {/* 3. Project Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Các dự án khác</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100 p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
                  <Image src={project.image} alt={project.title} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute top-8 right-8 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <ExternalLink size={20} />
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm font-bold text-orange-500 mb-4">
                  {project.icon}
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed flex-1">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 rounded-[3rem] p-12 text-center border border-blue-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Bạn có một dự án đang ấp ủ?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">Hãy để đội ngũ chuyên gia của chúng tôi biến ý tưởng của bạn thành sản phẩm thực tế với chất lượng cao nhất.</p>
          <Link href="/contact" className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-200 hover:-translate-y-1">
            Bắt đầu thảo luận <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
