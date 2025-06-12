import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, year, description, tools, githubLink, featured } = body

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 })
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

    const result = await db.collection("projects").updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { _id: params.id, ...updateData },
    })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("portfolio")

    const result = await db.collection("projects").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { message: "Project deleted successfully" },
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
  }
}
