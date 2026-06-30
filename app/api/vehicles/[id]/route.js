import { connectToDB } from '@/app/api/db';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

export async function PUT(request, { params }) {
    const { db } = await connectToDB();
    const { id } = await params;
    const data = await request.json();

    await db.collection('cars').updateOne({
        _id: new ObjectId(id)
        },
        { 
            $set: {
                make: data.make,
                model: data.model,
                year: parseInt(data.year),
                extraInfo: data.extraInfo,
                imageName: data.imageName,
                updatedAt: new Date()
            }
        }
    );
    
    revalidatePath('/gallery');
    revalidatePath(`/gallery/edit/${id}`);
    
    return NextResponse.json({ 
        message: 'Vehicle updated successfully' 
    }, { status: 200 });
};

export async function DELETE(request, { params }) {
    const {db}  = await connectToDB();
    const {id} =  await params;
    
    await db.collection('cars').deleteOne({ 
        _id: new ObjectId(id) 
    });
    
    revalidatePath('/gallery');
    
    return NextResponse.json({ 
        message: 'Vehicle deleted' 
    }, { status: 200 });
}