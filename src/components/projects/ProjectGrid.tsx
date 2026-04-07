'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ExternalLink, Smartphone, Server, Layers, Monitor } from 'lucide-react';

/**
 * ProjectGrid - Luoi hien thi cac du an khac
 * Bao gom 4 the du an voi hinh anh, mo ta va cong nghe su dung
 */

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

export default function ProjectGrid() {
  return (
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
  );
}
