"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductDetailSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useRanceLabProduct, useRanceLabInventory } from "@/hooks/use-rance-lab-data"
import {
  Download,
  Calendar,
  Package,
  Building,
  Hash,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  RefreshCw,
} from "lucide-react"

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { product, loading, error, refetch } = useRanceLabProduct(productId)
  const { inventory, loading: inventoryLoading } = useRanceLabInventory(productId)

  // Auto-refresh product data every 2 minutes
  useEffect(() => {
    const interval = setInterval(refetch, 120000)
    return () => clearInterval(interval)
  }, [refetch])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load product</h3>
        <p className="text-gray-600 mb-4">{error || "Product not found"}</p>
        <Button onClick={refetch}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  const isExpiringSoon = () => {
    const expiryDate = new Date(product.expiryDate)
    const sixMonthsFromNow = new Date()
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
    return expiryDate <= sixMonthsFromNow
  }

  const isExpired = () => {
    const expiryDate = new Date(product.expiryDate)
    const now = new Date()
    return expiryDate < now
  }

  const getStockStatus = () => {
    if (!product.inStock || product.stockQuantity === 0) return "out-of-stock"
    if (product.stockQuantity <= 10) return "low-stock"
    return "in-stock"
  }

  const openWhatsApp = () => {
    const phoneNumber = "97517598338"
    const message = `Hi, I'm interested in ${product.name} (ID: ${product.id}). Could you please provide more information about this product?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const stockStatus = getStockStatus()

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        {/* Main Product Information */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                priority
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Badge variant={product.inStock ? "default" : "destructive"} className="text-sm">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                {stockStatus === "low-stock" && (
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    Low Stock ({product.stockQuantity} left)
                  </Badge>
                )}
              </div>
              {product.price && (
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-lg px-3 py-1">
                    {product.currency} {product.price.toFixed(2)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Download Brochure */}
            <Button asChild variant="outline" className="w-full">
              <Link href={product.pdfBrochure} target="_blank">
                <Download className="mr-2 h-4 w-4" />
                Download Product Brochure (PDF)
              </Link>
            </Button>

            {/* Real-time Data Indicator */}
            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date(product.lastUpdated).toLocaleString()}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Key Information Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Expiry Date</p>
                      <p
                        className={`text-sm ${isExpired() ? "text-red-600" : isExpiringSoon() ? "text-orange-600" : "text-gray-600"}`}
                      >
                        {new Date(product.expiryDate).toLocaleDateString()}
                        {isExpired() && (
                          <span className="ml-2 text-red-600">
                            <AlertTriangle className="inline h-4 w-4" />
                          </span>
                        )}
                        {isExpiringSoon() && !isExpired() && (
                          <span className="ml-2 text-orange-600">
                            <AlertTriangle className="inline h-4 w-4" />
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Stock Status</p>
                      <p
                        className={`text-sm flex items-center ${
                          stockStatus === "in-stock"
                            ? "text-green-600"
                            : stockStatus === "low-stock"
                              ? "text-orange-600"
                              : "text-red-600"
                        }`}
                      >
                        {stockStatus === "in-stock" ? (
                          <>
                            <CheckCircle className="inline h-4 w-4 mr-1" />
                            {product.stockQuantity} units available
                          </>
                        ) : stockStatus === "low-stock" ? (
                          <>
                            <AlertTriangle className="inline h-4 w-4 mr-1" />
                            {product.stockQuantity} units left
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="inline h-4 w-4 mr-1" />
                            Out of Stock
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Manufacturer</p>
                      <p className="text-sm text-gray-600">{product.manufacturer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Hash className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Batch Number</p>
                      <p className="text-sm text-gray-600">{product.batchNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-800">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 flex-1">
                <Link href="/contact">Request Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link href="/contact">Contact Sales</Link>
              </Button>
              <Button
                onClick={openWhatsApp}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Inventory Information */}
        {!inventoryLoading && inventory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Inventory Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventory.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{item.location}</h4>
                      <Badge
                        variant={
                          item.status === "in-stock"
                            ? "default"
                            : item.status === "low-stock"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm text-gray-600">
                      Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}
                    </p>
                    {item.quantity <= item.minimumThreshold && (
                      <p className="text-sm text-orange-600 mt-1">
                        <AlertTriangle className="inline h-3 w-3 mr-1" />
                        Below minimum threshold
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Ingredients/Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Usage Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{product.usage}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Storage Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{product.storage}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
                Warnings & Precautions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{product.warnings}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}
