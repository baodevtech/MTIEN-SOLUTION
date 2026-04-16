'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Facebook, Youtube, Instagram, MapPin, Mail, Phone, ArrowRight, ShieldCheck, Globe, ChevronRight } from 'lucide-react';
import { useGlobal } from '@/lib/theme-context';

const footerIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ShieldCheck, Globe, MapPin, Mail, Phone,
};

interface FooterLink { href: string; label: string }
interface FooterColumn { title: string; links: FooterLink[] }
interface Location { city: string; type: string; address: string }
interface Certification { label: string; icon: string; color: string }

function parseFooterLinks(raw: string): FooterLink[] {
  if (!raw || typeof raw !== 'string') return [];
  return raw.split('\n').filter(Boolean).map(line => {
    const parts = line.split('|');
    return { href: parts[0]?.trim() || '#', label: parts[1]?.trim() || '' };
  }).filter(l => l.label);
}

function parseFooterColumns(raw: unknown): FooterColumn[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((col: Record<string, unknown>) => ({
    title: String(col.title || ''),
    links: parseFooterLinks(String(col.links || '')),
  })).filter(c => c.title);
}

function parseLocations(raw: unknown): Location[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((loc: Record<string, unknown>) => ({
    city: String(loc.city || ''),
    type: String(loc.type || ''),
    address: String(loc.address || ''),
  })).filter(l => l.city);
}

function parseBottomLinks(raw: unknown): FooterLink[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((l: Record<string, unknown>) => ({
    label: String(l.label || ''),
    href: String(l.href || '#'),
  })).filter(l => l.label);
}

function parseCertifications(raw: unknown): Certification[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((c: Record<string, unknown>) => ({
    label: String(c.label || ''),
    icon: String(c.icon || ''),
    color: String(c.color || ''),
  })).filter(c => c.label);
}

// Defaults
const defaultColumns: FooterColumn[] = [
  { title: 'Bán hàng', links: [
    { href: '#', label: 'Quản lý bán hàng' }, { href: '#', label: 'Bán hàng đa kênh' },
    { href: '#', label: 'Thiết kế Website' }, { href: '#', label: 'Quản lý Fanpage' }, { href: '#', label: 'Tạo App bán hàng' },
  ]},
  { title: 'Dịch vụ', links: [
    { href: '#', label: 'Cloud Server & VPS' }, { href: '#', label: 'Email Doanh nghiệp' },
    { href: '#', label: 'Digital Marketing' }, { href: '#', label: 'Đăng ký Tên miền' }, { href: '#', label: 'Hóa đơn điện tử' },
  ]},
];

const defaultLocations: Location[] = [
  { city: 'Hà Nội', address: 'Tầng 6, Ladeco Building, 266 Đội Cấn', type: 'Trụ sở chính' },
  { city: 'Hồ Chí Minh', address: 'Tầng 5, Tòa nhà Lữ Gia, P.15, Q.11', type: 'Chi nhánh Nam' },
  { city: 'Đà Nẵng', address: '83 Xô Viết Nghệ Tĩnh, Khuê Trung', type: 'Chi nhánh Trung' },
];

const defaultBottomLinks: FooterLink[] = [
  { label: 'Điều khoản', href: '#' }, { label: 'Bảo mật', href: '#' }, { label: 'Sitemap', href: '/sitemap.xml' },
];

const defaultCertifications: Certification[] = [
  { label: 'ISO 9001:2015', icon: '', color: '#22c55e' },
  { label: 'Chứng nhận NCSC', icon: 'ShieldCheck', color: '#3b82f6' },
  { label: 'Bảo mật Quốc tế', icon: 'Globe', color: '#14b8a6' },
];

