import { connectToDB } from '@/app/api/db';
import { ObjectId } from 'mongodb';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { recommendParts } from '@/app/lib/ai/recommendParts';

export async function POST(request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET);
  let payload = null;

  try {
    ({ payload } = await jwtVerify(session.value, secret));
  } catch (error) {
    console.error('JWT verification failed', error);
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const itemId = body?.itemId;

  if (!itemId) {
    return NextResponse.json({ error: 'itemId is required' }, { status: 400 });
  }

  const { db } = await connectToDB();

  const userId = payload.userId;

  const selectedItem = await db.collection('garageItems').findOne({
    _id: new ObjectId(itemId),
    userId,
  });

  if (!selectedItem) {
    return NextResponse.json({ error: 'Garage item not found' }, { status: 404 });
  }

  try {
    const recommendationResult = await recommendParts([selectedItem]);
    return NextResponse.json(recommendationResult);
  } catch (error) {
    return NextResponse.json(
      { error: 'Recommendations could not be generated. Please try again.' },
      { status: 502 }
    );
  }
}