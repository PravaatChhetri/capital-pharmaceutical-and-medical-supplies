"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Search, Filter, Calendar, Package } from "lucide-react"

// Sample product data - using local data instead of API
const products = [
  {
    id: 1,
    name: "Amoxicillin 500mg Capsules",
    category: "Prescription Medications",
    description: "Broad-spectrum antibiotic for bacterial infections",
    image: "/images/products/amoxicillin.jpg",
    expiryDate: "2025-12-31",
    manufacturer: "PharmaCorp",
    batchNumber: "AMX2024001",
    inStock: true,
    stockQuantity: 150,
    price: 25.99,
    currency: "USD",
  },
  {
    id: 2,
    name: "Digital Blood Pressure Monitor",
    category: "Medical Devices",
    description: "Automatic digital BP monitor with memory function",
    image: "/images/products/blood-pressure-monitor.jpg",
    expiryDate: "2027-06-15",
    manufacturer: "MedTech Solutions",
    batchNumber: "DBP2024002",
    inStock: true,
    stockQuantity: 75,
    price: 89.99,
    currency: "USD",
  },
  {
    id: 3,
    name: "Surgical Gloves (Latex-Free)",
    category: "Surgical Supplies",
    description: "Sterile, powder-free surgical gloves - Box of 100",
    image: "/images/products/surgical-gloves.jpg",
    expiryDate: "2026-03-20",
    manufacturer: "SafeHands Medical",
    batchNumber: "SGL2024003",
    inStock: true,
    stockQuantity: 200,
    price: 45.99,
    currency: "USD",
  },
  {
    id: 4,
    name: "Aspirin 325mg Tablets",
    category: "Prescription Medications",
    description: "Pain reliever and anti-inflammatory medication",
    image: "/images/products/aspirin.jpg",
    expiryDate: "2025-08-10",
    manufacturer: "Generic Pharma",
    batchNumber: "ASP2024004",
    inStock: false,
    stockQuantity: 0,
    price: 12.99,
    currency: "USD",
  },
  {
    id: 5,
    name: "Centrifuge Machine",
    category: "Laboratory Equipment",
    description: "High-speed laboratory centrifuge for sample separation",
    image: "/images/products/centrifuge.jpg",
    expiryDate: "2030-01-01",
    manufacturer: "LabEquip Pro",
    batchNumber: "CTF2024005",
    inStock: true,
    stockQuantity: 15,
    price: 2499.99,
    currency: "USD",
  },
  {
    id: 6,
    name: "Bandages Assorted Pack",
    category: "Surgical Supplies",
    description: "Sterile adhesive bandages in various sizes",
    image: "/images/products/bandages.jpg",
    expiryDate: "2026-11-30",
    manufacturer: "WoundCare Plus",
    batchNumber: "BND2024006",
    inStock: true,
    stockQuantity: 300,
    price: 18.99,
    currency: "USD",
  },
  {
    id: 7,
    name: "Insulin Pen Needles",
    category: "Medical Devices",
    description: "Ultra-fine insulin pen needles - 32G x 4mm",
    image: "/images/products/insulin-needles.jpg",
    expiryDate: "2027-02-28",
    manufacturer: "DiabetesCare",
    batchNumber: "IPN2024007",
    inStock: true,
    stockQuantity: 120,
    price: 35.99,
    currency: "USD",
  },
  {
    id: 8,
    name: "Microscope Slides",
    category: "Laboratory Equipment",
    description: "Pre-cleaned glass microscope slides - Pack of 50",
    image: "/images/products/microscope-slides.jpg",
    expiryDate: "2028-12-31",
    manufacturer: "LabGlass Co",
    batchNumber: "MCS2024008",
    inStock: true,
    stockQuantity: 85,
    price: 24.99,
    currency: "USD",
  },
  {
    id: 9,
    name: "Betadine Solution",
    category: "Surgical Supplies",
    description: "Antiseptic solution for wound cleaning - 500ml",
    image: "/images/products/betadine.jpg",
    expiryDate: "2025-05-15",
    manufacturer: "Antiseptic Labs",
    batchNumber: "BET2024009",
    inStock: true,
    stockQuantity: 95,
    price: 8.99,
    currency: "USD",
  },
  {
    id: 10,
    name: "Lisinopril 10mg Tablets",
    category: "Prescription Medications",
    description: "ACE inhibitor for hypertension treatment",
    image: "/images/products/lisinopril.jpg",
    expiryDate: "2024-12-31",
    manufacturer: "CardioMed",
    batchNumber: "LIS2024010",
    inStock: true,
    stockQuantity: 180,
    price: 22.99,
    currency: "USD",
  },
]

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLetter, setSelectedLetter] = useState("")
  const [expiryFilter, setExpiryFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  const categories = [...new Set(products.map((product) => product.category))]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLetter = !selectedLetter || product.name.startsWith(selectedLetter)

      const matchesCategory = !categoryFilter || product.category === categoryFilter

      const matchesExpiry =
        !expiryFilter ||
        (() => {
          const expiryDate = new Date(product.expiryDate)
          const now = new Date()
          const sixMonthsFromNow = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
          const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)

          switch (expiryFilter) {
            case "expired":
              return expiryDate < now
            case "6months":
              return expiryDate >= now && expiryDate <= sixMonthsFromNow
            case "1year":
              return expiryDate >= now && expiryDate <= oneYearFromNow
            case "valid":
              return expiryDate > now
            default:
              return true
          }
        })()

      return matchesSearch && matchesLetter && matchesCategory && matchesExpiry
    })
  }, [searchTerm, selectedLetter, expiryFilter, categoryFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedLetter("")
    setExpiryFilter("")
    setCategoryFilter("")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive range of pharmaceutical and medical supplies to meet all your healthcare needs. Quality
            assured and competitively priced.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Alphabet Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by First Letter:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedLetter === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLetter("")}
              >
                All
              </Button>
              {alphabet.map((letter) => (
                <Button
                  key={letter}
                  variant={selectedLetter === letter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLetter(letter)}
                  className="w-10 h-10 p-0"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          {/* Other Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</label>
              <Select value={expiryFilter} onValueChange={setExpiryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="valid">Valid Products Only</SelectItem>
                  <SelectItem value="6months">Expiring in 6 Months</SelectItem>
                  <SelectItem value="1year">Expiring in 1 Year</SelectItem>
                  <SelectItem value="expired">Expired Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-shadow cursor-pointer">
                  <Link href={`/products/${product.id}`}>
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg?height=200&width=300"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
