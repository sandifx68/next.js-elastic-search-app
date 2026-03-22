import prisma from './prisma';

export async function getPosts() {
  return prisma.post.findMany();
}
