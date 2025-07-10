"use client"

import { useState, useEffect, useCallback } from "react"
import type { CarListing } from "@/lib/data"
import { RouteGuard } from "@/components/route-guard"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFilters } from "@/components/dashboard-filters"
import { ListingsTable } from "@/components/listings-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useDebouncedSearch } from "@/hooks/use-debounced-search"
import { fetchListings } from "@/services/listings"

export default function DashboardPage() {
  const [listings, setListings] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)
  const [currentStatus, setCurrentStatus] = useState("all")
  const [total, setTotal] = useState(0)

  const { searchTerm, debouncedSearchTerm, updateSearchTerm, clearSearch } = useDebouncedSearch("", 500)

  const loadListings = useCallback(async () => {
    console.log("Dashboard: Loading listings with status:", currentStatus, "search:", debouncedSearchTerm)
    setLoading(true)
    try {
      const response = await fetchListings(currentStatus === "all" ? undefined : currentStatus, debouncedSearchTerm)
      console.log("Dashboard: Received response:", response)

      setListings(response.listings || [])
      setTotal(response.total || 0)

      console.log("Dashboard: Set listings count:", response.listings?.length || 0)
    } catch (error) {
      console.error("Dashboard: Failed to load listings:", error)
      toast.error("Failed to load listings")

      // Fallback to mock data
      try {
        const { mockListings } = await import("@/lib/data")
        setListings(mockListings)
        setTotal(mockListings.length)
        console.log("Dashboard: Using fallback mock data:", mockListings.length)
      } catch (fallbackError) {
        console.error("Dashboard: Even fallback failed:", fallbackError)
        setListings([])
        setTotal(0)
      }
    } finally {
      setLoading(false)
    }
  }, [currentStatus, debouncedSearchTerm])

  useEffect(() => {
    loadListings()
  }, [loadListings])

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status)
    if (status === "all" && debouncedSearchTerm) {
      clearSearch()
    }
  }

  const stats = [
    {
      title: "Total Listings",
      value: total,
      description: "All submitted listings",
      icon: TrendingUp,
    },
    {
      title: "Pending Review",
      value: listings.filter((l) => l.status === "pending").length,
      description: "Awaiting approval",
      icon: Clock,
    },
    {
      title: "Approved",
      value: listings.filter((l) => l.status === "approved").length,
      description: "Live listings",
      icon: CheckCircle,
    },
    {
      title: "Rejected",
      value: listings.filter((l) => l.status === "rejected").length,
      description: "Declined listings",
      icon: XCircle,
    },
  ]

  const LoadingSkeleton = () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const showEmptyState = !loading && listings.length === 0

  return (
    <RouteGuard>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage and review car rental listings</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="transition-v0 hover-v0">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DashboardFilters
              onStatusChange={handleStatusChange}
              onSearchChange={() => {}}
              currentStatus={currentStatus}
              searchTerm={searchTerm}
              onSearchTermChange={updateSearchTerm}
              onClearSearch={clearSearch}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {loading ? <LoadingSkeleton /> : <ListingsTable listings={listings} onUpdate={loadListings} />}
          </motion.div>

          {showEmptyState && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🚗</div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">No listings available</h3>
                      <p className="text-muted-foreground">
                        {debouncedSearchTerm
                          ? `No results found for "${debouncedSearchTerm}"`
                          : currentStatus !== "all"
                            ? `No ${currentStatus} listings found`
                            : "No car listings have been submitted yet"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </RouteGuard>
  )
}
