import { NextResponse } from 'next/server';

export async function POST() {
    console.log('Test POST endpoint hit');
    return NextResponse.json(
        { message: 'Test successful' },
        { status: 200 }
    );
}