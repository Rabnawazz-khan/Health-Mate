import { ObjectId } from "mongodb"
import { getDatabase } from "./mongodb"
import bcrypt from "bcryptjs"

// User operations
export async function findUserByEmail(email: string) {
  const db = await getDatabase()
  return db.collection("users").findOne({ email })
}

export async function findUserById(id: string) {
  const db = await getDatabase()
  try {
    return db.collection("users").findOne({ _id: new ObjectId(id) })
  } catch {
    return null
  }
}

export async function createUser(user: any) {
  const db = await getDatabase()
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const newUser = {
    ...user,
    password: hashedPassword,
    createdAt: new Date(),
  }
  const result = await db.collection("users").insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

// Report operations
export async function addReport(report: any) {
  const db = await getDatabase()
  const newReport = {
    ...report,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const result = await db.collection("reports").insertOne(newReport)
  return { ...newReport, _id: result.insertedId }
}

export async function getReportsByUserId(userId: string) {
  const db = await getDatabase()
  try {
    return await db
      .collection("reports")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray()
  } catch {
    return []
  }
}

export async function getReportById(reportId: string) {
  const db = await getDatabase()
  try {
    return await db.collection("reports").findOne({ _id: new ObjectId(reportId) })
  } catch {
    return null
  }
}

export async function updateReport(reportId: string, updates: any) {
  const db = await getDatabase()
  try {
    const result = await db
      .collection("reports")
      .findOneAndUpdate(
        { _id: new ObjectId(reportId) },
        { $set: { ...updates, updatedAt: new Date() } },
        { returnDocument: "after" },
      )
    return result.value
  } catch {
    return null
  }
}

// Vitals operations
export async function addVital(vital: any) {
  const db = await getDatabase()
  const newVital = {
    ...vital,
    createdAt: new Date(),
  }
  const result = await db.collection("vitals").insertOne(newVital)
  return { ...newVital, _id: result.insertedId }
}

export async function getVitalsByUserId(userId: string) {
  const db = await getDatabase()
  try {
    return await db
      .collection("vitals")
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray()
  } catch {
    return []
  }
}

// Timeline operations (combined reports and vitals)
export async function getTimelineByUserId(userId: string) {
  const db = await getDatabase()
  try {
    const userObjectId = new ObjectId(userId)
    const reports = await db.collection("reports").find({ userId: userObjectId }).toArray()
    const vitals = await db.collection("vitals").find({ userId: userObjectId }).toArray()

    const timeline = [
      ...reports.map((r) => ({ ...r, type: "report" })),
      ...vitals.map((v) => ({ ...v, type: "vital" })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return timeline
  } catch {
    return []
  }
}
