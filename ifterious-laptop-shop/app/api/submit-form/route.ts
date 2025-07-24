import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { dbName } from './mongo';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  // Accepts +countrycode and 10-15 digits
  return /^\+?\d{10,15}$/.test(phone);
}

function validateName(name: string) {
  return name.length > 0 && name.length <= 15;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, payment, phone, email, card } = body;

    if (!validateName(name)) {
      return NextResponse.json({ error: 'Name must be 1-15 characters.' }, { status: 400 });
    }
    if (!address || address.length < 5) {
      return NextResponse.json({ error: 'Address is required.' }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }
    if (!validatePhone(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format.' }, { status: 400 });
    }
    if (!['online', 'cod'].includes(payment)) {
      return NextResponse.json({ error: 'Invalid payment option.' }, { status: 400 });
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db(dbName);
    const order = { name, address, payment, phone, email, date: new Date().toISOString() };
    if (payment === 'online' && card) {
      order['card'] = card;
    }
    await db.collection('orders').insertOne(order);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
} 