import { NextRequest, NextResponse } from 'next/server';
import { mockListings } from '@/lib/data';
import { addAuditLog, updateListingStatus } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  context: { params: { id: string } } //  use `context` as full object
) {
  try {
    const { id } = context.params;
    const { adminEmail } = await request.json();

    const listing = mockListings.find((l) => l.id === id);

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    updateListingStatus(id, 'approved');

    addAuditLog({
      action: 'Approved',
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || 'admin@example.com',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Approve Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
