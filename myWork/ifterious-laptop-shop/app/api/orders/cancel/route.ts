import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { dbName } from '../../submit-form/mongo';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
  try {
    const { orderId, userId } = await request.json();

    if (!orderId || !userId) {
      return NextResponse.json({ error: 'Order ID and User ID are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const ordersCollection = db.collection('orders');

    // Find the order and verify it belongs to the user
    const order = await ordersCollection.findOne({ 
      _id: new ObjectId(orderId), 
      userId: userId 
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }

    // Check if order is already cancelled
    if (order.status === 'cancelled') {
      return NextResponse.json({ error: 'Order is already cancelled' }, { status: 400 });
    }

    // Update order status to cancelled
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId), userId: userId },
      { 
        $set: { 
          status: 'cancelled',
          updatedAt: new Date().toISOString()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Failed to cancel order' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Order cancelled successfully',
      orderId: orderId 
    }, { status: 200 });

  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 