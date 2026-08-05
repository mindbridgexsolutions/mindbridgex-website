import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { bookingId, userId, ceremonyId, rating, comment } = await request.json();

    if (!bookingId || !userId || !ceremonyId || !rating) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5 stars' }, { status: 400 });
    }

    // Ensure booking exists and is COMPLETED
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Create Review
    const review = await prisma.review.create({
      data: {
        bookingId,
        userId,
        ceremonyId,
        rating,
        comment,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Submit Review Error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ceremonyId = searchParams.get('ceremonyId');

    const reviews = await prisma.review.findMany({
      where: ceremonyId ? { ceremonyId } : {},
      include: {
        user: { select: { name: true } },
        ceremony: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error('Fetch Reviews Error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
