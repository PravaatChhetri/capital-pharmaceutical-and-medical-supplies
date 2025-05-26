import { type NextRequest, NextResponse } from "next/server"
import type { RanceLabProduct, ApiResponse } from "@/lib/types"

// Mock data - In production, this would connect to Rance Lab's actual API
const mockProducts: RanceLabProduct[] = [
  {
    id: "1",
    name: "Amoxicillin 500mg Capsules",
    category: "Prescription Medications",
    description: "Broad-spectrum antibiotic for bacterial infections",
    fullDescription:
      "Amoxicillin is a penicillin-type antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria. This antibiotic treats only bacterial infections and will not work for viral infections.",
    image: "/images/products/amoxicillin.jpg",
    expiryDate: "2025-12-31",
    manufacturer: "PharmaCorp",
    batchNumber: "AMX2024001",
    inStock: true,
    stockQuantity: 150,
    price: 25.99,
    currency: "USD",
    ingredients: "Amoxicillin trihydrate, microcrystalline cellulose, sodium starch glycolate, magnesium stearate",
    usage:
      "Take by mouth with or without food as directed by your doctor, usually every 8 or 12 hours. The dosage is based on your medical condition and response to treatment.",
    storage:
      "Store at room temperature away from light and moisture. Do not store in the bathroom. Keep all medications away from children and pets.",
    warnings: "May cause allergic reactions in patients with penicillin allergy. Consult your doctor before use.",
    pdfBrochure: "/brochures/amoxicillin-info.pdf",
    certifications: ["FDA Approved", "GMP Certified"],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Digital Blood Pressure Monitor",
    category: "Medical Devices",
    description: "Automatic digital BP monitor with memory function",
    fullDescription:
      "Advanced digital blood pressure monitor featuring automatic inflation, memory storage for multiple readings, and large LCD display. Clinically validated for accuracy and suitable for home and professional use.",
    image: "/images/products/blood-pressure-monitor.jpg",
    expiryDate: "2027-06-15",
    manufacturer: "MedTech Solutions",
    batchNumber: "DBP2024002",
    inStock: true,
    stockQuantity: 75,
    price: 89.99,
    currency: "USD",
    ingredients: "Electronic components, LCD display, inflatable cuff, pressure sensors",
    usage:
      "Wrap cuff around upper arm, press start button, remain still during measurement. Device automatically inflates and deflates.",
    storage: "Store in dry place at room temperature. Avoid extreme temperatures and humidity.",
    warnings:
      "Not suitable for patients with irregular heartbeat. Consult healthcare provider for proper interpretation of readings.",
    pdfBrochure: "/brochures/bp-monitor-manual.pdf",
    certifications: ["CE Marked", "ISO 13485"],
    lastUpdated: new Date().toISOString(),
  },
  // Add more mock products as needed...
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const sortBy = searchParams.get("sortBy") || "name"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Filter products
    let filteredProducts = mockProducts

    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
      )
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue: any = a[sortBy as keyof RanceLabProduct]
      let bValue: any = b[sortBy as keyof RanceLabProduct]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
    })

    // Paginate
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    const response: ApiResponse<RanceLabProduct[]> = {
      data: paginatedProducts,
      success: true,
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        code: 500,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
