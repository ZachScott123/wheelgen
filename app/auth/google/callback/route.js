import { getGoogleUser } from "@/googleOauthUtils";
import { connectToDB } from "@/app/api/db";
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    try {
        const oauthUserInfo = await getGoogleUser(code);
        
        const { db } = await connectToDB();

        let user = await db.collection('users').findOne({ email: oauthUserInfo.email });

        if (!user) {
            const newUser = {
                username: oauthUserInfo.name,
                email: oauthUserInfo.email,
                picture: oauthUserInfo.picture,
                googleId: oauthUserInfo.id
            };
            const result = await db.collection('users').insertOne(newUser);
            user = await db.collection('users').findOne({ _id: result.insertedId });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = 'HS256';

        const jwt = await new SignJWT({ 'userId': user._id.toString() })
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret);
        
        const cookieStore = await cookies();
        cookieStore.set('session', jwt, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV == 'production',
            path: '/' 
        });

        return NextResponse.redirect(new URL('/', request.url));

    } catch (error) {
        console.error("OAuth Error:", error);
        return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
    }
}