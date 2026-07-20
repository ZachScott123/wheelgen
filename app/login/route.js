"use server"

import { redirect } from 'next/navigation'
import { getGoogleOauthUrl } from '@/googleOauthUtils';

export async function handleLoginAction() {
    const redirectURL = getGoogleOauthUrl();
    redirect(redirectURL);
}