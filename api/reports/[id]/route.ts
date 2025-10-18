import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = extractToken(request.headers.get("authorization"))

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const report = db.reports.find((r) => r._id === params.id && r.userId === decoded.userId)

    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 })
    }

    return NextResponse.json(report)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch report" }, { status: 500 })
  }
}
