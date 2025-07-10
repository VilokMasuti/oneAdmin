import { NextRequest, NextResponse } from 'next/server';
import { mockListings } from '@/lib/data';
import { addAuditLog, updateListingStatus } from '@/lib/utils';

export async function POST(
  request: NextRequest,
  context: { params: Record<string, string> } // Fix: Use Record<string, string>
) {
  try {
    const { id } = context.params; // Access params via context

    // Parse JSON body from the request
    const { adminEmail } = await request.json();

    // Find the listing by ID
    const listing = mockListings.find((l) => l.id === id);

    // If listing is not found, return 404
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Update listing status to "approved"
    updateListingStatus(id, 'approved');

    // Log the approval action for auditing
    addAuditLog({
      action: 'Approved',
      listingId: id,
      listingTitle: listing.title,
      adminEmail: adminEmail || 'admin@example.com',
    });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Approval Error:', error);

    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
