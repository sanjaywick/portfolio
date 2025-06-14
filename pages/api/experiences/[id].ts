import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== "string") {
    return res.status(400).json({ success: false, error: "Invalid experience ID" })
  }

  if (req.method === "PUT") {
    try {
      const { role, organization, startDate, endDate, location, type, achievements, tools, featured } = req.body

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid experience ID format" })
      }

      const client = await clientPromise
      const db = client.db("portfolio")

      const updateData = {
        ...(role && { role }),
        ...(organization && { organization }),
        ...(startDate && { startDate }),
        ...(endDate !== undefined && { endDate }),
        ...(location && { location }),
        ...(type && { type }),
        ...(achievements && { achievements: Array.isArray(achievements) ? achievements : [achievements] }),
        ...(tools && { tools: Array.isArray(tools) ? tools : [tools] }),
        ...(featured !== undefined && { featured }),
        updatedAt: new Date(),
      }

      const result = await db.collection("experiences").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, error: "Experience not found" })
      }

      return res.status(200).json({
        success: true,
        data: { _id: id, ...updateData },
      })
    } catch (error: any) {
      console.error("Error updating experience:", error)
      return res.status(500).json({ success: false, error: "Failed to update experience" })
    }
  }

  if (req.method === "DELETE") {
    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid experience ID format" })
      }

      const client = await clientPromise
      const db = client.db("portfolio")

      const result = await db.collection("experiences").deleteOne({
        _id: new ObjectId(id),
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, error: "Experience not found" })
      }

      return res.status(200).json({
        success: true,
        data: { message: "Experience deleted successfully" },
      })
    } catch (error: any) {
      console.error("Error deleting experience:", error)
      return res.status(500).json({ success: false, error: "Failed to delete experience" })
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
}
