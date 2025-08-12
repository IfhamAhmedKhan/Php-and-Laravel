import { NextRequest, NextResponse } from 'next/server';

// You will need to set these in your environment variables
const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID!;
const APPLE_CLIENT_SECRET = process.env.APPLE_CLIENT_SECRET!;
const APPLE_REDIRECT_URI = process.env.APPLE_REDIRECT_URI!; // e.g. https://yourdomain.com/api/auth/apple

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const code = formData.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://appleid.apple.com/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: code as string,
      client_id: APPLE_CLIENT_ID,
      client_secret: APPLE_CLIENT_SECRET,
      redirect_uri: APPLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.id_token) {
    return NextResponse.json({ error: 'Failed to get id_token', details: tokenData }, { status: 400 });
  }

  // Decode the id_token (JWT) to get user info
  // For a real app, use a JWT library to verify and decode
  const base64Url = tokenData.id_token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  const userInfo = JSON.parse(jsonPayload);

  // Here you would create or update the user in your DB and create a session/JWT
  // For now, just return the user info as a demo
  return NextResponse.json({ user: userInfo, tokens: tokenData });
} 