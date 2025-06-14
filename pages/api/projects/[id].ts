import type { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== "string") {
    return res.status(400).json({ success: false, error: "Invalid project ID" })
  }

  if (req.method === "PUT") {
    try {
      const { name, year, description, tools, githubLink, featured } = req.body

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid project ID format" })
      }

      const client = await clientPromise
      const db = client.db("portfolio")

      const updateData = {
        ...(name && { name }),
        ...(year && { year }),
        ...(description && { description }),
        ...(tools && { tools: Array.isArray(tools) ? tools : [tools] }),
        ...(githubLink !== undefined && { githubLink }),
        ...(featured !== undefined && { featured }),
        updatedAt: new Date(),
      }

      const result = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, error: "Project not found" })
      }

      return res.status(200).json({
        success: true,
        data: { _id: id, ...updateData },
      })
    } catch (error: any) {
      console.error("Error updating project:", error)
      return res.status(500).json({ success: false, error: "Failed to update project" })
    }
  }

  if (req.method === "DELETE") {
    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Invalid project ID format" })
      }

      const client = await clientPromise
      const db = client.db("portfolio")

      const result = await db.collection("projects").deleteOne({
        _id: new ObjectId(id),
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, error: "Project not found" })
      }

      return res.status(200).json({
        success: true,
        data: { message: "Project deleted successfully" },
      })
    } catch (error: any) {
      console.error("Error deleting project:", error)
      return res.status(500).json({ success: false, error: "Failed to delete project" })
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["PUT", "DELETE"])
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` })
}
