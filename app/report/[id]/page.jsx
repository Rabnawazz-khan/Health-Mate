"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

export default function ReportPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = params.id

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]

    if (!token) {
      router.push("/login")
      return
    }

    fetchReport(token)
  }, [router, reportId])

  const fetchReport = async (token) => {
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        setReport(await res.json())
      }
    } catch (err) {
      console.error("Error fetching report:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading report...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/dashboard" className="text-purple-500 hover:underline mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">Report not found</p>
          </div>
        </div>
      </div>
    )
  }

  const analysis = report.analysis

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-purple-500 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition hover:scale-105">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{report.fileName}</h1>
              <p className="text-gray-500">Type: {report.reportType}</p>
              <p className="text-sm text-gray-400">{new Date(report.uploadDate).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  language === "en" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("urdu")}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  language === "urdu" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                اردو
              </button>
            </div>
          </div>

          {/* Analysis */}
          {analysis ? (
            <div className="space-y-8">
              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold mb-3 text-gray-700">{language === "en" ? "Summary" : "خلاصہ"}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {language === "en" ? analysis.summary_en : analysis.summary_urdu}
                </p>
              </div>

              {/* Abnormal Values */}
              {analysis.abnormal_values && analysis.abnormal_values.length > 0 && (
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h2 className="text-xl font-bold mb-3 text-red-600">
                    {language === "en" ? "Abnormal Values" : "غیر معمولی اقدار"}
                  </h2>
                  <ul className="space-y-2 list-disc list-inside text-red-700">
                    {analysis.abnormal_values.map((value, idx) => (
                      <li key={idx}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Doctor Questions */}
              {analysis.doctor_questions && analysis.doctor_questions.length > 0 && (
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h2 className="text-xl font-bold mb-3 text-purple-600">
                    {language === "en" ? "Questions for Your Doctor" : "ڈاکٹر سے سوالات"}
                  </h2>
                  <ul className="space-y-2 list-decimal list-inside text-purple-700">
                    {analysis.doctor_questions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Foods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.foods_to_avoid && analysis.foods_to_avoid.length > 0 && (
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h3 className="font-bold mb-3 text-red-600">
                      {language === "en" ? "Foods to Avoid" : "بچنے والی غذائیں"}
                    </h3>
                    <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                      {analysis.foods_to_avoid.map((food, idx) => (
                        <li key={idx}>{food}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.recommended_foods && analysis.recommended_foods.length > 0 && (
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-bold mb-3 text-green-600">
                      {language === "en" ? "Recommended Foods" : "تجویز کردہ غذائیں"}
                    </h3>
                    <ul className="list-disc list-inside text-green-700 text-sm space-y-1">
                      {analysis.recommended_foods.map((food, idx) => (
                        <li key={idx}>{food}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Home Remedies */}
              {analysis.home_remedies && analysis.home_remedies.length > 0 && (
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                  <h3 className="font-bold mb-3 text-cyan-600">
                    {language === "en" ? "Home Remedies" : "گھریلو علاج"}
                  </h3>
                  <ul className="list-disc list-inside text-cyan-700 text-sm space-y-1">
                    {analysis.home_remedies.map((remedy, idx) => (
                      <li key={idx}>{remedy}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  <strong>Disclaimer:</strong> {analysis.disclaimer}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <p className="text-gray-500">AI analysis is being processed. Please check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
