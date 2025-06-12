import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Project } from "@/types/portfolio"

export async function GET() {
  try {
    console.log("Fetching projects from MongoDB...")
    const client = await clientPromise
    const db = client.db("Portfolio")

    // Check if collection exists and has data
    const collections = await db.listCollections().toArray()
    console.log(
      "Available collections:",
      collections.map((c) => c.name),
    )

    const projects = await db.collection<Project>("projects").find({}).sort({ createdAt: -1 }).toArray()
    console.log("Found projects:", projects.length)
    console.log("Sample project:", projects[0])

    return NextResponse.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, year, description, tools, githubLink, featured } = body

    if (!name || !year || !description || !tools) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("Portfolio")

    const project: Omit<Project, "_id"> = {
      name,
      year,
      description,
      tools: Array.isArray(tools) ? tools : [tools],
      githubLink: githubLink || "",
      featured: featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("projects").insertOne(project)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...project },
    })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
  }
}
