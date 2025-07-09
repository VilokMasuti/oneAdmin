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

// Mock car listings data
export const mockListings: CarListing[] = [
  {
    id: '1',
    title: 'Luxury BMW X5 2023',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    price: 150,
    location: 'New York, NY',
    description:
      'Premium SUV with all modern amenities, perfect for business trips.',
    status: 'pending',
    submittedAt: '2024-01-15T10:30:00Z',
    submittedBy: 'john.doe@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '2',
    title: 'Tesla Model S 2024',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    price: 200,
    location: 'Los Angeles, CA',
    description: 'Electric luxury sedan with autopilot features.',
    status: 'approved',
    submittedAt: '2024-01-14T14:20:00Z',
    submittedBy: 'jane.smith@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '3',
    title: 'Honda Civic 2022',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 45,
    location: 'Chicago, IL',
    description: 'Reliable and fuel-efficient compact car.',
    status: 'rejected',
    submittedAt: '2024-01-13T09:15:00Z',
    submittedBy: 'mike.johnson@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '4',
    title: 'Mercedes-Benz C-Class 2023',
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2023,
    price: 120,
    location: 'Miami, FL',
    description:
      'Elegant sedan with premium interior and advanced safety features.',
    status: 'pending',
    submittedAt: '2024-01-12T16:45:00Z',
    submittedBy: 'sarah.wilson@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '5',
    title: 'Ford Mustang 2023',
    brand: 'Ford',
    model: 'Mustang',
    year: 2023,
    price: 90,
    location: 'Austin, TX',
    description: 'Classic American muscle car with modern performance.',
    status: 'approved',
    submittedAt: '2024-01-11T11:30:00Z',
    submittedBy: 'david.brown@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '6',
    title: 'Audi A4 2022',
    brand: 'Audi',
    model: 'A4',
    year: 2022,
    price: 85,
    location: 'Seattle, WA',
    description: 'Sophisticated sedan with quattro all-wheel drive.',
    status: 'pending',
    submittedAt: '2024-01-10T13:20:00Z',
    submittedBy: 'emily.davis@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '7',
    title: 'Toyota Camry 2023',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    price: 55,
    location: 'Denver, CO',
    description: 'Reliable mid-size sedan with excellent fuel economy.',
    status: 'approved',
    submittedAt: '2024-01-09T08:45:00Z',
    submittedBy: 'robert.miller@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
  {
    id: '8',
    title: 'Porsche 911 2024',
    brand: 'Porsche',
    model: '911',
    year: 2024,
    price: 300,
    location: 'San Francisco, CA',
    description: 'Iconic sports car with exceptional performance and handling.',
    status: 'pending',
    submittedAt: '2024-01-08T15:10:00Z',
    submittedBy: 'lisa.garcia@email.com',
    imageUrl: '/placeholder.svg?height=200&width=300',
  },
];

// Mock audit log data
export const mockAuditLog: AuditLog[] = [
  {
    id: '1',
    action: 'Approved',
    listingId: '2',
    listingTitle: 'Tesla Model S 2024',
    adminEmail: 'admin@carrentals.com',
    timestamp: '2024-01-15T09:30:00Z',
  },
  {
    id: '2',
    action: 'Rejected',
    listingId: '3',
    listingTitle: 'Honda Civic 2022',
    adminEmail: 'admin@carrentals.com',
    timestamp: '2024-01-14T11:15:00Z',
  },
];
