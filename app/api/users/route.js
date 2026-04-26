import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/auth';

export async function GET(request) {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json([
        { _id: '1', username: 'admin', role: 'admin', createdAt: new Date() }
      ]);
    }
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const token = request.cookies.get('tripooly_token')?.value;
    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const db = await connectToDatabase();
    const { username, email, phone, password, role } = await request.json();

    if (!username || !email || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!/^\+?[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone format (10-15 digits)' }, { status: 400 });
    }

    if (!db) {
      // Mock mode fallback
      return NextResponse.json({ 
        success: true, 
        user: { _id: Math.random().toString(), username, email, phone, role: 'user', createdAt: new Date() },
        message: 'Mock DB Fallback: User created virtually' 
      }, { status: 201 });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }, { phone }] });
    if (existing) {
      let conflictField = 'Username';
      if (existing.email === email) conflictField = 'Email';
      if (existing.phone === phone) conflictField = 'Phone number';
      return NextResponse.json({ error: `${conflictField} is already registered` }, { status: 400 });
    }

    const newUser = await User.create({ username, email, phone, password, role: role || 'user' });
    return NextResponse.json({ success: true, user: { _id: newUser._id, username: newUser.username, email: newUser.email, phone: newUser.phone, role: newUser.role, createdAt: newUser.createdAt } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
