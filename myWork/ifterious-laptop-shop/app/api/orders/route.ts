import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { dbName } from '../submit-form/mongo';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(dbName);
    const ordersCollection = db.collection('orders');

    // Find orders for the specific user
    const orders = await ordersCollection
      .find({ userId: userId })
      .sort({ createdAt: -1 }) // Most recent first
      .toArray();

    return NextResponse.json(
      { orders: orders },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 