'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Save, Eye, Plus, X, Upload, Trash2, GripVertical,
  ChevronDown, Settings2, Loader2,
} from 'lucide-react'
import { cn, slugify, formatCurrency } from '@/lib/utils'

const categories = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'pc', label: 'PC & Máy bàn' },
  { value: 'linhkien', label: 'Linh kiện' },
  { value: 'ngoaivi', label: 'Ngoại vi' },
  { value: 'phanmem', label: 'Phần mềm' },
  { value: 'mang', label: 'Thiết bị mạng' },
]

export default function ProductEditorPage() {
  return <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>}><ProductEditorInner /></Suspense>
}

function ProductEditorInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [oldPrice, setOldPrice] = useState('')
  const [sku, setSku] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [warranty, setWarranty] = useState('')
  const [badge, setBadge] = useState('')
  const [status, setStatus] = useState('draft')
  const [images, setImages] = useState<string[]>([])
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([{ label: '', value: '' }])
  const [seoExpanded, setSeoExpanded] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load product data if editing
  useEffect(() => {
    if (!editId) return
    fetch(`/api/admin/products?search=&limit=100`)
      .then(r => r.json())
      .then(json => {
        const p = (json.data || []).find((item: { id: string }) => item.id === editId)
        if (p) {
          setName(p.name || '')
          setSlug(p.slug || '')
          setShortDesc(p.description || '')
          setDescription(p.description || '')
          setPrice(p.price?.toString() || '')
          setOldPrice(p.comparePrice?.toString() || '')
          setSku(p.sku || '')
          setStock(p.stock?.toString() || '')
          setCategory(p.category || '')
          setStatus(p.status || 'draft')
          setImages(p.images || [])
        }
      })
      .catch(() => {})
  }, [editId])

  const handleSave = async () => {
    if (!name || !price) return alert('Vui lòng nhập tên và giá sản phẩm')
    setSaving(true)
    try {
      const body = {
        ...(editId && { id: editId }),
        name,
        slug: slug || slugify(name),
        description: description || shortDesc,
        shortDesc,
        price: Number(price),
        comparePrice: oldPrice ? Number(oldPrice) : null,
        sku,
        stock: Number(stock) || 0,
        category,
        status,
        images,
        image: images[0] || null,
        tags: [],
        featured: false,
      }
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) {
        router.push('/products')
      } else {
        alert(json.message || 'Lưu thất bại')
      }
    } catch { alert('Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleNameChange = (val: string) => { setName(val); if (!slug) setSlug(slugify(val)) }
  const addSpec = () => setSpecs([...specs, { label: '', value: '' }])
  const removeSpec = (i: number) => setSpecs(specs.filter((_, idx) => idx !== i))
  const updateSpec = (i: number, field: 'label' | 'value', val: string) => {
    const updated = [...specs]; updated[i][field] = val; setSpecs(updated)
  }
  const addImage = () => setImages([...images, `https://picsum.photos/seed/new${Date.now()}/600/400`])
  const removeImage = (i: number) => setImages(images.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/products" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">{editId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
            <p className="text-sm text-slate-500">Nhập thông tin chi tiết sản phẩm</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Eye size={16} /> Xem trước
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="font-semibold text-slate-800">Thông tin cơ bản</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên sản phẩm <span className="text-red-500">*</span></label>
              <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder='VD: MacBook Air M3 15"' className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Slug:</span>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded border border-blue-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả ngắn</label>
              <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="Mô tả ngắn gọn sản phẩm..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả chi tiết</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả đầy đủ sản phẩm, tính năng, ưu điểm..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" rows={6} />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Hình ảnh sản phẩm</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-50 group border border-slate-200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => removeImage(i)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {i === 0 && <span className="absolute top-2 left-2 text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold">Chính</span>}
                </div>
              ))}
              <button onClick={addImage} className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
                <Upload size={24} />
                <span className="text-xs font-medium">Tải lên</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-3">Kéo thả để sắp xếp. Ảnh đầu tiên sẽ là ảnh chính. JPG, PNG, WebP — tối đa 5MB/ảnh.</p>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4">Giá & Kho hàng</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá bán (₫) <span className="text-red-500">*</span></label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá gốc (₫)</label>
                <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="Để trống nếu không giảm giá" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">SKU <span className="text-red-500">*</span></label>
                <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="VD: APL-MBA-M3-15" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tồn kho <span className="text-red-500">*</span></label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
            {price && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Giá hiển thị: <span className="font-bold">{formatCurrency(Number(price))}</span>
                  {oldPrice && <span className="ml-2">— Giảm <span className="font-bold text-red-600">{Math.round((1 - Number(price) / Number(oldPrice)) * 100)}%</span></span>}
                </p>
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Thông số kỹ thuật</h3>
              <button onClick={addSpec} className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 font-medium">
                <Plus size={14} /> Thêm
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <GripVertical size={16} className="text-slate-300 shrink-0 cursor-grab" />
                  <input type="text" value={spec.label} onChange={(e) => updateSpec(i, 'label', e.target.value)} placeholder="Thuộc tính (VD: CPU)" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                  <input type="text" value={spec.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} placeholder="Giá trị (VD: Apple M3)" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                  <button onClick={() => removeSpec(i)} className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button onClick={() => setSeoExpanded(!seoExpanded)} className="flex items-center justify-between w-full p-5">
              <div className="flex items-center gap-3">
                <Settings2 size={18} className="text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-700">SEO & Meta Tags</h3>
              </div>
              <ChevronDown size={16} className={cn('text-slate-400 transition-transform', seoExpanded && 'rotate-180')} />
            </button>
            {seoExpanded && (
              <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Title</label>
                  <input type="text" placeholder={name || 'Nhập meta title...'} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                  <textarea placeholder="Mô tả sản phẩm cho SEO..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20" rows={3} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Trạng thái</h3>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
              <option value="draft">Nháp</option>
              <option value="active">Đang bán</option>
              <option value="outOfStock">Hết hàng</option>
            </select>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="category" value={cat.value} checked={category === cat.value} onChange={() => setCategory(cat.value)} className="w-4 h-4 text-blue-500 border-slate-300" />
                  <span className="text-sm text-slate-600">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Thương hiệu</h3>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="VD: Apple, ASUS, Dell..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>

          {/* Badge */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Nhãn sản phẩm</h3>
            <select value={badge} onChange={(e) => setBadge(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
              <option value="">Không có</option>
              <option value="Best Seller">Best Seller</option>
              <option value="Hot">Hot</option>
              <option value="Mới">Mới</option>
              <option value="Flash Sale">Flash Sale</option>
            </select>
          </div>

          {/* Warranty */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Bảo hành</h3>
            <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} placeholder="VD: 12 tháng chính hãng" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
