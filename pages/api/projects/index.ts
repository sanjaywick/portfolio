import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb"
import type { Project } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Starting to fetch projects...")

      // Check if MONGODB_URI exists
      if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI environment variable is not set")
        return res.status(500).json({
          success: false,
          error: "Database configuration error",
          details: "MONGODB_URI not configured",
        })
      }

      console.log("Connecting to MongoDB...")
      const client = await clientPromise
      const db = client.db("portfolio")

      console.log("Connected to database, fetching projects...")
      const projects = await db.collection<Project>("projects").find({}).sort({ createdAt: -1 }).toArray()

      console.log(`Found ${projects.length} projects`)

      return res.status(200).json({
        success: true,
        data: projects,
        count: projects.length,
      })
    } catch (error: any) {
      console.error("Detailed error fetching projects:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to fetch projects",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      })
    }
  }

  if (req.method === "POST") {
    try {
      const { name, year, description, tools, githubLink, featured } = req.body

      if (!name || !year || !description || !tools) {
        return res.status(400).json({ success: false, error: "Missing required fields" })
      }

      const client = await clientPromise
      const db = client.db("portfolio")

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

      return res.status(201).json({
        success: true,
        data: { _id: result.insertedId, ...project },
      })
    } catch (error: any) {
      console.error("Error creating project:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to create project",
        details: error.message,
      })
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
}
