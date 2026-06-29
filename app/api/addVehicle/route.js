import {connectToDB} from '@/app/api/db';
import {NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'

export async function POST(request) {
    const {db} = await connectToDB();
    
    const formData = await request.formData();

    const imageName = formData.get('imageName');
    const year = formData.get('year');
    const make = formData.get('make');
    const model = formData.get('model');
    const extraInfo = formData.get('extraInfo');

    console.log('Received data:', { imageName, year, make, model, extraInfo });

    if (!make || !model || !year) {
        return NextResponse.json(
            { error: 'Make, model, and year are required' },
            { status: 400 }
        );
    }

    const result = await db.collection('cars').insertOne({ 
        imageName: imageName, 
        year: parseInt(year), 
        make: make, 
        model: model, 
        extraInfo: extraInfo
    });

    revalidatePath('/gallery');

    return NextResponse.json({
        message: 'Vehicle added successfully',
        id: result.insertedId,
        redirect: '/gallery'
    }, { status: 200 });
}