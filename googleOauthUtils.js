import {google} from 'googleapis';

const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    process.env.GOOGLE_REDIRECT
)

export const getGoogleOauthUrl = () => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]

    return oauthClient.generateAuthUrl( {
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    })
}

export const getGoogleUser = async (code) => {
    const {tokens} = await oauthClient.getToken(code);
    console.log(tokens);
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`)
    const userInfo = await response.json();
    
    return userInfo;
}