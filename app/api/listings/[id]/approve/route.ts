import { NextRequest, NextResponse } from 'next/server';
import { mockListings } from '@/lib/data';
import { addAuditLog, updateListingStatus } from '@/lib/utils';

export async function POST(
  request: NextRequest, // TODO: Correct type here
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
