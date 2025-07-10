/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/lib/auth-context';
import { LISTING_STATUS, SUCCESS_MESSAGES } from '@/lib/constants';
import type { CarListing } from '@/lib/data';
import {
  approveListing,
  editListing,
  rejectListing,
} from '@/services/listings';
import {
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { EditListingModal } from './edit-listing-modal';
import { ListingDetailsModal } from './listing-details-modal';

interface ListingsTableProps {
  listings: CarListing[];
  onUpdate: () => void;
}

const ListingRow = memo(
  ({
    listing,
    onApprove,
    onReject,
    onEdit,
    onViewDetails,
    isProcessing,
  }: {
    listing: CarListing;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onEdit: (listing: CarListing) => void;
    onViewDetails: (listing: CarListing) => void;
    isProcessing: boolean;
  }) => {
    const getStatusBadge = (status: CarListing['status']) => {
      switch (status) {
        case LISTING_STATUS.APPROVED:
          return (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              Approved
            </Badge>
          );
        case LISTING_STATUS.REJECTED:
          return (
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            >
              Rejected
            </Badge>
          );
        case LISTING_STATUS.PENDING:
          return (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            >
              Pending
            </Badge>
          );
      }
    };

    return (
      <TableRow className="hover:bg-muted/50 transition-v0">
        <TableCell>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onViewDetails(listing)}
              className="relative group cursor-pointer transition-v0 hover:scale-105"
            >
              <Image
                src={listing.imageUrl || '/placeholder.svg'}
                alt={listing.title}
                width={48}
                height={32}
                className="rounded object-cover"
              />
            </button>
            <div>
              <button
                onClick={() => onViewDetails(listing)}
                className="font-medium hover:text-primary transition-v0 text-left"
              >
                {listing.title}
              </button>
              <div className="text-sm text-muted-foreground">
                {listing.brand} {listing.model} ({listing.year})
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">${listing.price}/day</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{listing.location}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {new Date(listing.submittedAt).toLocaleDateString()}
            </span>
          </div>
        </TableCell>
        <TableCell>{getStatusBadge(listing.status)}</TableCell>
        <TableCell>
          <div className="flex items-center space-x-2">
            {listing.status !== LISTING_STATUS.APPROVED && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onApprove(listing.id)}
                disabled={isProcessing}
                className="h-8 px-3 text-xs bg-green-500  cursor-pointer"
              >
                <CheckCircle className="h-3 w-3 mr-1  cursor-pointer" />
                Approve
              </Button>
            )}
            {listing.status !== LISTING_STATUS.REJECTED && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(listing.id)}
                disabled={isProcessing}
                className="h-8 px-3 text-xs  cursor-pointer bg-red-500"
              >
                <XCircle className="h-3 w-3 mr-1" />
                Reject
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" bg-zinc-950">
                <DropdownMenuItem onClick={() => onEdit(listing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewDetails(listing)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TableCell>
      </TableRow>
    );
  }
);

ListingRow.displayName = 'ListingRow';

export function ListingsTable({ listings, onUpdate }: ListingsTableProps) {
  const { adminEmail } = useAuth();
  const [editingListing, setEditingListing] = useState<CarListing | null>(null);
  const [detailsListing, setDetailsListing] = useState<CarListing | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = useCallback(
    async (id: string) => {
      if (!adminEmail) {
        toast.error('Please log in to perform this action');
        return;
      }

      setIsProcessing(true);
      try {
        const result = await approveListing(id, adminEmail);
        if (result.success) {
          toast.success(SUCCESS_MESSAGES.LISTINGS.APPROVED);
          onUpdate();
        } else {
          toast.error(result.error || 'Failed to approve listing');
        }
      } catch (error) {
        toast.error('Failed to approve listing');
      } finally {
        setIsProcessing(false);
      }
    },
    [adminEmail, onUpdate]
  );

  const handleReject = useCallback(
    async (id: string) => {
      if (!adminEmail) {
        toast.error('Please log in to perform this action');
        return;
      }

      setIsProcessing(true);
      try {
        const result = await rejectListing(id, adminEmail);
        if (result.success) {
          toast.success(SUCCESS_MESSAGES.LISTINGS.REJECTED);
          onUpdate();
        } else {
          toast.error(result.error || 'Failed to reject listing');
        }
      } catch (error) {
        toast.error('Failed to reject listing');
      } finally {
        setIsProcessing(false);
      }
    },
    [adminEmail, onUpdate]
  );

  const handleEdit = useCallback((listing: CarListing) => {
    setEditingListing(listing);
  }, []);

  const handleViewDetails = useCallback((listing: CarListing) => {
    setDetailsListing(listing);
  }, []);

  const handleEditSave = useCallback(
    async (updates: Partial<CarListing>) => {
      if (!editingListing || !adminEmail) {
        toast.error('Please log in to perform this action');
        return;
      }

      setIsProcessing(true);
      try {
        const result = await editListing(
          editingListing.id,
          updates,
          adminEmail
        );
        if (result.success) {
          toast.success(SUCCESS_MESSAGES.LISTINGS.UPDATED);
          setEditingListing(null);
          onUpdate();
        } else {
          toast.error(result.error || 'Failed to update listing');
        }
      } catch (error) {
        toast.error('Failed to update listing');
      } finally {
        setIsProcessing(false);
      }
    },
    [editingListing, adminEmail, onUpdate]
  );

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="text-6xl">🚗</div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No listings to display</h3>
              <p className="text-muted-foreground">
                Listings will appear here when available
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Car Rental Listings</CardTitle>
          <CardDescription>
            Manage and review submitted car rental listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Listing</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => (
                  <ListingRow
                    key={listing.id}
                    listing={listing}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onEdit={handleEdit}
                    onViewDetails={handleViewDetails}
                    isProcessing={isProcessing}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingListing && (
        <EditListingModal
          listing={editingListing}
          onSave={handleEditSave}
          onClose={() => setEditingListing(null)}
        />
      )}

      {detailsListing && (
        <ListingDetailsModal
          listing={detailsListing}
          isOpen={!!detailsListing}
          onClose={() => setDetailsListing(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}
