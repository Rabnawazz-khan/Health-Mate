import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth"
import { getVitalsByUserId } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const token = extractToken(request.headers.get("authorization"))

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const vitals = getVitalsByUserId(decoded.userId)

    return NextResponse.json(vitals)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch vitals" }, { status: 500 })
  }
}
