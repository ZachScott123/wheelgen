import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { connectToDB } from '@/app/api/db';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(sessionCookie.value, secret);
    const userId = payload?.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const formData = await request.formData();
    const category = formData.get('category');

    const baseItem = {
      userId,
      category,
      createdAt: new Date(),
    };

    let itemToSave = null;

    if (category === 'vehicle') {
      itemToSave = {
        ...baseItem,
        type: 'vehicle',
        imageName: formData.get('imageName') || '',
        year: Number(formData.get('year') || 0),
        make: formData.get('make') || '',
        model: formData.get('model') || '',
        extraInfo: formData.get('extraInfo') || '',
      };
    } else if (category === 'rims') {
      itemToSave = {
        ...baseItem,
        type: 'rim',
        name: formData.get('name') || '',
        brand: formData.get('brand') || '',
        size: formData.get('size') || '',
        finish: formData.get('finish') || '',
        price: formData.get('price') || '',
        extraInfo: formData.get('extraInfo') || '',
      };
    } else if (category === 'accessories') {
      itemToSave = {
        ...baseItem,
        type: 'accessory',
        name: formData.get('name') || '',
        brand: formData.get('brand') || '',
        category: formData.get('category') || '',
        price: formData.get('price') || '',
        extraInfo: formData.get('extraInfo') || '',
      };
    } else {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const { db } = await connectToDB();
    const result = await db.collection('garageItems').insertOne(itemToSave);

    revalidatePath('/garage');

    return NextResponse.json({
      message: 'Garage item saved successfully',
      id: result.insertedId,
      redirect: '/garage',
    }, { status: 200 });
  } catch (error) {
    console.error('Garage save error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
