import { connectToDB } from '@/app/api/db';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
    const {db}  = await connectToDB();
    const {id} = await params;
    
    await db.collection('cars').deleteOne({ 
        _id: new ObjectId(id) 
    });
    
    revalidatePath('/gallery');
    
    return NextResponse.json({ 
        message: 'Vehicle deleted' 
    }, { status: 200 });
}