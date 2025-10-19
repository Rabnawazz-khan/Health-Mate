"use client"

import Link from "next/link"

export default function ReportList({ reports }) {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center text-gray-500">
        <p className="mb-2">No reports uploaded yet</p>
        <Link
          href="/upload-report"
          className="text-purple-500 hover:underline font-medium"
        >
          Upload your first report
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report._id}
          className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition transform hover:scale-102"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800">{report.fileName}</h3>
              <p className="text-sm text-gray-500">Type: {report.reportType}</p>
              <p className="text-xs text-gray-400">{new Date(report.uploadDate).toLocaleDateString()}</p>
              {report.summary && (
                <p className="text-sm mt-2 line-clamp-2 text-gray-600">{report.summary}</p>
              )}
            </div>
            <Link
              href={`/report/${report._id}`}
              className="text-purple-500 hover:underline font-medium whitespace-nowrap self-start"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
