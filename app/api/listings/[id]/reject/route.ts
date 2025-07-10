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
    // Find the listing to reject
    const listing = mockListings.find((l) => l.id === id);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Update listing status to rejected
    updateListingStatus(id, 'rejected');

    // Log the rejection action for audit trail
    addAuditLog({
      action: 'Rejected',
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || 'admin@example.com',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
