import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

// Update the PUT function to handle startDate and endDate
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { role, organization, startDate, endDate, location, type, achievements, tools, featured } = body

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid experience ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("Portfolio")

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

    const result = await db.collection("experiences").updateOne({ _id: new ObjectId(params.id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { _id: params.id, ...updateData },
    })
  } catch (error) {
    console.error("Error updating experience:", error)
    return NextResponse.json({ success: false, error: "Failed to update experience" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: "Invalid experience ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("Portfolio")

    const result = await db.collection("experiences").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Experience not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { message: "Experience deleted successfully" },
    })
  } catch (error) {
    console.error("Error deleting experience:", error)
    return NextResponse.json({ success: false, error: "Failed to delete experience" }, { status: 500 })
  }
}
