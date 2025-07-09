import { mockListings } from '@/lib/data';
import { addAuditLog, updateListingStatus } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { adminEmail } = await request.json();

    // Find the listing to approve

    const listing = mockListings.find((l) => l.id === id);

    if (!listing) {
      return NextResponse.json(
        {
          error: 'Listing not found',
        },
        { status: 404 }
      );
    }
    // Update listing status to approved

    updateListingStatus(id, 'approved');

    // Log the approval action for audit trail
    addAuditLog({
      action: 'Approved',
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || 'admin@example.com',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
    });
  }
}
