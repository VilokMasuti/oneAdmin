import { mockListings } from '@/lib/data';
import { addAuditLog, updateListingStatus } from '@/lib/utils';
import { NextResponse} from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, context: RouteParams) {
  try {
    const { id } = await context.params
    const { adminEmail } = await request.json()

    console.log("API: Rejecting listing", id, "by", adminEmail)

    // Find the listing to reject
    const listing = mockListings.find((l) => l.id === id)
    if (!listing) {
      console.log("API: Listing not found:", id)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Update listing status to rejected
    updateListingStatus(id, "rejected")
    console.log("API: Updated listing status to rejected")

    // Log the rejection action for audit trail
    addAuditLog({
      action: "Rejected",
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || "admin@example.com",
    })
    console.log("API: Added audit log entry")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API: Error rejecting listing:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
