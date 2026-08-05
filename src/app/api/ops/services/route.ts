import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const ceremonies = await prisma.ceremony.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    return NextResponse.json({ success: true, ceremonies });
  } catch (error) {
    console.error('Ops Services GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, description, basePrice, durationMinutes, samagriIncluded } = body;

    if (!name || !category || !basePrice) {
      return NextResponse.json(
        { error: 'Name, category, and base price are required' },
        { status: 400 }
      );
    }

    const newCeremony = await prisma.ceremony.create({
      data: {
        name,
        category,
        description: description || 'Authentic Vedic ceremony performed according to Sanatana Vidhi.',
        basePrice: Number(basePrice),
        durationMinutes: Number(durationMinutes) || 120,
        samagriIncluded: Boolean(samagriIncluded),
      },
    });

    return NextResponse.json({ success: true, ceremony: newCeremony });
  } catch (error) {
    console.error('Ops Services POST Error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, basePrice, durationMinutes, samagriIncluded } = body;

    if (!id) {
      return NextResponse.json({ error: 'Ceremony ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (basePrice !== undefined) updateData.basePrice = Number(basePrice);
    if (durationMinutes !== undefined) updateData.durationMinutes = Number(durationMinutes);
    if (samagriIncluded !== undefined) updateData.samagriIncluded = Boolean(samagriIncluded);

    const updated = await prisma.ceremony.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, ceremony: updated });
  } catch (error) {
    console.error('Ops Services PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
