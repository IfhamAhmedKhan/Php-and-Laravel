import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('accessToken')?.value;
        
        if (token) {
            return NextResponse.json({ token });
        }
        
        return NextResponse.json({ token: null });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get token' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        
        const response = NextResponse.json({ success: true });
        
        // Set access token as httpOnly cookie
        response.cookies.set('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 // 15 minutes
        });
        
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Failed to set token' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const response = NextResponse.json({ success: true });
        
        // Clear both access and refresh tokens
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Failed to remove token' }, { status: 500 });
    }
} 