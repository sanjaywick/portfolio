import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    // Connect to the database
    const { db } = await connectToDatabase()
    console.log("Entered project route")
    // Get all projects from the database
    const projects = await db.collection("projects").find({}).toArray()
    console.log(projects)
    // Return the projects
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}