import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Package from '../../../../models/Package';

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();
    const updatedPackage = await Package.findOneAndUpdate({ id: parseInt(id) }, body, { new: true });
    if (!updatedPackage) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updatedPackage);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const deletedPackage = await Package.findOneAndDelete({ id: parseInt(id) });
    if (!deletedPackage) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
