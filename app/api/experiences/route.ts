import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Experience } from "@/types/portfolio"

export async function GET() {
  try {
    console.log("Fetching experiences from MongoDB...")
    const client = await clientPromise
    const db = client.db("Portfolio")

    // Check if collection exists and has data
    const collections = await db.listCollections().toArray()
    console.log(
      "Available collections:",
      collections.map((c) => c.name),
    )

    const experiences = await db.collection<Experience>("experiences").find({}).sort({ createdAt: -1 }).toArray()
    console.log("Found experiences:", experiences.length)
    console.log("Sample experience:", experiences[0])

    return NextResponse.json({
      success: true,
      data: experiences,
    })
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch experiences",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { role, organization, startDate, endDate, location, type, achievements, tools, featured } = body

    if (!role || !organization || !startDate || !location || !type) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("Portfolio")

    const experience: Omit<Experience, "_id"> = {
      role,
      organization,
      startDate,
      endDate: endDate || "",
      location,
      type,
      achievements: Array.isArray(achievements) ? achievements : [achievements],
      tools: Array.isArray(tools) ? tools : [tools],
      featured: featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("experiences").insertOne(experience)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...experience },
    })
  } catch (error) {
    console.error("Error creating experience:", error)
    return NextResponse.json({ success: false, error: "Failed to create experience" }, { status: 500 })
  }
}
