"use server"

import { redirect } from 'next/navigation'
import { getGoogleOauthUrl } from '@/googleOauthUtils';
import { cookies } from 'next/headers'

export async function handleLoginAction() {
    const redirectURL = getGoogleOauthUrl();
    redirect(redirectURL);
}

export async function handleLogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/');
}

export async function checkAuthStatus() {
    "use server"
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    return { isLoggedIn: !!session };
}