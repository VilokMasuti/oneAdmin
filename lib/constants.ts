// API Configuration
export const API_CONFIG = {
  SEARCH: {
    DEBOUNCE_DELAY: 500, // Delay before search executes (ms)
    MIN_SEARCH_LENGTH: 2, // Minimum characters required for search
  },
  AUTH: {
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    COOKIE_NAME: "admin-token", // Name of auth token cookie
    EMAIL_COOKIE_NAME: "admin-email", // Name of email cookie
  },
} as const

// Listing Status Types - Used for filtering and display
export const LISTING_STATUS = {
  PENDING: "pending", // Awaiting admin review
  APPROVED: "approved", // Approved by admin
  REJECTED: "rejected", // Rejected by admin
  ALL: "all", // Show all listings (filter option)
} as const

export type ListingStatus = (typeof LISTING_STATUS)[keyof typeof LISTING_STATUS]

// Audit Action Types - Track what actions admins perform
export const AUDIT_ACTIONS = {
  APPROVED: "Approved", // Admin approved a listing
  REJECTED: "Rejected", // Admin rejected a listing
  EDITED: "Edited", // Admin edited listing details
  CREATED: "Created", // New listing created
  DELETED: "Deleted", // Listing deleted
} as const

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS]

// UI Configuration Constants
export const UI_CONFIG = {
  BREAKPOINTS: {
    SM: 640, // Small screens (mobile)
    MD: 768, // Medium screens (tablet)
    LG: 1024, // Large screens (desktop)
    XL: 1280, // Extra large screens
  },
} as const

// Error Messages - Centralized error handling
export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Network error. Please check your connection.",
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
  },
  LISTINGS: {
    NOT_FOUND: "Listing not found.",
    FETCH_FAILED: "Failed to fetch listings.",
    UPDATE_FAILED: "Failed to update listing.",
    DELETE_FAILED: "Failed to delete listing.",
  },
} as const

// Success Messages - Centralized success feedback
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Welcome back!",
    LOGOUT_SUCCESS: "Signed out successfully",
  },
  LISTINGS: {
    APPROVED: "Listing approved successfully",
    REJECTED: "Listing rejected successfully",
    UPDATED: "Listing updated successfully",
    DELETED: "Listing deleted successfully",
  },
} as const
