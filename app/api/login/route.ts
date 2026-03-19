import { setSession } from '@/lib/session';
import { verifyPassword } from '@/lib/userService';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const user = await verifyPassword(username, password);
  if (!user || user === true) {
    return NextResponse.json(
      {
        errors: ['Invalid username or password.'],
      },
      { status: 401 }
    );
  }

  await setSession(user);
  return NextResponse.json({ success: true }, { status: 200 });
}
