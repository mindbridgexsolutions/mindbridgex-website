import redis from './redis';

const OTP_EXPIRY_SECONDS = 300; // 5 minutes

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOTP(identifier: string, otp: string): Promise<void> {
  const key = `otp:${identifier.toLowerCase()}`;
  await redis.set(key, otp, 'EX', OTP_EXPIRY_SECONDS);
}

export async function verifyOTP(identifier: string, inputOtp: string): Promise<boolean> {
  const key = `otp:${identifier.toLowerCase()}`;
  const storedOtp = await redis.get(key);

  if (!storedOtp) return false;

  if (storedOtp === inputOtp) {
    await redis.del(key); // Invalidate OTP after single successful use
    return true;
  }

  return false;
}
