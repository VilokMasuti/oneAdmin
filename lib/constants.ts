// API Configuration
export const API_CONFIG = {
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  SEARCH: {
    DEBOUNCE_DELAY: 500,
    MIN_SEARCH_LENGTH: 2,
  },
  AUTH: {
    TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    COOKIE_NAME: "admin-token",
    EMAIL_COOKIE_NAME: "admin-email",
  },
} as const

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

// UI Constants
export const UI_CONFIG = {
  ANIMATIONS: {
    DURATION: {
      FAST: 0.2,
      NORMAL: 0.3,
      SLOW: 0.5,
    },
    EASING: [0.16, 1, 0.3, 1] as const,
    STAGGER_DELAY: 0.1,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
} as const

// Error Messages
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
