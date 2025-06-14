import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb"
import type { Experience } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Starting to fetch experiences...")

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
      const db = client.db("Portfolio")

      console.log("Connected to database, fetching experiences...")
      const experiences = await db.collection<Experience>("experiences").find({}).sort({ createdAt: -1 }).toArray()

      console.log(`Found ${experiences.length} experiences`)

      return res.status(200).json({
        success: true,
        data: experiences,
        count: experiences.length,
      })
    } catch (error: any) {
      console.error("Detailed error fetching experiences:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to fetch experiences",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      })
    }
  }

  if (req.method === "POST") {
    try {
      const { role, organization, startDate, endDate, location, type, achievements, tools, featured } = req.body

      if (!role || !organization || !startDate || !location || !type) {
        return res.status(400).json({ success: false, error: "Missing required fields" })
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

      return res.status(201).json({
        success: true,
        data: { _id: result.insertedId, ...experience },
      })
    } catch (error: any) {
      console.error("Error creating experience:", error)
      return res.status(500).json({
        success: false,
        error: "Failed to create experience",
        details: error.message,
      })
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"])
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
}
