'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { CarListing } from '@/lib/data';
import {
  Calendar,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  Info,
  Mail,
  MapPin,
  User,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';

interface ListingDetailsModalProps {
  listing: CarListing | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onEdit?: (listing: CarListing) => void;
}

export function ListingDetailsModal({
  listing,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onEdit,
}: ListingDetailsModalProps) {
  if (!listing) return null;

  const getStatusBadge = (status: CarListing['status']) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 cursor-pointer">
            <XCircle className="h-3 w-3 mr-1 cursor-pointer" />
            Rejected
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20">
            <Clock className="h-3 w-3 mr-1  cursor-pointer" />
            Pending Review
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] md:max-w-4xl lg:max-w-6xl mx-auto rounded-xl bg-zinc-900 border border-zinc-800">
        <ScrollArea className="max-h-[90dvh]">
          <div className="p-4 sm:p-6">
            <DialogHeader className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-2">
                  <DialogTitle className="text-xl sm:text-2xl font-bold line-clamp-2">
                    {listing.title}
                  </DialogTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(listing.status)}
                    <Badge variant="outline" className="text-xs">
                      ID: {listing.id}
                    </Badge>
                  </div>
                </div>

                {onEdit && (
                  <Button
                    onClick={() => onEdit(listing)}
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex smooth-transition"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </DialogHeader>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
              {/* Image Section */}
              <div className="space-y-6">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-700 shadow-lg">
                  <Image
                    src={listing.imageUrl || '/placeholder.svg'}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800/60 p-4 rounded-lg border border-zinc-700">
                    <div className="flex items-center space-x-2 text-sm text-zinc-400 mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span>Daily Rate</span>
                    </div>
                    <div className="text-xl font-bold text-green-400">
                      ${listing.price}
                    </div>
                  </div>
                  <div className="bg-zinc-800/60 p-4 rounded-lg border border-zinc-700">
                    <div className="flex items-center space-x-2 text-sm text-zinc-400 mb-1">
                      <Car className="h-4 w-4" />
                      <span>Year</span>
                    </div>
                    <div className="text-xl font-bold">{listing.year}</div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Car className="h-5 w-5 mr-2 text-amber-400" />
                    Vehicle Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-zinc-400">Brand</span>
                      <span className="font-medium">{listing.brand}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-400">Model</span>
                      <span className="font-medium">{listing.model}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-400">Year</span>
                      <span className="font-medium">{listing.year}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-400">Price/Day</span>
                      <span className="font-medium text-green-400">
                        ${listing.price}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-700" />

                {/* Location & Submission Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-400" />
                    Listing Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <div className="flex items-center text-zinc-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Location</span>
                      </div>
                      <span className="font-medium sm:ml-auto">
                        {listing.location}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <div className="flex items-center text-zinc-400">
                        <User className="h-4 w-4 mr-2" />
                        <span>Submitted by</span>
                      </div>
                      <span className="font-medium sm:ml-auto">
                        {listing.submittedBy}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <div className="flex items-center text-zinc-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Submitted</span>
                      </div>
                      <span className="font-medium sm:ml-auto">
                        {new Date(listing.submittedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-700" />

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-zinc-300 leading-relaxed text-pretty">
                    {listing.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-8">
              {onEdit && (
                <Button
                  onClick={() => onEdit(listing)}
                  variant="outline"
                  className="sm:hidden w-full flex-1 min-w-[150px]"
                >
                  <Edit className="h-4 w-4 mr-2  cursor-pointer" />
                  Edit Details
                </Button>
              )}
              {listing.status !== 'approved' && onApprove && (
                <Button
                  onClick={() => onApprove(listing.id)}
                  className="bg-green-600 hover:bg-green-700 text-white w-full flex-1 min-w-[150px]  cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4 mr-2  cursor-pointer" />
                  Approve
                </Button>
              )}
              {listing.status !== 'rejected' && onReject && (
                <Button
                  onClick={() => onReject(listing.id)}
                  variant="destructive"
                  className="w-full flex-1 min-w-[150px] bg-red-500"
                >
                  <XCircle className="h-4 w-4 mr-2  cursor-pointer" />
                  Reject
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full flex-1 min-w-[150px] bg-transparent border-zinc-700 hover:bg-zinc-800"
                onClick={() =>
                  window.open(`mailto:${listing.submittedBy}`, '_blank')
                }
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
