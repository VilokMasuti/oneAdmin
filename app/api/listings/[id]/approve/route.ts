import { NextResponse } from "next/server"
import {  mockListings } from "@/lib/data"
import { addAuditLog, updateListingStatus } from "@/lib/utils"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, context: RouteParams) {
  try {
    const { id } = await context.params
    const { adminEmail } = await request.json()

    console.log("API: Approving listing", id, "by", adminEmail)

    // Find the listing to approve
    const listing = mockListings.find((l) => l.id === id)
    if (!listing) {
      console.log("API: Listing not found:", id)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Update listing status to approved
    updateListingStatus(id, "approved")
    console.log("API: Updated listing status to approved")

    // Log the approval action for audit trail
    addAuditLog({
      action: "Approved",
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || "admin@example.com",
    })
    console.log("API: Added audit log entry")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API: Error approving listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
