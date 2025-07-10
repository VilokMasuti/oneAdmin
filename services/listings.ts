import type { CarListing } from "../lib/data"

export interface ListingsResponse {
  listings: CarListing[]
  total: number
}

export interface ActionResponse {
  success: boolean
  error?: string
}

export async function fetchListings(status?: string, search?: string): Promise<ListingsResponse> {
  try {
    console.log("Service: Fetching listings with status:", status, "search:", search)

    const params = new URLSearchParams()
    if (status && status !== "all") params.append("status", status)
    if (search?.trim()) params.append("search", search.trim())

    const endpoint = `/api/listings${params.toString() ? `?${params}` : ""}`
    console.log("Service: API endpoint:", endpoint)

    const response = await fetch(endpoint)
    const data = await response.json()

    console.log("Service: Received data:", data)

    const result = {
      listings: Array.isArray(data.listings) ? data.listings : [],
      total: data.total || 0,
    }

    console.log("Service: Returning result with", result.listings.length, "listings")
    return result
  } catch (error) {
    console.error("Service: Error fetching listings:", error)
    // Return mock data as fallback
    const { mockListings } = await import("@/lib/data")
    return {
      listings: mockListings,
      total: mockListings.length,
    }
  }
}

export async function approveListing(listingId: string, adminEmail: string): Promise<ActionResponse> {
  try {
    console.log("Service: Approving listing", listingId)
    const response = await fetch(`/api/listings/${listingId}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminEmail }),
    })

    const data = await response.json()
    console.log("Service: Approve response:", data)

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, error: data.error || "Failed to approve listing" }
    }
  } catch (error) {
    console.error("Service: Error approving listing:", error)
    return { success: false, error: "Failed to approve listing" }
  }
}

export async function rejectListing(listingId: string, adminEmail: string): Promise<ActionResponse> {
  try {
    console.log("Service: Rejecting listing", listingId)
    const response = await fetch(`/api/listings/${listingId}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminEmail }),
    })

    const data = await response.json()
    console.log("Service: Reject response:", data)

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, error: data.error || "Failed to reject listing" }
    }
  } catch (error) {
    console.error("Service: Error rejecting listing:", error)
    return { success: false, error: "Failed to reject listing" }
  }
}

export async function editListing(
  listingId: string,
  updates: Partial<CarListing>,
  adminEmail: string,
): Promise<ActionResponse> {
  try {
    console.log("Service: Editing listing", listingId, updates)
    const response = await fetch(`/api/listings/${listingId}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updates, adminEmail }),
    })

    const data = await response.json()
    console.log("Service: Edit response:", data)

    if (response.ok) {
      return { success: true }
    } else {
      return { success: false, error: data.error || "Failed to edit listing" }
    }
  } catch (error) {
    console.error("Service: Error editing listing:", error)
    return { success: false, error: "Failed to edit listing" }
  }
}
