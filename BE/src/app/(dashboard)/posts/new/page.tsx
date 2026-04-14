'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Save, Eye, Clock, Image as ImageIcon, X, Plus,
  Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon,
  Quote, Code, Heading1, Heading2, AlignLeft, AlignCenter, Upload,
  Settings2, Search as SearchIcon, Globe, ChevronDown, Loader2,
} from 'lucide-react'
import { cn, slugify } from '@/lib/utils'

const categories = ['Thiết kế', 'Cloud', 'Marketing', 'E-commerce', 'AI', 'Bảo mật', 'Chuyển đổi số', 'Phần mềm']

export default function PostEditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('id')

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [seoExpanded, setSeoExpanded] = useState(false)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [saving, setSaving] = useState(false)

  // Load post data if editing
  useEffect(() => {
    if (!editId) return
    fetch(`/api/admin/posts?search=&limit=100`)
      .then(r => r.json())
      .then(json => {
        const p = (json.data || []).find((item: { id: string }) => item.id === editId)
        if (p) {
          setTitle(p.title || '')
          setSlug(p.slug || '')
          setContent(p.content || '')
          setExcerpt(p.excerpt || '')
          setCategory(p.category || '')
          setTags(p.tags || [])
          setStatus(p.status || 'draft')
          setFeaturedImage(p.coverImage || null)
        }
      })
      .catch(() => {})
  }, [editId])

  const handleSave = async (saveStatus: 'draft' | 'published') => {
    if (!title) return alert('Vui lòng nhập tiêu đề bài viết')
    setSaving(true)
    try {
      const body = {
        ...(editId && { id: editId }),
        title,
        slug: slug || slugify(title),
        content,
        excerpt,
        category,
        tags,
        coverImage: featuredImage,
        status: saveStatus,
      }
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch('/api/admin/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (json.success) {
        router.push('/posts')
      } else {
        alert(json.message || 'Lưu thất bại')
      }
    } catch { alert('Lỗi kết nối') }
    finally { setSaving(false) }
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug) setSlug(slugify(value))
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) {
      setTags([...tags, t])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/posts" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Tạo bài viết mới</h1>
            <p className="text-sm text-slate-500">Soạn thảo và xuất bản bài viết</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Eye size={16} />
            Xem trước
          </button>
          <button onClick={() => handleSave('draft')} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Clock size={16} />}
            Lưu nháp
          </button>
          <button onClick={() => handleSave('published')} disabled={saving} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Xuất bản
          </button>
        </div>
      </div>

      {/* Main content area - WordPress-like 2 column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <input
              type="text"
              placeholder="Nhập tiêu đề bài viết..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-300 outline-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400">Đường dẫn:</span>
              <span className="text-xs text-slate-500">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded border border-blue-200 outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="tieu-de-bai-viet"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b border-slate-200">
              <button
                onClick={() => setActiveTab('editor')}
                className={cn(
                  'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'editor'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                )}
              >
                Soạn thảo
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={cn(
                  'px-5 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                )}
              >
                Xem trước
              </button>
            </div>

            {/* Toolbar */}
            {activeTab === 'editor' && (
              <div className="flex items-center gap-0.5 px-4 py-2 border-b border-slate-100 flex-wrap">
                {[
                  { icon: <Heading1 size={16} />, title: 'Heading 1' },
                  { icon: <Heading2 size={16} />, title: 'Heading 2' },
                  null,
                  { icon: <Bold size={16} />, title: 'Bold' },
                  { icon: <Italic size={16} />, title: 'Italic' },
                  { icon: <Underline size={16} />, title: 'Underline' },
                  null,
                  { icon: <List size={16} />, title: 'Bullet list' },
                  { icon: <ListOrdered size={16} />, title: 'Numbered list' },
                  { icon: <Quote size={16} />, title: 'Quote' },
                  { icon: <Code size={16} />, title: 'Code' },
                  null,
                  { icon: <LinkIcon size={16} />, title: 'Link' },
                  { icon: <ImageIcon size={16} />, title: 'Image' },
                  null,
                  { icon: <AlignLeft size={16} />, title: 'Align left' },
                  { icon: <AlignCenter size={16} />, title: 'Align center' },
                ].map((item, i) =>
                  item === null ? (
                    <div key={`sep-${i}`} className="w-px h-5 bg-slate-200 mx-1" />
                  ) : (
                    <button
                      key={item.title}
                      title={item.title}
                      className="p-2 rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                      {item.icon}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Editor area */}
            <div className="p-5">
              {activeTab === 'editor' ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Bắt đầu viết nội dung bài viết tại đây...&#10;&#10;Hỗ trợ Markdown, HTML và rich text."
                  className="w-full editor-content resize-none outline-none text-slate-700 placeholder:text-slate-300"
                  rows={20}
                />
              ) : (
                <div className="editor-content prose prose-slate max-w-none">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
                  ) : (
                    <p className="text-slate-400 italic">Chưa có nội dung để xem trước...</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tóm tắt (Excerpt)</h3>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Viết mô tả ngắn cho bài viết, hiển thị ở trang danh sách..."
              className="w-full text-sm text-slate-600 placeholder:text-slate-400 outline-none resize-none border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={3}
            />
            <p className="text-xs text-slate-400 mt-2">{excerpt.length}/300 ký tự</p>
          </div>

          {/* SEO Section */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="flex items-center justify-between w-full p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <Globe size={16} className="text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-slate-700">SEO & Meta Tags</h3>
                  <p className="text-xs text-slate-500">Tối ưu cho công cụ tìm kiếm</p>
                </div>
              </div>
              <ChevronDown size={16} className={cn('text-slate-400 transition-transform', seoExpanded && 'rotate-180')} />
            </button>
            {seoExpanded && (
              <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
                {/* SEO preview */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">Xem trước trên Google:</p>
                  <div className="space-y-1">
                    <p className="text-blue-600 text-lg font-medium truncate">{metaTitle || title || 'Tiêu đề bài viết'}</p>
                    <p className="text-green-700 text-sm">mtiensolution.vn/blog/{slug || 'duong-dan'}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{metaDescription || excerpt || 'Mô tả meta sẽ hiển thị ở đây...'}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || 'Nhập meta title...'}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-400 mt-1">{metaTitle.length}/60 ký tự</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Mô tả ngắn gọn cho SEO..."
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    rows={3}
                  />
                  <p className="text-xs text-slate-400 mt-1">{metaDescription.length}/160 ký tự</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Canonical URL</label>
                  <input
                    type="text"
                    placeholder="https://mtiensolution.vn/blog/..."
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="noindex" className="w-4 h-4 rounded border-slate-300 text-blue-500" />
                  <label htmlFor="noindex" className="text-sm text-slate-600">No Index (ẩn khỏi Google)</label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-5">
          {/* Publish box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Xuất bản</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Trạng thái</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản ngay</option>
                  <option value="scheduled">Lên lịch</option>
                </select>
              </div>
              {status === 'scheduled' && (
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Ngày xuất bản</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Hiển thị</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option>Công khai</option>
                  <option>Riêng tư</option>
                  <option>Bảo vệ bằng mật khẩu</option>
                </select>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Ảnh đại diện</h3>
            {featuredImage ? (
              <div className="relative rounded-lg overflow-hidden group">
                <img src={featuredImage} alt="" className="w-full h-40 object-cover" />
                <button
                  onClick={() => setFeaturedImage(null)}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setFeaturedImage('https://picsum.photos/seed/featured/600/300')}
                className="w-full h-40 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
              >
                <Upload size={24} />
                <span className="text-sm font-medium">Chọn hoặc tải ảnh lên</span>
                <span className="text-xs">JPG, PNG, WebP — Tối đa 5MB</span>
              </button>
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Chuyên mục</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="w-4 h-4 text-blue-500 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600">{cat}</span>
                </label>
              ))}
            </div>
            <button className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 mt-3 font-medium">
              <Plus size={14} />
              Thêm chuyên mục
            </button>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Thẻ (Tags)</h3>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Nhập thẻ..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                onClick={addTag}
                className="p-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-700">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Tác giả</h3>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Nguyễn Minh Tiến</option>
              <option>Trần Thị Hương</option>
              <option>Lê Văn Đức</option>
              <option>Phạm Thị Mai</option>
              <option>Vũ Thị Lan</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
