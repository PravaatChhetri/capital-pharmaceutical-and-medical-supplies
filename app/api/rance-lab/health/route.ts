import { NextResponse } from "next/server"
import type { ApiResponse } from "@/lib/types"

export async function GET() {
  try {
    // Simulate health check
    await new Promise((resolve) => setTimeout(resolve, 100))

    const response: ApiResponse<{ status: string }> = {
      data: { status: "healthy" },
      success: true,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Health check failed",
        code: 500,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
