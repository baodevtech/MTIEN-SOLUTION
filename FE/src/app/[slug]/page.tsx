import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const ADMIN_API_URL = process.env.ADMIN_API_URL || 'http://localhost:3001'
const API_KEY = process.env.REVALIDATION_SECRET || ''
const BASE_URL = process.env.APP_URL || 'https://mtiensolution.vn'

interface PageData {
  id: string
  title: string
  slug: string
  content: string
  template: string
  status: string
  seo: {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
    noIndex?: boolean
  }
  createdAt: string
  updatedAt: string
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string): Promise<PageData | null> {
  try {
    const res = await fetch(`${ADMIN_API_URL}/api/public/pages?slug=${slug}`, {
      headers: { 'x-api-key': API_KEY },
      next: { tags: ['pages'] },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.success ? json.data : null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}

  const seo = page.seo || {}
  const title = seo.title || page.title
  const description = seo.description || ''

  return {
    title,
    description,
    keywords: seo.keywords,
    robots: seo.noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: { canonical: `${BASE_URL}/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${slug}`,
      siteName: 'MTIEN Solution',
      type: 'website',
      locale: 'vi_VN',
      ...(seo.ogImage && { images: [{ url: seo.ogImage }] }),
    },
  }
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) return notFound()

  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 border-b border-slate-200 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{page.title}</h1>
        </div>
        {page.content ? (
          <article
            className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <p className="text-slate-500 italic">Trang này chưa có nội dung.</p>
        )}
      </div>
    </div>
  )
}
