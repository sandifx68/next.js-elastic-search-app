import { getIronSession } from 'iron-session';
import prisma from './prisma';
import { SessionData, sessionOptions } from './session';
import { cookies } from 'next/headers';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import ValidationError from './ValidationError';

export async function getPosts() {
  return prisma.post.findMany({ include: { author: true } });
}

export async function addPost(title: string, description?: string) {
  const { userId } = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!userId) {
    throw new ValidationError('You must be logged in to create a post');
  }

  try {
    return await prisma.post.create({
      data: { title, description, authorId: userId },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      switch (e.code) {
        case 'P2003':
          throw new ValidationError('Author does not exist');
        case 'P2000':
          throw new ValidationError('Content is too long');
        default:
          throw e;
      }
    }
    throw e; // rethrow any other unexpected errors
  }
}
