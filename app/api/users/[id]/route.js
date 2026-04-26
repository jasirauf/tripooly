import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/auth';

export async function DELETE(request, { params }) {
  try {
    const token = request.cookies.get('tripooly_token')?.value;
    const payload = await verifyToken(token);
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const db = await connectToDatabase();
    const { id } = params;

    if (!db) {
      // Mock mode fallback
      return NextResponse.json({ success: true, message: 'Mock DB Fallback: Deleted successfully' });
    }

    // Prevent deleting oneself
    if (payload.id === id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
