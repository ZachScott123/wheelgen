import { redirect } from 'next/navigation'
import { getGoogleOauthUrl } from '@/googleOauthUtils';

async function handleLoginAction() {
    "use server"
    const redirectURL = getGoogleOauthUrl();
    redirect(redirectURL);
}

export default function LoginPage() {
    return (
        <>
            <h2>Login</h2>
            <form action={handleLoginAction}>
                <button type="submit">Login with Google</button>
            </form>
        </>
    )
}