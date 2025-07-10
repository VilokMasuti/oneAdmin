import { NextRequest, NextResponse } from 'next/server';
import { mockListings } from '@/lib/data';
import { addAuditLog, updateListing } from '@/lib/utils';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    const { adminEmail, ...listingUpdates } = updates;

    // Find the listing
    const listing = mockListings.find((l) => l.id === id);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Update listing
    updateListing(id, listingUpdates);

    // Log the change
    addAuditLog({
      action: 'Edited',
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || 'admin@example.com',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PATCH Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
