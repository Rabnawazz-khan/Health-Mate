"use client"

export default function VitalsList({ vitals }) {
  if (vitals.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center text-gray-500">
        <p>No vitals recorded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {vitals.slice(0, 5).map((vital) => (
        <div
          key={vital._id}
          className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition transform hover:scale-102"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold capitalize text-gray-800">{vital.type}</h3>
              <p className="text-2xl font-bold text-purple-500">{vital.value}</p>
              <p className="text-xs text-gray-400">{new Date(vital.date).toLocaleDateString()}</p>
            </div>
            <div className="text-3xl">
              {vital.type === "bp" && "🩺"}
              {vital.type === "sugar" && "🩸"}
              {vital.type === "weight" && "⚖️"}
              {vital.type === "heart-rate" && "💓"}
              {vital.type === "temperature" && "🌡️"}
              {vital.type === "oxygen" && "🫁"}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
