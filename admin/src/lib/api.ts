import type {
  DashboardStats,
  PaginatedResponse,
  ApiResponse,
  Post,
  Product,
  Order,
  Service,
  Project,
  Contact,
  MediaItem,
  SitePage,
  User,
  SiteSettings,
} from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('admin_token')
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string>) },
    })

    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token')
        window.location.href = '/login'
      }
      throw new Error('Unauthorized')
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || `HTTP ${res.status}`)
    }

    return res.json()
  }

  // ==================== AUTH ====================
  async login(email: string, password: string) {
    return this.request<ApiResponse<{ token: string; user: User }>>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async getProfile() {
    return this.request<ApiResponse<User>>('/api/admin/auth/profile')
  }

  // ==================== DASHBOARD ====================
  async getDashboard() {
    return this.request<ApiResponse<DashboardStats>>('/api/admin/dashboard')
  }

  // ==================== POSTS ====================
  async getPosts(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<Post>>(`/api/admin/posts${query}`)
  }

  async getPost(id: string) {
    return this.request<ApiResponse<Post>>(`/api/admin/posts/${id}`)
  }

  async createPost(data: Partial<Post>) {
    return this.request<ApiResponse<Post>>('/api/admin/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePost(id: string, data: Partial<Post>) {
    return this.request<ApiResponse<Post>>(`/api/admin/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deletePost(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/posts/${id}`, { method: 'DELETE' })
  }

  async deletePosts(ids: string[]) {
    return this.request<ApiResponse<void>>('/api/admin/posts/bulk-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    })
  }

  // ==================== PRODUCTS ====================
  async getProducts(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<Product>>(`/api/admin/products${query}`)
  }

  async getProduct(id: string) {
    return this.request<ApiResponse<Product>>(`/api/admin/products/${id}`)
  }

  async createProduct(data: Partial<Product>) {
    return this.request<ApiResponse<Product>>('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: Partial<Product>) {
    return this.request<ApiResponse<Product>>(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteProduct(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/products/${id}`, { method: 'DELETE' })
  }

  // ==================== ORDERS ====================
  async getOrders(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<Order>>(`/api/admin/orders${query}`)
  }

  async getOrder(id: string) {
    return this.request<ApiResponse<Order>>(`/api/admin/orders/${id}`)
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request<ApiResponse<Order>>(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  // ==================== SERVICES ====================
  async getServices(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<Service>>(`/api/admin/services${query}`)
  }

  async createService(data: Partial<Service>) {
    return this.request<ApiResponse<Service>>('/api/admin/services', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateService(id: string, data: Partial<Service>) {
    return this.request<ApiResponse<Service>>(`/api/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteService(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/services/${id}`, { method: 'DELETE' })
  }

  // ==================== PROJECTS ====================
  async getProjects(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<Project>>(`/api/admin/projects${query}`)
  }

  async createProject(data: Partial<Project>) {
    return this.request<ApiResponse<Project>>('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateProject(id: string, data: Partial<Project>) {
    return this.request<ApiResponse<Project>>(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/projects/${id}`, { method: 'DELETE' })
  }

  // ==================== CONTACTS ====================
  async getContacts(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<Contact>>(`/api/admin/contacts${query}`)
  }

  async updateContactStatus(id: string, status: string) {
    return this.request<ApiResponse<Contact>>(`/api/admin/contacts/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  }

  async deleteContact(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/contacts/${id}`, { method: 'DELETE' })
  }

  // ==================== MEDIA ====================
  async getMedia(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<MediaItem>>(`/api/admin/media${query}`)
  }

  async uploadMedia(formData: FormData) {
    const token = this.getToken()
    const res = await fetch(`${API_BASE}/api/admin/media/upload`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    })
    if (!res.ok) throw new Error('Upload failed')
    return res.json() as Promise<ApiResponse<MediaItem>>
  }

  async deleteMedia(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/media/${id}`, { method: 'DELETE' })
  }

  // ==================== PAGES ====================
  async getPages(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<SitePage>>(`/api/admin/pages${query}`)
  }

  async createPage(data: Partial<SitePage>) {
    return this.request<ApiResponse<SitePage>>('/api/admin/pages', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePage(id: string, data: Partial<SitePage>) {
    return this.request<ApiResponse<SitePage>>(`/api/admin/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deletePage(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/pages/${id}`, { method: 'DELETE' })
  }

  // ==================== USERS ====================
  async getUsers(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<PaginatedResponse<User>>(`/api/admin/users${query}`)
  }

  async createUser(data: Partial<User> & { password: string }) {
    return this.request<ApiResponse<User>>('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateUser(id: string, data: Partial<User>) {
    return this.request<ApiResponse<User>>(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteUser(id: string) {
    return this.request<ApiResponse<void>>(`/api/admin/users/${id}`, { method: 'DELETE' })
  }

  // ==================== SETTINGS ====================
  async getSettings() {
    return this.request<ApiResponse<SiteSettings>>('/api/admin/settings')
  }

  async updateSettings(data: Partial<SiteSettings>) {
    return this.request<ApiResponse<SiteSettings>>('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // ==================== ANALYTICS ====================
  async getAnalytics(params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return this.request<ApiResponse<Record<string, unknown>>>(`/api/admin/analytics${query}`)
  }
}

export const api = new ApiClient()
