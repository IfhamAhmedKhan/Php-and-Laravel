import { NextRequest, NextResponse } from 'next/server';

// You will need to set these in your environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!; // e.g. https://yourdomain.com/api/auth/google

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Token response:', tokenData);
      return NextResponse.json({ error: 'Failed to get access token', details: tokenData }, { status: 400 });
    }

    // Fetch user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userInfo = await userRes.json();

    // Create the payload you requested
    const payload = {
      email: userInfo.email,
      idToken: tokenData.id_token,
      provider: "google"
    };

    
    console.log('Google idToken:', tokenData.id_token);

    console.log('Google OAuth successful:', {
      email: userInfo.email,
      name: userInfo.name,
      provider: 'google'
    });

    // Create response with user data (without sensitive info)
    const userResponse = {
      _id: userInfo.id, // Changed from id to _id to match UserContext
      email: userInfo.email,
      username: userInfo.name || userInfo.email.split('@')[0],
      name: userInfo.name,
      picture: userInfo.picture,
      provider: 'google',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Redirect to frontend with user data
    const redirectUrl = new URL('/home', request.url);
    redirectUrl.searchParams.set('user', JSON.stringify(userResponse));
    redirectUrl.searchParams.set('auth', 'success');
    
    return NextResponse.redirect(redirectUrl.toString());

  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.json({ 
      error: 'Authentication failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 