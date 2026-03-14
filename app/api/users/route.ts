import { createUser } from '@/lib/userService';
import { setSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const user = await createUser(body.username, body.password);
  await setSession(user);
  return NextResponse.json(user, { status: 201 });
}
