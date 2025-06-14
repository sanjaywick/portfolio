import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()

    // Get all experiences from the database
    const experiences = await db.collection("experiences").find({}).sort({ startDate: -1 }).toArray()
    console.log(experiences)
    // Return the experiences
    return NextResponse.json(experiences)
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 })
  }
}