export default function Footer() {
  const ctaTitle = useGlobal('footer', 'ctaTitle', 'Sẵn sàng bứt phá doanh thu?') as string;
  const ctaDesc = useGlobal('footer', 'ctaDescription', 'Tham gia cùng hàng ngàn doanh nghiệp chuyển đổi số thành công. Bắt đầu trải nghiệm nền tảng ngay hôm nay.') as string;
  const ctaBtnPrimary = useGlobal('footer', 'ctaButtonPrimary', 'Dùng thử miễn phí') as string;
  const ctaBtnPrimaryLink = useGlobal('footer', 'ctaButtonPrimaryLink', '#') as string;
  const ctaBtnSecondary = useGlobal('footer', 'ctaButtonSecondary', 'Nhận tư vấn') as string;
  const ctaBtnSecondaryLink = useGlobal('footer', 'ctaButtonSecondaryLink', 'tel:18006750') as string;
  const companyDesc = useGlobal('footer', 'companyDesc', 'Giải pháp công nghệ toàn diện giúp doanh nghiệp tối ưu hóa vận hành, gia tăng điểm chạm khách hàng và phát triển vượt bậc.') as string;
  const copyrightText = useGlobal('footer', 'copyrightText', '© 2025 MTIEN Solution. Bảo lưu mọi quyền.') as string;
  const showCTA = useGlobal('footer', 'showCTA', true) as boolean;
  const facebookUrl = useGlobal('footer', 'facebookUrl', '#') as string;
  const youtubeUrl = useGlobal('footer', 'youtubeUrl', '#') as string;
  const instagramUrl = useGlobal('footer', 'instagramUrl', '#') as string;
  const hotline = useGlobal('footer', 'hotline', '1800 6750') as string;
  const hotlineLabel = useGlobal('footer', 'hotlineLabel', 'Hotline miễn phí') as string;
  const supportEmail = useGlobal('footer', 'supportEmail', 'support@mtiensolution.vn') as string;
  const supportEmailLabel = useGlobal('footer', 'supportEmailLabel', 'Email Hỗ trợ') as string;

  // Dynamic data from theme (repeater fields)
  const rawColumns = useGlobal('footer', 'footerColumns', null);
  const rawLocations = useGlobal('footer', 'locations', null);
  const rawBottomLinks = useGlobal('footer', 'bottomLinks', null);
  const rawCertifications = useGlobal('footer', 'certifications', null);

  const columns = useMemo(() => {
    const parsed = parseFooterColumns(rawColumns);
    return parsed.length > 0 ? parsed : defaultColumns;
  }, [rawColumns]);

  const locations = useMemo(() => {
    const parsed = parseLocations(rawLocations);
    return parsed.length > 0 ? parsed : defaultLocations;
  }, [rawLocations]);

  const bottomLinks = useMemo(() => {
    const parsed = parseBottomLinks(rawBottomLinks);
    return parsed.length > 0 ? parsed : defaultBottomLinks;
  }, [rawBottomLinks]);

  const certifications = useMemo(() => {
    const parsed = parseCertifications(rawCertifications);
    return parsed.length > 0 ? parsed : defaultCertifications;
  }, [rawCertifications]);

  // Alternating colors for link columns
  const columnColors = ['#0066FF', '#00D68F', '#FF8C00', '#E1306C'];

  return (
    <footer className="bg-[#0B1121] text-slate-400 border-t border-white/5 relative overflow-hidden font-sans" role="contentinfo">
      {/* Nền đổ màu nhẹ nhàng (Soft Dark Wash) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Bong bóng tối giản siêu mờ */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top CTA Section — Elegant Dark Card */}
      {showCTA && (
      <div className="relative z-10 -mt-8 mb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10">
          <div className="group relative bg-gradient-to-br from-[#111A31] to-[#0A101D] rounded-[32px] p-8 md:p-12 shadow-2xl shadow-black/40 border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500">
            {/* Decorative soft circles inside CTA */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-[40px] pointer-events-none"></div>
            
            <div className="z-10 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">{ctaTitle}</h2>
              <p className="text-blue-100/70 text-[15px] font-medium max-w-xl leading-relaxed">
                {ctaDesc}
              </p>
            </div>
            
            <div className="z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <Link href={ctaBtnPrimaryLink} className="flex-1 md:flex-none justify-center bg-blue-600 text-white hover:bg-blue-500 px-7 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2 hover:scale-[1.02]">
                {ctaBtnPrimary} <ArrowRight size={18} />
              </Link>
              <Link href={ctaBtnSecondaryLink} className="flex-1 md:flex-none justify-center bg-white/5 text-white hover:bg-white/10 border border-white/10 px-7 py-3.5 rounded-2xl font-bold transition-all flex items-center gap-2">
                <Phone size={18} /> {ctaBtnSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
      )}

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
              {companyDesc}
            </p>
            <div className="flex space-x-3" aria-label="Mạng xã hội">
              <a href={facebookUrl || '#'} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/10 transition-all duration-300" aria-label="Facebook">
                <Facebook size={18} strokeWidth={2} />
              </a>
              <a href={youtubeUrl || '#'} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#FF0000] hover:border-[#FF0000]/30 hover:bg-[#FF0000]/10 transition-all duration-300" aria-label="YouTube">
                <Youtube size={18} strokeWidth={2} />
              </a>
              <a href={instagramUrl || '#'} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:bg-[#E1306C]/10 transition-all duration-300" aria-label="Instagram">
                <Instagram size={18} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="col-span-1 lg:col-span-2">
              <h3 className="font-extrabold text-white mb-6 text-[15px] tracking-wide flex items-center gap-2">
                {col.title}
              </h3>
              <ul className="space-y-3.5" aria-label={col.title}>
                {col.links.map((item, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={item.href} className="text-[14px] font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5 group">
                      <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-all" style={{ color: undefined }} />
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="col-span-2 lg:col-span-4 bg-white/[0.02] rounded-[28px] p-6 border border-white/5 shadow-sm">
            <h3 className="font-extrabold text-white mb-5 text-[15px] tracking-wide px-1">Trợ giúp & Liên hệ</h3>
            <div className="space-y-3">
              <a href={`tel:${hotline.replace(/\s/g, '')}`} className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-[14px] bg-blue-500/10 flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors group-hover:shadow-[0_0_15px_rgba(0,102,255,0.4)] shrink-0">
                  <Phone size={20} className="fill-current opacity-90" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{hotlineLabel}</p>
                  <p className="text-xl font-black text-white tracking-tight">{hotline}</p>
                </div>
              </a>
              <a href={`mailto:${supportEmail}`} className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-[14px] bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors group-hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] shrink-0">
                  <Mail size={20} className="fill-current opacity-90" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{supportEmailLabel}</p>
                  <p className="text-[15px] font-bold text-slate-200">{supportEmail}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Info Locations Blocks */}
        {locations.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(locations.length, 3)} gap-5 mb-10`}>
          {locations.map((loc, idx) => (
             <div key={idx} className="flex items-start gap-4 p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
               <div className="mt-0.5 w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#0066FF]/20 group-hover:text-blue-400 transition-colors shrink-0 border border-white/5 group-hover:border-blue-500/30">
                 <MapPin size={18} />
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-extrabold text-white text-[15px]">{loc.city}</span>
                    {loc.type && <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-bold">{loc.type}</span>}
                  </div>
                  <p className="text-[13px] text-slate-400 font-medium leading-relaxed">{loc.address}</p>
               </div>
             </div>
          ))}
        </div>
        )}

        {/* Footer Bottom / Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {certifications.map((cert, idx) => {
              const CertIcon = cert.icon ? footerIconMap[cert.icon] : null;
              return (
                <div key={idx} className="h-9 px-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2">
                  {CertIcon ? (
                    <CertIcon size={14} className={cert.color ? '' : 'text-slate-300'} />
                  ) : (
                    <div className="relative flex items-center justify-center w-2.5 h-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping" style={{ backgroundColor: cert.color || '#22c55e' }}></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: cert.color || '#22c55e' }}></span>
                    </div>
                  )}
                  <span className="text-[12px] font-bold text-slate-300">{cert.label}</span>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 text-[13px] text-slate-500 font-bold">
            <p>{copyrightText || `© ${new Date().getFullYear()} MTIENSOLUTION.vn`}</p>
            {bottomLinks.length > 0 && (
              <>
                <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700"></div>
                <div className="flex gap-5">
                  {bottomLinks.map((link, idx) => (
                    <Link key={idx} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
