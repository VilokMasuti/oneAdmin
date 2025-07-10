import { mockListings } from '@/lib/data';
import { addAuditLog, updateListing } from '@/lib/utils';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: RouteParams) {
  try {
    const { id } = await context.params
    const updates = await request.json()
    const { adminEmail, ...listingUpdates } = updates

    console.log("API: Editing listing", id, "with updates:", listingUpdates)

    // Find the listing to edit
    const listing = mockListings.find((l) => l.id === id)
    if (!listing) {
      console.log("API: Listing not found:", id)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Apply updates to the listing
    updateListing(id, listingUpdates)
    console.log("API: Updated listing with new data")

    // Log the edit action for audit trail
    addAuditLog({
      action: "Edited",
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || "admin@example.com",
    })
    console.log("API: Added audit log entry")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API: Error editing listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
