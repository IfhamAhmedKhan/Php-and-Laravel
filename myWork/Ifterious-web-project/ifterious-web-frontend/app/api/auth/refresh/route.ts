import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        
        // Call backend refresh endpoint
        const response = await fetch(`${baseUrl}/api/user/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            
            const nextResponse = NextResponse.json({ token: data.token });
            
            // Set the new access token as httpOnly cookie
            nextResponse.cookies.set('accessToken', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 // 15 minutes
            });
            
            return nextResponse;
        }
        
        return NextResponse.json({ error: 'Failed to refresh token' }, { status: 401 });
    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 