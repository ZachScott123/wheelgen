import GarageForm from '@/app/components/garageform.js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';

export default async function Upload() {

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie?.value) {
    redirect('/');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(sessionCookie.value, secret);

    if (!payload?.userId) {
    redirect('/');
    }
  
  return (
    <div>
      <GarageForm />
    </div>
  );
}
