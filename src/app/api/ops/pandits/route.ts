import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const pandits = await prisma.pandit.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    return NextResponse.json({ success: true, pandits });
  } catch (error) {
    console.error('Ops Pandits GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pandits' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, city, specialization, experienceYears, rating, avatarUrl } = body;

    if (!name || !phone || !city) {
      return NextResponse.json(
        { error: 'Name, phone, and city are required fields.' },
        { status: 400 }
      );
    }

    const existingPandit = await prisma.pandit.findUnique({
      where: { phone },
    });

    if (existingPandit) {
      return NextResponse.json(
        { error: `A scholar with phone number ${phone} is already registered.` },
        { status: 409 }
      );
    }

    const newPandit = await prisma.pandit.create({
      data: {
        name,
        phone,
        city,
        specialization: specialization || 'General Vedic Ceremonies',
        experienceYrs: Number(experienceYears) || 5,
        rating: Number(rating) || 5.0,
        avatarUrl: avatarUrl || null,
        active: true,
      },
    });

    return NextResponse.json({ success: true, pandit: newPandit });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A scholar with these details already exists in the system.' },
        { status: 409 }
      );
    }

    console.error('Ops Pandits POST Error:', error);
    return NextResponse.json({ error: 'Failed to onboard scholar. Please try again.' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, active } = body;

    if (!id || typeof active !== 'boolean') {
      return NextResponse.json({ error: 'ID and active status required' }, { status: 400 });
    }

    const updated = await prisma.pandit.update({
      where: { id },
      data: { active },
    });

    return NextResponse.json({ success: true, pandit: updated });
  } catch (error) {
    console.error('Ops Pandits PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update pandit status' }, { status: 500 });
  }
}
