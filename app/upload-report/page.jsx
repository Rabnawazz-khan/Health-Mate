"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UploadReportPage() {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [reportType, setReportType] = useState("blood-test")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files) setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setMessage("Please select a file")
      setIsError(true)
      return
    }

    setLoading(true)
    setMessage("")
    setIsError(false)

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]

      if (!token) {
        router.push("/login")
        return
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("reportType", reportType)

      // Mock API call (replace with real API)
      const mockResponse = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              reportData: {
                beneficiary: { name: "John Doe", age: 35, gender: "Male", id: "B12345" },
                reportType,
                results: [
                  { test: "Hemoglobin (HB)", result: "13.5", unit: "g/dL", ref: "13-17", abnormal: false },
                  { test: "WBC", result: "12000", unit: "/µL", ref: "4-11", abnormal: true },
                  { test: "RBC", result: "4.7", unit: "million/µL", ref: "4.5-5.9", abnormal: false },
                ],
              },
            }),
          2000
        )
      )

      if (!mockResponse.ok) {
        setMessage("Upload failed")
        setIsError(true)
        return
      }

      setMessage("Report uploaded successfully!")
      setIsError(false)

      // Redirect to report view page
      router.push({
        pathname: "/report-view",
        query: { data: JSON.stringify(mockResponse.reportData) },
      })
    } catch (err) {
      setMessage("An error occurred during upload")
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 transform transition hover:scale-105">
        <Link href="/dashboard" className="text-purple-500 hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">Upload Medical Report</h1>
        <p className="text-gray-500 mb-6">
          Upload your medical reports (PDF, JPG, PNG) for AI analysis
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="blood-test">Blood Test</option>
              <option value="xray">X-Ray</option>
              <option value="ultrasound">Ultrasound</option>
              <option value="prescription">Prescription</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select File</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <div className="text-5xl mb-2 animate-bounce">📁</div>
              <p className="font-medium">{file ? file.name : "Click to upload or drag and drop"}</p>
              <p className="text-sm text-gray-400">PDF, JPG, or PNG</p>
            </div>
          </div>

          {message && (
            <div
              className={`px-4 py-2 rounded-xl text-sm ${
                isError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload & Analyze"}
          </button>
        </form>
      </div>
    </div>
  )
}
