import { type NextRequest, NextResponse } from "next/server"
import type { RanceLabInventory, ApiResponse } from "@/lib/types"

// Mock inventory data
const mockInventory: RanceLabInventory[] = [
  {
    productId: "1",
    quantity: 150,
    location: "Main Warehouse - Thimphu",
    lastRestocked: "2024-01-15T10:30:00Z",
    minimumThreshold: 50,
    status: "in-stock",
  },
  {
    productId: "1",
    quantity: 25,
    location: "Branch Office - Paro",
    lastRestocked: "2024-01-10T14:20:00Z",
    minimumThreshold: 20,
    status: "low-stock",
  },
  {
    productId: "2",
    quantity: 75,
    location: "Main Warehouse - Thimphu",
    lastRestocked: "2024-01-12T09:15:00Z",
    minimumThreshold: 30,
    status: "in-stock",
  },
]

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const inventory = mockInventory.filter((item) => item.productId === productId)

    const response: ApiResponse<RanceLabInventory[]> = {
      data: inventory,
      success: true,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch inventory",
        code: 500,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
