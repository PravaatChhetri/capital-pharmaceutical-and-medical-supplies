import type { ApiResponse, ApiError, RanceLabProduct, RanceLabInventory, RanceLabAnalytics } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_RANCE_LAB_API_URL || "/api/rance-lab"
const API_KEY = process.env.NEXT_PUBLIC_RANCE_LAB_API_KEY || "demo-key"

class RanceLabApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Products
  async getProducts(params?: {
    category?: string
    search?: string
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }): Promise<ApiResponse<RanceLabProduct[]>> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request<RanceLabProduct[]>(`/products${query ? `?${query}` : ""}`)
  }

  async getProduct(id: string): Promise<ApiResponse<RanceLabProduct>> {
    return this.request<RanceLabProduct>(`/products/${id}`)
  }

  // Inventory
  async getInventory(productId?: string): Promise<ApiResponse<RanceLabInventory[]>> {
    const endpoint = productId ? `/inventory/${productId}` : "/inventory"
    return this.request<RanceLabInventory[]>(endpoint)
  }

  // Analytics
  async getAnalytics(productId?: string): Promise<ApiResponse<RanceLabAnalytics[]>> {
    const endpoint = productId ? `/analytics/${productId}` : "/analytics"
    return this.request<RanceLabAnalytics[]>(endpoint)
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>("/health")
  }
}

export const ranceLabApi = new RanceLabApiClient()
