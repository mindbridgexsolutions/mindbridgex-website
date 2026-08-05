// Cookie configuration for HttpOnly session management
export const AUTH_COOKIE_NAME = "vedasetu_session";

// Session lifetimes
export const SESSION_EXPIRY_DAYS = 30; // 30 Days rolling
export const CUSTOMER_SESSION_EXPIRY_SECONDS = 30 * 24 * 60 * 60; // 30 Days rolling
export const ADMIN_SESSION_EXPIRY_SECONDS = 8 * 60 * 60; // 8 Hours strict

// OTP rules
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 5;
export const MAX_OTP_ATTEMPTS = 3;

// Protected route paths
export const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/auth",
  "/admin/login",
];

export const CUSTOMER_PROTECTED_ROUTES = [
  "/profile",
  "/my-bookings",
  "/services/[id]/book",
];

export const ADMIN_PROTECTED_ROUTES = [
  "/admin/dashboard",
];