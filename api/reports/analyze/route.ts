import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, extractToken } from "@/lib/auth"
import { analyzeReport } from "@/lib/gemini"
import { db } from "@/lib/db"

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

    const { reportId, fileContent, reportType } = await request.json()

    if (!reportId || !fileContent) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const analysis = await analyzeReport(fileContent, reportType)

    // Update report with analysis
    const report = db.reports.find((r) => r._id === reportId)
    if (report) {
      report.analysis = analysis
      report.analyzedAt = new Date()
    }

    return NextResponse.json(analysis)
  } catch (error) {
    return NextResponse.json({ message: "Analysis failed" }, { status: 500 })
  }
}
