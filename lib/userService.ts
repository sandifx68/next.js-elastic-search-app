import bcrypt from 'bcrypt';
import prisma from './prisma';
import ValidationError from './ValidationError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export async function createUser(username: string, password: string) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    return await prisma.user.create({
      data: { username, password: encryptedPassword },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      throw new ValidationError('Username is already taken');
    }
    throw e; // rethrow any other unexpected errors
  }
}
