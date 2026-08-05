import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    let pandits = await prisma.pandit.findMany({
      where: { active: true },
      include: {
        reviews: {
          include: {
            user: { select: { name: true } },
            ceremony: { select: { name: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
      },
    });

    // Seed default Pandits if none exist
    if (pandits.length === 0) {
      const defaultPandits = [
        {
          name: 'Pandit Ramesh Shastri',
          phone: '+919820012345',
          city: 'Mumbai',
          experienceYrs: 18,
          specialization: 'Rigveda Samhita, Satyanarayan & Vastu Specialist',
          rating: 4.9,
          totalReviews: 24,
        },
        {
          name: 'Acharya Suresh Upadhyay',
          phone: '+919820054321',
          city: 'Pune',
          experienceYrs: 12,
          specialization: 'Yajurveda, Mahamrityunjaya Jaap & Havan Specialist',
          rating: 4.8,
          totalReviews: 18,
        },
        {
          name: 'Pandit Vidyadhar Joshi',
          phone: '+919830098765',
          city: 'Thane',
          experienceYrs: 15,
          specialization: 'Griha Pravesh, Ganesh Yagya & Vivah Sanskar',
          rating: 5.0,
          totalReviews: 31,
        },
      ];

      for (const p of defaultPandits) {
        await prisma.pandit.upsert({
          where: { phone: p.phone },
          update: {},
          create: p,
        });
      }

      pandits = await prisma.pandit.findMany({
        where: { active: true },
        include: {
          reviews: {
            include: {
              user: { select: { name: true } },
              ceremony: { select: { name: true } },
            },
          },
        },
      });
    }

    return NextResponse.json({ success: true, pandits });
  } catch (error) {
    console.error('Fetch Pandits Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pandits' }, { status: 500 });
  }
}
