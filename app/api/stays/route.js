import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Stay from '../../../models/Stay';

export async function GET() {
  try {
    await connectToDatabase();
    const stays = await Stay.find({}).sort({ createdAt: -1 });
    return NextResponse.json(stays);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newStay = await Stay.create(body);
    return NextResponse.json(newStay, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
