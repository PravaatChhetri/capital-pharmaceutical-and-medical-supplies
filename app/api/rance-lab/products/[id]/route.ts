import { type NextRequest, NextResponse } from "next/server"
import type { RanceLabProduct, ApiResponse } from "@/lib/types"

// Mock product data - same as in the main products route
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
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const product = mockProducts.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
          code: 404,
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      )
    }

    // Update the lastUpdated timestamp to simulate real-time data
    product.lastUpdated = new Date().toISOString()

    const response: ApiResponse<RanceLabProduct> = {
      data: product,
      success: true,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch product",
        code: 500,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
