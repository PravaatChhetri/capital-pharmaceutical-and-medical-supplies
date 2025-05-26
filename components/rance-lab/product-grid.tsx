"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCardSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useRanceLabData } from "@/hooks/use-rance-lab-data"
import { Search, Filter, Calendar, Package, AlertTriangle, RefreshCw } from "lucide-react"

interface ProductGridProps {
  initialCategory?: string
  showFilters?: boolean
  limit?: number
}

export function ProductGrid({ initialCategory, showFilters = true, limit = 12 }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)

  const { products, loading, error, pagination, refetch, hasMore } = useRanceLabData({
    category: selectedCategory || undefined,
    search: searchTerm || undefined,
    page,
    limit,
    sortBy,
    sortOrder,
    autoRefresh: true,
    refreshInterval: 30000, // Refresh every 30 seconds
  })

  const categories = ["Prescription Medications", "Medical Devices", "Surgical Supplies", "Laboratory Equipment"]

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setPage(1) // Reset to first page when searching
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value)
    setPage(1)
  }

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-")
    setSortBy(field)
    setSortOrder(order as "asc" | "desc")
    setPage(1)
  }

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1)
    }
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load products</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={refetch}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Filters */}
        {showFilters && (
          <div className="bg-white border-b pb-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="expiryDate-asc">Expiry Date (Earliest)</SelectItem>
                    <SelectItem value="lastUpdated-desc">Recently Updated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("")
                    setSortBy("name")
                    setSortOrder("asc")
                    setPage(1)
                  }}
                  className="w-full"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Results Info */}
            <div className="text-center text-gray-600">
              {pagination && (
                <>
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
                </>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading && products.length === 0
            ? // Initial loading state
              Array.from({ length: limit }).map((_, index) => <ProductCardSkeleton key={index} />)
            : products.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <Link href={`/products/${product.id}`}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          {product.stockQuantity <= 10 && product.inStock && (
                            <Badge variant="outline" className="bg-orange-100 text-orange-800">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                        {product.price && (
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {product.currency} {product.price.toFixed(2)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            Expires: {new Date(product.expiryDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Package className="mr-1 h-3 w-3" />
                            Stock: {product.stockQuantity} units
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
        </div>

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center pt-6">
            <Button onClick={loadMore} variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}

        {/* Loading More Indicator */}
        {loading && products.length > 0 && (
          <div className="text-center py-4">
            <div className="inline-flex items-center text-gray-600">
              <RefreshCw className="animate-spin mr-2 h-4 w-4" />
              Loading more products...
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
                setPage(1)
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
