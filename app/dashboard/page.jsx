"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DashboardHeader from "@/components/dashboard-header"
import ReportList from "@/components/report-list"
import VitalsList from "@/components/vitals-list"

export default function DashboardPage() {
  const router = useRouter()
  const [reports, setReports] = useState([])
  const [vitals, setVitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      router.push("/login")
      return
    }

    fetchDashboardData(token)
  }, [router])

  const fetchDashboardData = async (token) => {
    try {
      const [reportsRes, vitalsRes, userRes] = await Promise.all([
        fetch("/api/reports", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/vitals", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
      ])

      if (reportsRes.ok) setReports(await reportsRes.json())
      if (vitalsRes.ok) setVitals(await vitalsRes.json())
      if (userRes.ok) setUser(await userRes.json())
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading your health data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <Link
            href="/upload-report"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-6 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-3 animate-bounce">📄</div>
            <h3 className="font-bold text-lg">Upload Report</h3>
            <p className="text-sm opacity-90 mt-1">Add medical reports</p>
          </Link>

          <Link
            href="/add-vitals"
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-6 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-3 animate-bounce">💓</div>
            <h3 className="font-bold text-lg">Add Vitals</h3>
            <p className="text-sm opacity-90 mt-1">Track BP, Sugar, Weight</p>
          </Link>

          <Link
            href="/timeline"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white p-6 rounded-2xl shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-3 animate-bounce">📊</div>
            <h3 className="font-bold text-lg">Timeline</h3>
            <p className="text-sm opacity-90 mt-1">View health history</p>
          </Link>
        </div>

        {/* Recent Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Recent Reports</h2>
            <ReportList reports={reports} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Recent Vitals</h2>
            <VitalsList vitals={vitals} />
          </div>
        </div>
      </main>
    </div>
  )
}
