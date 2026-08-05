import { NextResponse } from 'next/server';

// Default configuration state
let currentSettings = {
  platformName: 'VedaSetu Operations Console',
  supportEmail: 'ops@vedasetu.org',
  supportPhone: '+91 1800 123 4567',
  scholarDakshinaShare: 80,
  platformMarginShare: 20,
  autoAssignPandits: false,
  enableSmsNotifications: true,
  maintenanceMode: false,
};

export async function GET() {
  return NextResponse.json({ success: true, settings: currentSettings });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    currentSettings = { ...currentSettings, ...body };
    return NextResponse.json({ success: true, settings: currentSettings });
  } catch (error) {
    console.error('Ops Settings PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
