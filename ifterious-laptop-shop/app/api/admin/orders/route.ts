import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { dbName } from '../../submit-form/mongo';
import { ObjectId } from 'mongodb';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'mysecrettoken'; // Change this in production!

function isAdmin(request: NextRequest) {
  const token = request.headers.get('x-admin-token');
  return token === ADMIN_TOKEN;
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { _id, ...updateFields } = await request.json();
    if (!_id) return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db(dbName);
    const ordersCollection = db.collection('orders');
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateFields, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { _id } = await request.json();
    if (!_id) return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    const client = await clientPromise;
    const db = client.db(dbName);
    const ordersCollection = db.collection('orders');
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(_id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Order deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 