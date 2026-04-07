import Link from 'next/link';
import { Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] text-gray-400 pt-8 md:pt-16 pb-5 md:pb-8 border-t border-gray-800 text-[11px] md:text-sm" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Mobile: 2-column grid / Desktop: 5-column */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 mb-6 md:mb-12">
          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">MTIENSOLUTION.vn</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Liên kết MTIEN SOLUTION">
              {['Về chúng tôi', 'Blog', 'Bảng giá', 'Tuyển dụng', 'Academy'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Sản phẩm</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Danh sách sản phẩm">
              {['PM quản lý bán hàng', 'PM bán hàng online', 'Thiết kế website', 'PM quản lý sàn TMĐT', 'PM bán hàng MXH', 'PM nhà hàng & dịch vụ'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Thiết kế website</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Dịch vụ thiết kế website">
              {['Web bán hàng', 'Web thời trang', 'Web bất động sản', 'Web TMĐT', 'Mẫu web đẹp', 'Bảng giá tên miền'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Giải pháp quản lý</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Giải pháp quản lý theo ngành">
              {['Siêu thị mini', 'Tạp hóa', 'Thời trang', 'Mỹ phẩm', 'Quán cafe', 'Nhà thuốc', 'Trà sữa'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Thiết bị bán hàng</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Thiết bị bán hàng">
              {['Máy in hóa đơn', 'Máy in mã vạch', 'Máy quét mã vạch'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section — 2-col on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-5 md:pt-8 border-t border-gray-800">
          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Trợ giúp</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Trợ giúp">
              {['Trung tâm trợ giúp', 'Thanh toán', 'Điều khoản sử dụng', 'Bảo vệ dữ liệu', 'Liên hệ'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Tổng đài</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>Tư vấn: <span className="text-white font-bold">1800 6750</span></li>
              <li>Hỗ trợ: <span className="text-white font-bold">1900 6750</span></li>
              <li><a href="mailto:support@mtiensolution.vn" className="hover:text-white break-all">support@mtiensolution.vn</a></li>
              <li className="text-[10px] md:text-xs">7h00 - 22h00 T2 - CN</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Hợp tác</h3>
            <ul className="space-y-2 md:space-y-3" aria-label="Hợp tác">
              {['Liên hệ hợp tác', 'Nhà đầu tư', 'Trường Đại Học'].map((item) => (
                <li key={item}><Link href="#" className="hover:text-white">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-3 md:mb-4 text-[13px] md:text-sm">Liên hệ</h3>
            <div className="flex space-x-3 mb-2 md:mb-4" role="list" aria-label="Mạng xã hội">
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook" role="listitem"><Facebook size={18} aria-hidden="true" /></a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="YouTube" role="listitem"><Youtube size={18} aria-hidden="true" /></a>
              <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram" role="listitem"><Instagram size={18} aria-hidden="true" /></a>
            </div>
            <div className="space-y-2 md:space-y-3 text-[11px] md:text-xs">
              <p className="font-bold text-white">CÔNG TY TNHH MTIEN SOLUTION</p>
              <address className="not-italic leading-relaxed">
                <p>HN: T6, Ladeco, 266 Đội Cấn</p>
                <p>HCM: T5, Số 70 Lữ Gia</p>
                <p>ĐN: 83 Xô Viết Nghệ Tĩnh</p>
              </address>
              <p className="text-[#0066FF] cursor-pointer">+21 chi nhánh toàn quốc</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-5 md:pt-8 mt-6 md:mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[11px] md:text-xs gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded flex items-center justify-center text-[9px] md:text-[10px] font-bold">ISO</div>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded flex items-center justify-center text-[9px] md:text-[10px] font-bold">NCSC</div>
            <div className="w-16 md:w-24 h-8 md:h-10 bg-gray-800 rounded flex items-center justify-center text-[9px] md:text-[10px] font-bold">BỘ CÔNG THƯƠNG</div>
          </div>
          <p className="text-center">© 2026 MTIENSOLUTION.vn - Nền tảng bán hàng hợp kênh #1 Việt Nam</p>
          <p>Sao Khuê 2023, 2025</p>
        </div>
      </div>
    </footer>
  );
}
