// Mock database - Replace with MongoDB connection in production
const users: any[] = []
const reports: any[] = []
const vitals: any[] = []

export const db = {
  users,
  reports,
  vitals,
}

export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email)
}

export function findUserById(id: string) {
  return users.find((u) => u._id === id)
}

export function createUser(user: any) {
  const newUser = { ...user, _id: Date.now().toString() }
  users.push(newUser)
  return newUser
}

export function addReport(report: any) {
  const newReport = { ...report, _id: Date.now().toString() }
  reports.push(newReport)
  return newReport
}

export function getReportsByUserId(userId: string) {
  return reports.filter((r) => r.userId === userId)
}

export function addVital(vital: any) {
  const newVital = { ...vital, _id: Date.now().toString() }
  vitals.push(newVital)
  return newVital
}

export function getVitalsByUserId(userId: string) {
  return vitals.filter((v) => v.userId === userId)
}
