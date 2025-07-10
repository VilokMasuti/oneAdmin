import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Car className="h-24 w-24 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        </div>
        <Link href="/dashboard">
          <Button className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
