

// Status Types
export const LISTING_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ALL: "all",
} as const

export type ListingStatus = (typeof LISTING_STATUS)[keyof typeof LISTING_STATUS]

// Audit Actions
export const AUDIT_ACTIONS = {
  APPROVED: "Approved",
  REJECTED: "Rejected",
  EDITED: "Edited",
  CREATED: "Created",
  DELETED: "Deleted",
} as const

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS]




// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Network error. Please check your connection.",

  LISTINGS: {
    NOT_FOUND: "Listing not found.",
    FETCH_FAILED: "Failed to fetch listings.",
    UPDATE_FAILED: "Failed to update listing.",
    DELETE_FAILED: "Failed to delete listing.",
  },
} as const

// Success Messages
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
