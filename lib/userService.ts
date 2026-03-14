import bcrypt from 'bcrypt';
import prisma from './prisma';

export async function createUser(username: string, password: string) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { username, password: encryptedPassword },
  });
}
