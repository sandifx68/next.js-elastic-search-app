import PostList from './components/posts/PostList';

export default function Home() {
  return (
    <div className="grid flex-1 grid-cols-6">
      <div className="col-span-4 col-start-2">
        <PostList />
      </div>
    </div>
  );
}
