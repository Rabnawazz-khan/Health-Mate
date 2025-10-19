"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function TimelinePage() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      router.push("/login")
      return
    }

    fetchTimeline(token)
  }, [router])

  const fetchTimeline = async (token) => {
    try {
      const res = await fetch("/api/timeline", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        setItems(await res.json())
      }
    } catch (err) {
      console.error("Error fetching timeline:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading timeline...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-purple-500 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition hover:scale-105">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Health Timeline</h1>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No health records yet. Start by uploading a report or adding vitals.
            </p>
          ) : (
            <div className="relative border-l-2 border-gray-200 pl-6 space-y-10">
              {items.map((item, index) => (
                <div key={item._id} className="flex items-start gap-4 relative">
                  <div className="absolute -left-3 mt-1">
                    <div
                      className={`w-6 h-6 rounded-full border-4 ${
                        item.type === "report" ? "border-purple-500 bg-purple-400" : "border-green-500 bg-green-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                    <h3 className="font-bold text-lg text-gray-700">{item.title}</h3>
                    {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
                    {item.value && <p className="text-sm font-medium text-purple-500 mt-1">Value: {item.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
