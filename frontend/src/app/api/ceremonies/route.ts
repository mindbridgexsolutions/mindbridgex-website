import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    let ceremonies = await prisma.ceremony.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });

    if (ceremonies.length === 0) {
      const defaultCeremonies = [
        {
          name: 'Satyanarayan Puja',
          slug: 'satyanarayan-puja',
          description: 'A sacred ceremony to thank Lord Vishnu for family prosperity, well-being, and milestone celebrations.',
          durationMinutes: 120,
          basePrice: 3500,
          category: 'PUJA',
          active: true,
        },
        {
          name: 'Griha Pravesh Puja',
          slug: 'griha-pravesh',
          description: 'Housewarming ceremony performed before moving into a new home to purify the space and invite divine energy.',
          durationMinutes: 180,
          basePrice: 7500,
          category: 'VASTU',
          active: true,
        },
        {
          name: 'Maha Mrityunjaya Jaap',
          slug: 'maha-mrityunjaya',
          description: 'Powerful Vedic mantra chanting dedicated to Lord Shiva for healing, health, and longevity.',
          durationMinutes: 240,
          basePrice: 11000,
          category: 'HAVAN',
          active: true,
        },
        {
          name: 'Ganesh Yagya & Havan',
          slug: 'ganesh-yagya',
          description: 'Vedic fire ritual dedicated to Lord Ganesha to remove obstacles and invoke success before starting new ventures.',
          durationMinutes: 90,
          basePrice: 4500,
          category: 'HAVAN',
          active: true,
        },
      ];

      for (const item of defaultCeremonies) {
        await prisma.ceremony.upsert({
          where: { slug: item.slug },
          update: {},
          create: item,
        });
      }

      ceremonies = await prisma.ceremony.findMany({ where: { active: true } });
    }

    return NextResponse.json({ success: true, ceremonies });
  } catch (error) {
    console.error('Fetch Ceremonies Error:', error);
    return NextResponse.json({ error: 'Failed to fetch ceremonies' }, { status: 500 });
  }
}
