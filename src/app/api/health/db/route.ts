// src/app/api/health/db/route.ts
import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '../../../../lib/db';

export async function GET() {
  const isHealthy = await checkDatabaseHealth();

  if (!isHealthy) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      status: 'ok',
      message: 'Database is reachable and responding',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}