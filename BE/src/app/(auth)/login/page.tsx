'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin')
      return
    }

    setLoading(true)

    try {
      // Demo login - in production, this would call the API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email === 'admin@mtiensolution.vn' && password === 'admin123') {
        const token = 'demo_jwt_token_xxx'
        // Set cookie so middleware can read it server-side
        document.cookie = `admin_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
        localStorage.setItem('admin_token', token)
        localStorage.setItem('admin_user', JSON.stringify({
          id: '1',
          name: 'Nguyễn Minh Tiến',
          email: 'admin@mtiensolution.vn',
          role: 'admin',
          avatar: 'https://i.pravatar.cc/150?img=11',
        }))
        router.push('/')
      } else {
        setError('Email hoặc mật khẩu không đúng')
      }
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1C2536] via-[#1E3A5F] to-[#1C2536] p-12 flex-col justify-between relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">M</div>
            <span className="text-white font-bold text-xl">MTIEN Solution</span>
          </div>
          <p className="text-blue-200/60 text-sm">Hệ thống quản trị nội dung</p>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Chào mừng đến<br />
            <span className="text-blue-400">Admin Panel</span>
          </h1>
          <p className="text-blue-200/80 text-sm leading-relaxed max-w-sm">
            Hệ thống quản trị nội dung chuyên nghiệp. Quản lý toàn bộ website, sản phẩm, bài viết, đơn hàng và nhiều hơn nữa.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-xs text-blue-200/60">Uptime</p>
          </div>
          <div className="w-px h-8 bg-blue-200/20" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">256-bit</p>
            <p className="text-xs text-blue-200/60">Mã hoá SSL</p>
          </div>
          <div className="w-px h-8 bg-blue-200/20" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">2FA</p>
            <p className="text-xs text-blue-200/60">Bảo mật</p>
          </div>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">M</div>
            <span className="text-slate-800 font-bold text-xl">MTIEN Admin</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Đăng nhập</h2>
            <p className="text-sm text-slate-500 mt-1">Nhập thông tin tài khoản để truy cập hệ thống</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 animate-fade-in">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mtiensolution.vn"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
                <button type="button" className="text-xs text-blue-600 hover:underline">Quên mật khẩu?</button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 accent-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">Ghi nhớ đăng nhập</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Đang đăng nhập...</>
              ) : (
                <>Đăng nhập <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-3 bg-slate-100 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Tài khoản demo</p>
            <p className="text-xs text-slate-500">Email: <code className="text-slate-700 bg-white px-1 py-0.5 rounded">admin@mtiensolution.vn</code></p>
            <p className="text-xs text-slate-500">Mật khẩu: <code className="text-slate-700 bg-white px-1 py-0.5 rounded">admin123</code></p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            &copy; 2025 MTIEN Solution. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </div>
  )
}
