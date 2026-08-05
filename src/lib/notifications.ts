export interface OTPNotificationParams {
  email: string;
  phone?: string;
  otp: string;
}

export interface BookingNotificationParams {
  email: string;
  phone?: string;
  devoteeName?: string;
  ceremonyName: string;
  scheduledAt: Date;
  venueAddress: string;
  totalPrice: number;
}

export async function sendOTPNotification({ email, phone, otp }: OTPNotificationParams) {
  console.log(`[NOTIFICATION] Dispatching OTP [${otp}] to ${email}${phone ? ` and ${phone}` : ''}`);

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'VedaSetu Authentication <auth@vedasetu.com>',
          to: [email],
          subject: 'Your VedaSetu Verification Code',
          html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #eee; border-radius: 12px;">
              <h2 style="color: #b45309; margin-top: 0;">🕉️ VedaSetu Passcode</h2>
              <p>Your one-time passcode for logging in is:</p>
              <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1d1d1f; background: #fdf8f6; padding: 12px; text-align: center; border-radius: 8px; margin: 16px 0;">
                ${otp}
              </div>
              <p style="font-size: 12px; color: #86868b;">This code is valid for 5 minutes. Do not share this code with anyone.</p>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.error('[NOTIFICATION-ERROR] Email failed:', err);
    }
  }

  if (phone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const bodyParams = new URLSearchParams({
        From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886'}`,
        To: `whatsapp:${phone}`,
        Body: `🕉️ *VedaSetu Verification Code*\n\nYour OTP is *${otp}*. Valid for 5 minutes.`,
      });

      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      });
    } catch (err) {
      console.error('[NOTIFICATION-ERROR] WhatsApp failed:', err);
    }
  }
}

export async function sendBookingNotification({
  email,
  phone,
  devoteeName,
  ceremonyName,
  scheduledAt,
  venueAddress,
  totalPrice,
}: BookingNotificationParams) {
  const formattedDate = new Date(scheduledAt).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  console.log(`[NOTIFICATION] Sending Booking Confirmation for ${ceremonyName} to ${email}`);

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'VedaSetu Ceremonies <bookings@vedasetu.com>',
          to: [email],
          subject: `Booking Confirmed: ${ceremonyName}`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; max-width: 550px; border: 1px solid #f3f4f6; border-radius: 16px; background: #ffffff;">
              <h2 style="color: #b45309; margin-top: 0;">🕉️ Ceremony Booking Confirmed</h2>
              <p>Namaste <strong>${devoteeName || 'Devotee'}</strong>,</p>
              <p>Your request for <strong>${ceremonyName}</strong> has been successfully booked!</p>
              
              <div style="background: #fcf8f2; padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #d97706;">
                <p style="margin: 4px 0;"><strong>📅 Date & Time:</strong> ${formattedDate}</p>
                <p style="margin: 4px 0;"><strong>📍 Venue:</strong> ${venueAddress}</p>
                <p style="margin: 4px 0;"><strong>💵 Dakshina:</strong> ₹${totalPrice.toLocaleString('en-IN')}</p>
              </div>

              <p style="font-size: 13px; color: #4b5563;">A verified Pandit will be assigned shortly. You can track your booking status in your VedaSetu account dashboard.</p>
            </div>
          `,
        }),
      });
    } catch (err) {
      console.error('[NOTIFICATION-ERROR] Booking email failed:', err);
    }
  }

  if (phone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');
      const messageBody = `🕉️ *VedaSetu Booking Confirmed*\n\nNamaste ${devoteeName || 'Devotee'},\nYour *${ceremonyName}* is confirmed.\n\n📅 *Date:* ${formattedDate}\n📍 *Venue:* ${venueAddress}\n💰 *Dakshina:* ₹${totalPrice.toLocaleString('en-IN')}\n\nThank you for choosing VedaSetu.`;

      const bodyParams = new URLSearchParams({
        From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886'}`,
        To: `whatsapp:${phone}`,
        Body: messageBody,
      });

      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      });
    } catch (err) {
      console.error('[NOTIFICATION-ERROR] WhatsApp notification failed:', err);
    }
  }
}
