import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import { signToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Missing identifier or password' }, { status: 400 });
    }

    const db = await connectToDatabase();

    let userRole = null;
    let userId = 'mock-id';

    if (!db) {
      // Fallback mode if DB is not connected
      if (identifier === 'admin' && password === 'admin') {
        userRole = 'admin';
        console.log("Mock DB fallback: Logged in as admin");
      } else {
        return NextResponse.json({ error: 'Database is offline. Only admin/admin is allowed.' }, { status: 401 });
      }
    } else {
      const user = await User.findOne({ 
        $or: [
          { username: identifier },
          { email: identifier },
          { phone: identifier }
        ]
      });
      if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      userRole = user.role;
      userId = user._id.toString();
    }

    const payload = {
      id: userId,
      username: identifier,
      role: userRole
    };

    const token = await signToken(payload);

    const response = NextResponse.json({ success: true, role: userRole });

    response.cookies.set({
      name: 'tripooly_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
