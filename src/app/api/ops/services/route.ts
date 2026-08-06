import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.ceremony.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error('Ops Services GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, description, basePrice, durationMinutes, slug } = body;

    if (!name || !category || !basePrice) {
      return NextResponse.json(
        { error: 'Name, category, and base price are required fields.' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not explicitly passed
    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const newService = await prisma.ceremony.create({
      data: {
        name,
        slug: generatedSlug,
        category,
        description: description || '',
        basePrice: Number(basePrice),
        durationMinutes: Number(durationMinutes) || 120,
      },
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    console.error('Ops Services POST Error:', error);
    return NextResponse.json({ error: 'Failed to create ceremony service.' }, { status: 500 });
  }
}
