import { mockListings } from '@/lib/data';
import { addAuditLog, updateListing } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    const { adminEmail, ...listingUpdates } = updates;

    // Find the listing to edit

    const listing = mockListings.find((l) => l.id === id);
    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }
    // Apply updates to the listing
    updateListing(id, listingUpdates);

    // Log the edit action for audit trail
    addAuditLog({
      action: 'Edited',
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || 'admin@example.com',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
