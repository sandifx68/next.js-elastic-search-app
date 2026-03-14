import { createUser } from '@/lib/userService';
import { setSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import ValidationError from '@/lib/ValidationError';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await createUser(body.username, body.password);
    await setSession(user);
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ errors: [e.message] }, { status: 422 });
    }
    return NextResponse.json(
      { errors: ['Something went wrong'] },
      { status: 500 }
    );
  }
}
