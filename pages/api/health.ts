
import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "@/lib/mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
  }

  try {
    // Test database connection
    const client = await clientPromise
    const db = client.db("portfolio")

    // Simple ping to test connection
    await db.admin().ping()

    return res.status(200).json({
      success: true,
      message: "API is healthy",
      database: "Connected",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Health check failed:", error)
    return res.status(500).json({
      success: false,
      message: "API health check failed",
      database: "Disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    })
  }
}
