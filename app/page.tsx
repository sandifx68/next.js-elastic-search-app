import PostList from './components/posts/PostList';

export default function Home() {
  return (
    <div className="grid h-full grid-cols-12">
      <div className="col-span-12 overflow-hidden md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
        <PostList />
      </div>
    </div>
  );
}
