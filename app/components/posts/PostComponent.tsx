import { Post, Prisma } from '@/app/generated/prisma/browser';

type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true };
}>;

export default function PostComponent({ post }: { post: PostWithAuthor }) {
  return (
    <div className="bg-secondary border-accent rounded-md border p-3">
      <div className="italic">{post.author.username}:</div>
      <div className="text-xl">{post.title}</div>
      <div className="mt-2">{post.description}</div>
    </div>
  );
}
