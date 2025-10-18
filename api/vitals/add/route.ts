import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth"
import { addVital } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const token = extractToken(request.headers.get("authorization"))

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { type, value, notes } = await request.json()

    if (!type || !value) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const vital = addVital({
      userId: decoded.userId,
      type,
      value,
      notes,
      date: new Date(),
    })

    return NextResponse.json(vital)
  } catch (error) {
    return NextResponse.json({ message: "Failed to add vital" }, { status: 500 })
  }
}
