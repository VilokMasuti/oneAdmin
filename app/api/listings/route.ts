import { mockListings } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filteredListings = [...mockListings];

    if (status && status !== 'all') {
      filteredListings = filteredListings.filter(
        (listing) => listing.status === status
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredListings = filteredListings.filter((listing) => {
        return (
          listing.title.toLowerCase().includes(searchLower) ||
          listing.description.toLowerCase().includes(searchLower) ||
          listing.location.toLowerCase().includes(searchLower) ||
          listing.brand.toLowerCase().includes(searchLower) ||
          listing.model.toLowerCase().includes(searchLower)
        );
      });
    }

    return NextResponse.json({
      listing: filteredListings,
      total: filteredListings.length,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: true,
      message: 'Something went wrong',
    });
  }
}
