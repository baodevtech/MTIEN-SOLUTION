import Link from 'next/link';
import { Facebook, Youtube, Instagram, MapPin, Mail, Phone, ArrowRight, ShieldCheck, Globe, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1121] text-slate-400 border-t border-white/5 relative overflow-hidden font-sans" role="contentinfo">
      {/* Nền đổ màu nhẹ nhàng (Soft Dark Wash) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Bong bóng tối giản siêu mờ */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top CTA Section — Elegant Dark Card */}
      <div className="relative z-10 -mt-8 mb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10">
          <div className="group relative bg-gradient-to-br from-[#111A31] to-[#0A101D] rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/40 border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500">
            {/* Decorative soft circles inside CTA */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="z-10 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">Sẵn sàng bứt phá doanh thu?</h2>
              <p className="text-blue-100/70 text-[15px] font-medium max-w-xl leading-relaxed">
                Tham gia cùng hàng ngàn doanh nghiệp chuyển đổi số thành công. Bắt đầu trải nghiệm nền tảng ngay hôm nay.
              </p>
            </div>
            
            <div className="z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <Link href="#" className="flex-1 md:flex-none justify-center bg-blue-600 text-white hover:bg-blue-500 px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2 hover:scale-[1.02]">
                Dùng thử miễn phí <ArrowRight size={18} />
              </Link>
              <Link href="tel:18006750" className="flex-1 md:flex-none justify-center bg-white/5 text-white hover:bg-white/10 border border-white/10 px-7 py-3.5 rounded-2xl font-bold transition-all flex items-center gap-2">
                <Phone size={18} /> Nhận tư vấn
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-12 md:gap-x-12 mb-14">
          
          {/* Brand Column - spans 4 cols */}
          <div className="col-span-2 lg:col-span-4 pr-0 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group" aria-label="MTIEN SOLUTION">
              <div className="relative w-11 h-11">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#00D68F] rounded-2xl opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-[#0066FF] to-[#00D68F] rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-md border border-white/20">
                  M
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-2xl text-white tracking-tight leading-none">
                  MTIEN<span className="text-[#0066FF]">SOLUTION</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">Technology Group</span>
              </div>
            </Link>
            <p className="text-[14px] text-slate-400 mb-8 leading-relaxed font-medium">
              Giải pháp công nghệ toàn diện giúp doanh nghiệp tối ưu hóa vận hành, gia tăng điểm chạm khách hàng và phát triển vượt bậc.
            </p>
            <div className="flex space-x-3" role="list" aria-label="Mạng xã hội">
              <a href="#" className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/10 transition-all duration-300" aria-label="Facebook">
                <Facebook size={18} strokeWidth={2} />
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#FF0000] hover:border-[#FF0000]/30 hover:bg-[#FF0000]/10 transition-all duration-300" aria-label="YouTube">
                <Youtube size={18} strokeWidth={2} />
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/10 transition-all duration-300" aria-label="Instagram">
                <Instagram size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Links Block 1 */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-extrabold text-white mb-6 text-[15px] tracking-wide flex items-center gap-2">
              Bán hàng
            </h3>
            <ul className="space-y-3.5" aria-label="Giải pháp bán hàng">
              {['Quản lý bán hàng', 'Bán hàng đa kênh', 'Thiết kế Website', 'Quản lý Fanpage', 'Tạo App bán hàng'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[14px] font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#0066FF] group-hover:translate-x-1 transition-all" /> 
                    <span className="group-hover:translate-x-0.5 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Block 2 */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="font-extrabold text-white mb-6 text-[15px] tracking-wide flex items-center gap-2">
              Dịch vụ
            </h3>
            <ul className="space-y-3.5" aria-label="Các dịch vụ khác">
              {['Cloud Server & VPS', 'Email Doanh nghiệp', 'Digital Marketing', 'Đăng ký Tên miền', 'Hóa đơn điện tử'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[14px] font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5 group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#00D68F] group-hover:translate-x-1 transition-all" /> 
                    <span className="group-hover:translate-x-0.5 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-2 lg:col-span-4 bg-white/[0.02] rounded-[28px] p-6 border border-white/5 shadow-sm">
            <h3 className="font-extrabold text-white mb-5 text-[15px] tracking-wide px-1">Trợ giúp & Liên hệ</h3>
            <div className="space-y-3">
              <a href="tel:18006750" className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-[14px] bg-blue-500/10 flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors group-hover:shadow-[0_0_15px_rgba(0,102,255,0.4)] shrink-0">
                  <Phone size={20} className="fill-current opacity-90" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Hotline miễn phí</p>
                  <p className="text-xl font-black text-white tracking-tight">1800 6750</p>
                </div>
              </a>
              <a href="mailto:support@mtiensolution.vn" className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-[14px] bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors group-hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] shrink-0">
                  <Mail size={20} className="fill-current opacity-90" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Email Hỗ trợ</p>
                  <p className="text-[15px] font-bold text-slate-200">support@mtiensolution.vn</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Info Locations Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { city: 'Hà Nội', address: 'Tầng 6, Ladeco Building, 266 Đội Cấn', type: 'Trụ sở chính' },
            { city: 'Hồ Chí Minh', address: 'Tầng 5, Tòa nhà Lữ Gia, P.15, Q.11', type: 'Chi nhánh Nam' },
            { city: 'Đà Nẵng', address: '83 Xô Viết Nghệ Tĩnh, Khuê Trung', type: 'Chi nhánh Trung' }
          ].map((loc, idx) => (
             <div key={idx} className="flex items-start gap-4 p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
               <div className="mt-0.5 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#0066FF]/20 group-hover:text-blue-400 transition-colors shrink-0 border border-white/5 group-hover:border-blue-500/30">
                 <MapPin size={18} />
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-extrabold text-white text-[15px]">{loc.city}</span>
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-bold">{loc.type}</span>
                  </div>
                  <p className="text-[13px] text-slate-400 font-medium leading-relaxed">{loc.address}</p>
               </div>
             </div>
          ))}
        </div>

        {/* Footer Bottom / Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="h-9 px-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2">
               <div className="relative flex items-center justify-center w-2.5 h-2.5">
                 <span className="absolute inline-flex h-full w-full rounded-full bg-green-500/50 animate-ping"></span>
                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
               </div>
               <span className="text-[12px] font-bold text-slate-300">ISO 9001:2015</span>
            </div>
            <div className="h-9 px-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2">
               <ShieldCheck size={14} className="text-blue-400" />
               <span className="text-[12px] font-bold text-slate-300">Chứng nhận NCSC</span>
            </div>
            <div className="h-9 px-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2">
               <Globe size={14} className="text-teal-400" />
               <span className="text-[12px] font-bold text-slate-300">Bảo mật Quốc tế</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-[13px] text-slate-500 font-bold">
            <p>© {new Date().getFullYear()} MTIENSOLUTION.vn</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700"></div>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-white transition-colors">Điều khoản</Link>
              <Link href="#" className="hover:text-white transition-colors">Bảo mật</Link>
              <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
