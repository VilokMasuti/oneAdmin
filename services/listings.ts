import type { CarListing } from '../lib/data';
export interface ListingsResponse {
  listings: CarListing[];
  total: number;
}

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function fetchListings(
  status?: string,
  search?: string
): Promise<ListingsResponse> {
  try {
    console.log(
      'Service: Fetching listings with status:',
      status,
      'search:',
      search
    );

    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search?.trim()) params.append('search', search.trim());

    const endpoint = `/api/listings${params.toString() ? `?${params}` : ''}`;
    console.log('Service: API endpoint:', endpoint);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Service: Received data:', data);

    const result = {
      listings: Array.isArray(data.listings) ? data.listings : [],
      total: data.total || 0,
    };

    console.log(
      'Service: Returning result with',
      result.listings.length,
      'listings'
    );
    return result;
  } catch (error) {
    console.error('Service: Error fetching listings:', error);
    return {
      listings: [],
      total: 0,
    };
  }
}

export async function approveListing(
  listingId: string,
  adminEmail: string
): Promise<ActionResponse> {
  try {
    console.log('Service: Approving listing', listingId);
    const response = await fetch(`/api/listings/${listingId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminEmail,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Service: Approve failed with response:', errorText);
      return { success: false, error: 'Failed to approve listing' };
    }

    const data = await response.json();
    console.log('Service: Approve response:', data);
    return { success: true };
  } catch (error) {
    console.error('Service: Error approving listing:', error);
    return { success: false, error: 'Failed to approve listing' };
  }
}

export async function rejectListing(
  listingId: string,
  adminEmail: string
): Promise<ActionResponse> {
  try {
    console.log('Service: Rejecting listing', listingId);
    const response = await fetch(`/api/listings/${listingId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminEmail,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Service: Reject failed with response:', errorText);
      return { success: false, error: 'Failed to reject listing' };
    }

    const data = await response.json();
    console.log('Service: Reject response:', data);
    return { success: true };
  } catch (error) {
    console.error('Service: Error rejecting listing:', error);
    return { success: false, error: 'Failed to reject listing' };
  }
}

export async function editListing(
  listingId: string,
  updates: Partial<CarListing>,
  adminEmail: string
): Promise<ActionResponse> {
  try {
    console.log(
      'Service: Editing listing',
      listingId,
      'with updates:',
      updates
    );
    const response = await fetch(`/api/listings/${listingId}/edite`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updates, adminEmail }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Service: Edit failed with response:', errorText);
      console.error('Service: Response status:', response.status);
      return { success: false, error: 'Failed to edit listing' };
    }

    const data = await response.json();
    console.log('Service: Edit response:', data);
    return { success: true };
  } catch (error) {
    console.error('Service: Error editing listing:', error);
    return { success: false, error: 'Failed to edit listing' };
  }
}

export async function fetchListing(
  listingId: string
): Promise<{ listing: CarListing | null; error?: string }> {
  try {
    console.log('Service: Fetching single listing', listingId);
    const response = await fetch(`/api/listings/${listingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { listing: null, error: 'Listing not found' };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const listing = await response.json();
    console.log('Service: Fetched listing:', listing.title);
    return { listing };
  } catch (error) {
    console.error('Service: Error fetching listing:', error);
    return { listing: null, error: 'Failed to fetch listing' };
  }
}

export async function deleteListing(
  listingId: string,
  adminEmail: string
): Promise<ActionResponse> {
  try {
    console.log('Service: Deleting listing', listingId);
    const response = await fetch(`/api/listings/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminEmail }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Service: Delete failed with response:', errorText);
      return { success: false, error: 'Failed to delete listing' };
    }

    const data = await response.json();
    console.log('Service: Delete response:', data);
    return { success: true };
  } catch (error) {
    console.error('Service: Error deleting listing:', error);
    return { success: false, error: 'Failed to delete listing' };
  }
}
