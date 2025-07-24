import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'orders.json');

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
    const { name, address, payment, phone, email } = body;

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

    // Ensure data directory exists
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (e) {}

    let orders = [];
    try {
      const file = await fs.readFile(DATA_FILE, 'utf-8');
      orders = JSON.parse(file);
      if (!Array.isArray(orders)) orders = [];
    } catch (e) {
      orders = [];
    }

    const newOrder = { name, address, payment, phone, email, date: new Date().toISOString() };
    orders.push(newOrder);
    await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
} 