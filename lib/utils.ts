/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { mockAuditLog, mockListings } from './data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CarListing {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  location: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  submittedBy: string;
  imageUrl: string;
}

export interface AuditLog {
  id: string;
  action: string;
  listingId: string;
  listingTitle: string;
  adminEmail: string;
  timestamp: string;
}

// Helper functions to update data
export function updateListingStatus(id: string, status: CarListing['status']) {
  const listing = mockListings.find((l) => l.id === id);
  if (listing) {
    listing.status = status;
  }
}

export function updateListing(id: string, updates: Partial<CarListing>) {
  const index = mockListings.findIndex((l) => l.id === id);
  if (index !== -1) {
    mockListings[index] = { ...mockListings[index], ...updates };
  }
}

export function addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>) {
  const newLog: AuditLog = {
    ...log,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  };
  mockAuditLog.unshift(newLog);
}

export function filterListings(data: any, status = 'all', search = '') {
  let result = [...data];

  if (status !== 'all') {
    result = result.filter((l) => l.status === status);
  }

  if (search.length >= 2) {
    const s = search.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(s) ||
        l.brand.toLowerCase().includes(s) ||
        l.model.toLowerCase().includes(s) ||
        l.location.toLowerCase().includes(s)
    );
  }

  return result;
}
