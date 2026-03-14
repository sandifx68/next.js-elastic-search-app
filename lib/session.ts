import { SessionOptions } from 'iron-session';
import { User } from '@/app/generated/prisma/browser';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId: number;
  username: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'elastic-search-app_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function setSession(user: User) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  session.userId = user.id;
  session.username = user.username;
  await session.save();
}
