# Car Rental Admin Dashboard

##  Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **Authentication**: Context API + localStorage
- **State Management**: React Context
- **Icons**: Lucide React
- **Notifications**: Sonner

##  Project Structure


├── app/
│ ├── api/ # API routes
│ │ ├── listings/ # Listings CRUD operations
│ │ └── audit-log/ # Audit log endpoints
│ ├── dashboard/ # Main dashboard page
│ ├── audit-log/ # Audit trail page
│ ├── login/ # Authentication page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page (redirects)
│ └── not-found.tsx # 404 page
├── components/ # Reusable components
│ ├── ui/ # ShadCN UI components
│ ├── dashboard-header.tsx # Header with navigation
│ ├── listings-table.tsx # Main listings table
│ ├── edit-listing-modal.tsx # Edit modal
│ ├── pagination.tsx # Pagination controls
│ └── route-guard.tsx # Authentication guard
├── services/ # 🔧 Data fetching layer
│ ├── api.ts # Base API utilities & error handling
│ ├── listings.ts # Listings API calls (fetch, approve, reject, edit)
│ ├── audit.ts # Audit log API calls
│ └── auth.ts # Authentication API calls
├── lib/ # Utilities and data
│ ├── auth-context.tsx # Authentication context
│ ├── data.ts # Mock data and helpers
│ └── utils.ts # Utility functions
└── README.md
\`\`\`

##  Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd car-rental-admin-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

### Demo Login

- Use any email and password to log in
- The authentication is mocked for demonstration purposes

##  Pages & Features

### 1. Login Page (`/login`)

- Clean authentication form
- Input validation with toast notifications
- Demo login message
- Automatic redirect after successful login

### 2. Dashboard (`/dashboard`)

- Paginated listings table (10 items per page)
- Status filtering (All, Pending, Approved, Rejected)
- Search functionality
- Bulk actions (Approve, Reject, Edit)
- Real-time status updates
- Mobile-responsive table

### 3. Edit Listing Modal

- Pre-filled form with existing data
- Comprehensive validation
- Real-time updates after save
- Mobile-friendly modal design

### 4. Audit Log (`/audit-log`)

- Complete action history
- Admin tracking
- Timestamp information
- Filterable and searchable

##  Design System

### Theme

- **Primary Colors**: Modern dark theme
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Components**: ShadCN UI component library

## 🔧 API Endpoints

### Listings

- `GET /api/listings` - Fetch listings with pagination and filters
- `POST /api/listings/[id]/approve` - Approve a listing
- `POST /api/listings/[id]/reject` - Reject a listing
- `PATCH /api/listings/[id]/edit` - Update a listing

### Audit Log

- `GET /api/audit-log` - Fetch audit trail

##  Performance Optimizations

- **React.memo**: Optimized table row rendering
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js Image component

##  Security Features

- **Route Protection**: Authentication guards

## Data Management

The application uses mock data stored in `lib/data.ts`

To run tests (when implemented):
\`\`\`bash
npm run test

# or

yarn test
\`\`\`
