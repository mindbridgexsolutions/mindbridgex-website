export type UserRole = "CUSTOMER" | "ADMIN";

export interface User {
  id: string;
  phone?: string | null;
  email?: string | null;
  fullName?: string | null;
  role: UserRole;
  alternatePhone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  role: UserRole;
  expiresAt: Date;
  createdAt?: Date;
  userAgent?: string | null;
  ipAddress?: string | null;
}

export interface OTPVerification {
  id: string;
  identifier: string; // Phone number or Email address
  otpHash: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

// API DTO Contracts
export interface SendOTPRequest {
  identifier: string;
  type: "PHONE" | "EMAIL";
}

export interface SendOTPResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPRequest {
  identifier: string;
  code: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    role: UserRole;
    identifier: string;
  };
}

export interface OTPRecord {
  identifier: string;
  codeHash: string;
  expiresAt: Date;
  attempts: number;
}