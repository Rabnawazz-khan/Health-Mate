import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth"
import { getReportsByUserId, getVitalsByUserId } from "@/lib/db"

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

    const reports = getReportsByUserId(decoded.userId).map((r) => ({
      ...r,
      type: "report",
      title: r.fileName,
      description: `Report Type: ${r.reportType}`,
    }))

    const vitals = getVitalsByUserId(decoded.userId).map((v) => ({
      ...v,
      type: "vital",
      title: `${v.type.toUpperCase()}: ${v.value}`,
    }))

    const timeline = [...reports, ...vitals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(timeline)
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch timeline" }, { status: 500 })
  }
}
