import Link from 'next/link';
import { Facebook, Youtube, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] text-gray-400 pt-16 pb-8 border-t border-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-white mb-4">MTIENSOLUTION.vn</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">MTIEN SOLUTION là gì?</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog MTIEN SOLUTION</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bảng giá</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Tuyển dụng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Profile Sản Phẩm</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">MTIEN SOLUTION Academy</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-white mb-4">Sản phẩm</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Phần mềm quản lý bán hàng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phần mềm bán hàng online</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Thiết kế website</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phần mềm quản lý sàn TMĐT</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phần mềm quản lý bán hàng trên MXH</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phần mềm quản lý nhà hàng và dịch vụ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Phần mềm bán hàng hợp kênh</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-white mb-4">Thiết kế website</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Thiết kế website bán hàng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Thiết kế web thời trang</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Thiết kế website bất động sản</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Thiết kế web thương mại điện tử</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mẫu website đẹp</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Bảng giá tên miền</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-white mb-4">Giải pháp quản lý</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý siêu thị mini</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý cửa hàng tạp hóa</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý cửa hàng thời trang</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý cửa hàng mỹ phẩm</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý quán cafe</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý quán bida</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý nhà thuốc</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Quản lý trà sữa</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="font-bold text-white mb-4">Thiết bị bán hàng</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Máy in hóa đơn</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Máy in mã vạch</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Máy quét mã vạch</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-800">
          <div>
            <h3 className="font-bold text-white mb-4">Trợ giúp</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hình thức thanh toán</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Hướng dẫn đăng nhập MTIEN SOLUTION</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Điều khoản & Điều kiện sử dụng</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Chính sách bảo vệ dữ liệu cá nhân</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dịch vụ hoàn thiện website</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Tổng đài hỗ trợ</h3>
            <ul className="space-y-3">
              <li>Tư vấn dịch vụ: <span className="text-white font-bold">1800 6750</span></li>
              <li>Hỗ trợ sử dụng: <span className="text-white font-bold">1900 6750</span></li>
              <li>Email: support@mtiensolution.vn</li>
              <li className="text-xs mt-2">Từ 7h00 - 22h00 các ngày từ thứ 2 đến Chủ nhật</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Hợp tác</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">Liên hệ hợp tác</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dành cho nhà đầu tư</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dành cho trường Đại Học</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Liên hệ</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
            <div className="space-y-3 text-xs">
              <p className="font-bold text-white">CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ MINH TIẾN (MTIEN SOLUTION)</p>
              <p>Trụ sở: Tầng 6, tòa nhà Ladeco, 266 Đội Cấn, phường Ngọc Hà, TP Hà Nội</p>
              <p>Chi nhánh: Tầng 5, Số 70 Lữ Gia, phường Phú Thọ, TP. HCM</p>
              <p className="ml-14">Số 83 Xô Viết Nghệ Tĩnh, phường Cẩm Lệ, TP Đà Nẵng</p>
              <p className="ml-14 text-[#0066FF] hover:underline cursor-pointer">Xem thêm 21 chi nhánh của MTIEN SOLUTION trên toàn quốc</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="flex gap-4 mb-4 md:mb-0">
            {/* Placeholder for certifications */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">ISO</div>
              <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">NCSC</div>
              <div className="w-24 h-10 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">BỘ CÔNG THƯƠNG</div>
            </div>
          </div>
          <p>Copyright © 2026 MTIENSOLUTION.vn - Nền tảng Quản lý bán hàng hợp kênh được sử dụng nhiều nhất Việt Nam</p>
          <p className="mt-2 md:mt-0">Sản phẩm đạt giải: Sao Khuê 2023, 2025</p>
        </div>
      </div>
    </footer>
  );
}
