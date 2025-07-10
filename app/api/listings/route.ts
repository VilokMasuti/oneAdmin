import { NextResponse } from "next/server"
import { mockListings } from "@/lib/data"

export async function GET(request: Request) {
  try {
    console.log("API: Starting listings fetch")
    console.log("API: Mock listings available:", mockListings.length)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    console.log("API: Filters - status:", status, "search:", search)

    let filteredListings = [...mockListings]

    // Filter by status if provided and not "all"
    if (status && status !== "all") {
      filteredListings = filteredListings.filter((listing) => listing.status === status)
      console.log("API: After status filter:", filteredListings.length)
    }

    // Filter by search term if provided
    if (search && search.trim()) {
      const searchLower = search.toLowerCase()
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchLower) ||
          listing.brand.toLowerCase().includes(searchLower) ||
          listing.model.toLowerCase().includes(searchLower) ||
          listing.location.toLowerCase().includes(searchLower),
      )
      console.log("API: After search filter:", filteredListings.length)
    }

    const response = {
      listings: filteredListings,
      total: filteredListings.length,
    }

    console.log("API: Returning response with", response.listings.length, "listings")
    return NextResponse.json(response)
  } catch (error) {
    console.error("API Error:", error)
    // Return mock data as fallback
    return NextResponse.json({
      listings: mockListings,
      total: mockListings.length,
    })
  }
}
