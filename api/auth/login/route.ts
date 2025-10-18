import { type NextRequest, NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"
import { findUserByEmail } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 })
    }

    const user = findUserByEmail(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken(user._id)

    return NextResponse.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    })
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
