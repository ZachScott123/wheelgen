import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';

export default async function Garage() {
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
      <div className="max-w-3xl mx-auto">
        <Link href="/garage/upload" className="btn-accent w-full block text-center">
          Upload to Garage
        </Link>
      </div>
    </div>
  );
}
