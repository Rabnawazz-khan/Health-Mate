"use client"

import { useRouter } from "next/navigation"

export default function DashboardHeader({ user }) {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0"
    router.push("/login")
  }

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div>
          <h1 className="text-2xl font-bold text-purple-600">HealthMate</h1>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-700 font-medium">
              Welcome, <span className="text-purple-600">{user.name}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
