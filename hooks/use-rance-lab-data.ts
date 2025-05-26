"use client"

import { useState, useEffect, useCallback } from "react"
import { ranceLabApi } from "@/lib/api-client"
import type { RanceLabProduct, RanceLabInventory, ApiResponse } from "@/lib/types"

interface UseRanceLabDataOptions {
  category?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  autoRefresh?: boolean
  refreshInterval?: number
}

interface UseRanceLabDataReturn {
  products: RanceLabProduct[]
  loading: boolean
  error: string | null
  pagination: ApiResponse<RanceLabProduct[]>["pagination"]
  refetch: () => Promise<void>
  hasMore: boolean
}

export function useRanceLabData(options: UseRanceLabDataOptions = {}): UseRanceLabDataReturn {
  const [products, setProducts] = useState<RanceLabProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<ApiResponse<RanceLabProduct[]>["pagination"]>()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await ranceLabApi.getProducts(options)

      if (response.success) {
        setProducts(response.data)
        setPagination(response.pagination)
      } else {
        setError(response.message || "Failed to fetch products")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [options.category, options.search, options.page, options.limit, options.sortBy, options.sortOrder, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh functionality
  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchData, options.refreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchData, options.autoRefresh, options.refreshInterval])

  const hasMore = pagination ? pagination.page < pagination.totalPages : false

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchData,
    hasMore,
  }
}

export function useRanceLabProduct(id: string) {
  const [product, setProduct] = useState<RanceLabProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const response = await ranceLabApi.getProduct(id)

      if (response.success) {
        setProduct(response.data)
      } else {
        setError(response.message || "Failed to fetch product")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  }
}

export function useRanceLabInventory(productId?: string) {
  const [inventory, setInventory] = useState<RanceLabInventory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await ranceLabApi.getInventory(productId)

      if (response.success) {
        setInventory(response.data)
      } else {
        setError(response.message || "Failed to fetch inventory")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [productId])

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  return {
    inventory,
    loading,
    error,
    refetch: fetchInventory,
  }
}
