import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Package from '../../../models/Package';
import { verifyToken } from '../../../lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const packages = await Package.find({}).sort({ createdAt: -1 });
    return NextResponse.json(packages);
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
    const body = await request.json();

    if (!db) {
      // Mock mode fallback
      return NextResponse.json({ 
        success: true, 
        message: 'Mock DB Fallback: Package created virtually',
        package: { ...body, id: Math.floor(Math.random() * 1000) }
      }, { status: 201 });
    }

    // Auto-generate incrementing ID
    const latestPackage = await Package.findOne().sort({ id: -1 });
    const nextId = latestPackage ? latestPackage.id + 1 : 1;

    const newPackage = await Package.create({ ...body, id: nextId });
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
