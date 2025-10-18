import { type NextRequest, NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"
import { findUserByEmail, createUser } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (findUserByEmail(email)) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const user = createUser({
      email,
      password, // In production, hash this!
      name,
      createdAt: new Date(),
    })

    const token = generateToken(user._id)

    return NextResponse.json({ token, user: { id: user._id, email, name } })
  } catch (error) {
    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}
