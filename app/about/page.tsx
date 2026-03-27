'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Target, Lightbulb, Users, ShieldCheck, Award, Globe, TrendingUp, CheckCircle2 } from 'lucide-react';

const timeline = [
  { year: '2016', title: 'Thành lập TechNova', desc: 'Bắt đầu với đội ngũ 5 kỹ sư phần mềm đam mê công nghệ.' },
  { year: '2019', title: 'Mở rộng Dịch vụ Cloud', desc: 'Trở thành đối tác chiến lược của AWS và Google Cloud tại Việt Nam.' },
  { year: '2022', title: 'Đạt mốc 200+ Dự án', desc: 'Khẳng định vị thế trong lĩnh vực thiết kế UI/UX và phần mềm doanh nghiệp.' },
  { year: '2026', title: 'Hệ sinh thái Toàn diện', desc: 'Cung cấp giải pháp IT trọn gói từ phần cứng, phần mềm đến bảo trì hệ thống.' },
];

const team = [
  { name: 'Trần Quang Huy', role: 'Founder & CEO', image: 'https://picsum.photos/seed/ceo/400/500' },
  { name: 'Nguyễn Lê Minh', role: 'CTO - Giám đốc Công nghệ', image: 'https://picsum.photos/seed/cto/400/500' },
  { name: 'Phạm Thu Hà', role: 'Head of Design', image: 'https://picsum.photos/seed/design/400/500' },
  { name: 'Lê Hoàng Nam', role: 'Trưởng phòng Hạ tầng Cloud', image: 'https://picsum.photos/seed/cloud/400/500' },
];

export default function About() {
  return (
    <div className="pt-20 pb-24 bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-70"></div>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-medium text-sm mb-6"
          >
            Về chúng tôi
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight"
          >
            Định hình tương lai qua <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Đổi mới Công nghệ</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed"
          >
            TechNova là tập hợp của những bộ óc sáng tạo và kỹ sư tài năng. Chúng tôi không chỉ viết mã hay lắp ráp thiết bị, chúng tôi xây dựng nền tảng vững chắc để doanh nghiệp của bạn bứt phá trong kỷ nguyên số.
          </motion.p>
        </div>
      </section>

      {/* 2. Vision & Mission (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                <Globe size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Tầm nhìn</h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Trở thành tập đoàn công nghệ hàng đầu khu vực, tiên phong trong việc cung cấp hệ sinh thái IT toàn diện. Chúng tôi khát vọng đưa công nghệ Việt Nam vươn tầm quốc tế, tạo ra những sản phẩm mang tiêu chuẩn toàn cầu.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-orange-500 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
              <Target size={200} />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Sứ mệnh</h2>
              <p className="text-orange-50 text-lg leading-relaxed">
                Trao quyền cho doanh nghiệp thông qua các giải pháp công nghệ tối ưu, an toàn và dễ tiếp cận. Biến những ý tưởng phức tạp thành hiện thực đơn giản.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats & Image Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
          >
            <Image src="https://picsum.photos/seed/officelife/800/1000" alt="Văn hóa TechNova" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-2xl font-bold mb-2">&quot;Công nghệ vị nhân sinh&quot;</p>
              <p className="text-white/80">Môi trường làm việc cởi mở, sáng tạo tại TechNova.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Năng lực triển khai vượt trội</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi tự tin đáp ứng các tiêu chuẩn khắt khe nhất từ các tập đoàn lớn, ngân hàng và tổ chức chính phủ.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-extrabold text-blue-600 mb-2">100%</div>
                <div className="text-slate-800 font-bold mb-1">Cam kết SLA</div>
                <p className="text-sm text-slate-500">Đảm bảo thời gian uptime và phản hồi hỗ trợ.</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-orange-500 mb-2">ISO</div>
                <div className="text-slate-800 font-bold mb-1">27001:2013</div>
                <p className="text-sm text-slate-500">Tiêu chuẩn bảo mật thông tin quốc tế.</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-blue-600 mb-2">50+</div>
                <div className="text-slate-800 font-bold mb-1">Kỹ sư Senior</div>
                <p className="text-sm text-slate-500">Được chứng nhận bởi AWS, Microsoft, Google.</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-orange-500 mb-2">24/7</div>
                <div className="text-slate-800 font-bold mb-1">Giám sát hệ thống</div>
                <p className="text-sm text-slate-500">Trung tâm NOC hoạt động liên tục không nghỉ.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Timeline */}
      <section className="bg-slate-50 py-24 mb-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hành trình phát triển</h2>
            <p className="text-lg text-slate-600">Những cột mốc quan trọng định hình TechNova ngày hôm nay.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-200 -translate-y-1/2"></div>
            
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center z-10"
              >
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-200 border-4 border-white">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Đội ngũ Lãnh đạo</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Những người dẫn dắt TechNova với tầm nhìn chiến lược và đam mê công nghệ mãnh liệt.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative h-80 rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-slate-100">
                <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 text-center">{member.name}</h3>
              <p className="text-orange-500 font-medium text-center text-sm mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
