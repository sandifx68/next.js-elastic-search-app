import { getPosts } from '@/lib/postService';
import Post from './PostComponent';

export default async function PostList() {
  const posts = (await getPosts()) || [];

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto py-4 pr-4">
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
