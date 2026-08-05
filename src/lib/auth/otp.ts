import crypto from "crypto";
import { OTP_EXPIRY_MINUTES, OTP_LENGTH } from "./constants";

// Temporary in-memory OTP verification store for development/MVP
interface OTPRecord {
  identifier: string;
  otpHash: string;
  expiresAt: Date;
  attempts: number;
}

const otpStore = new Map<string, OTPRecord>();

export const otpService = {
  /**
   * Hashes plain text OTP using SHA-256 for secure comparison.
   */
  hashOTP(otp: string): string {
    return crypto.createHash("sha256").update(otp).digest("hex");
  },

  /**
   * Generates a random numeric OTP code.
   */
  generateCode(): string {
    if (process.env.NODE_ENV === "development") {
      return "123456";
    }
    const digits = "0123456789";
    let code = "";
    const randomBytes = crypto.randomBytes(OTP_LENGTH);
    for (let i = 0; i < OTP_LENGTH; i++) {
      code += digits[randomBytes[i] % 10];
    }
    return code;
  },

  /**
   * Generates, stores, and dispatches an OTP to a phone or email identifier.
   */
  async sendOTP(identifier: string, type: "PHONE" | "EMAIL"): Promise<{ success: boolean; message: string }> {
    const rawCode = this.generateCode();
    const otpHash = this.hashOTP(rawCode);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save hashed OTP in store
    otpStore.set(identifier, {
      identifier,
      otpHash,
      expiresAt,
      attempts: 0,
    });

    // Logging for developer inspection in terminal
    console.log(`\n========================================`);
    console.log(`[OTP DISPATCH] ${type} -> ${identifier}`);
    console.log(`[DEV OTP CODE] ${rawCode}`);
    console.log(`[EXPIRATION]   ${expiresAt.toISOString()}`);
    console.log(`========================================\n`);

    // TODO: Connect Twilio / MSG91 / Firebase Gateway here for production SMS
    return {
      success: true,
      message: `OTP sent successfully to ${identifier}`,
    };
  },

  /**
   * Verifies incoming user OTP code against the stored hash.
   */
  async verifyOTP(identifier: string, inputCode: string): Promise<{ valid: boolean; message: string }> {
    const record = otpStore.get(identifier);

    if (!record) {
      return { valid: false, message: "No active OTP found. Please request a new code." };
    }

    // Check expiration
    if (new Date() > record.expiresAt) {
      otpStore.delete(identifier);
      return { valid: false, message: "OTP has expired. Please request a new code." };
    }

    // Check rate limit attempts (Max 3 failed attempts)
    if (record.attempts >= 3) {
      otpStore.delete(identifier);
      return { valid: false, message: "Too many failed attempts. Please request a new OTP." };
    }

    const inputHash = this.hashOTP(inputCode);

    if (inputHash === record.otpHash) {
      otpStore.delete(identifier); // Consume OTP after successful match
      return { valid: true, message: "OTP verified successfully." };
    }

    // Increment attempt counter on mismatch
    record.attempts += 1;
    return { valid: false, message: `Invalid OTP code. ${3 - record.attempts} attempts remaining.` };
  },
};