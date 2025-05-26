// Core data types for Rance Lab integration
export interface RanceLabProduct {
  id: string
  name: string
  category: string
  description: string
  fullDescription: string
  image: string
  expiryDate: string
  manufacturer: string
  batchNumber: string
  inStock: boolean
  stockQuantity: number
  price: number
  currency: string
  ingredients: string
  usage: string
  storage: string
  warnings: string
  pdfBrochure: string
  certifications: string[]
  lastUpdated: string
}

export interface RanceLabInventory {
  productId: string
  quantity: number
  location: string
  lastRestocked: string
  minimumThreshold: number
  status: "in-stock" | "low-stock" | "out-of-stock" | "discontinued"
}

export interface RanceLabAnalytics {
  productId: string
  views: number
  orders: number
  revenue: number
  popularityScore: number
  trendDirection: "up" | "down" | "stable"
}

export interface RanceLabSupplier {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  address: string
  certifications: string[]
  rating: number
  products: string[]
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  error: string
  code: number
  details?: string
  timestamp: string
}
