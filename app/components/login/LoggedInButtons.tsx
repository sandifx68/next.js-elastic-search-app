'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '../SessionProvider';

export default function LoggedInButtons() {
  const router = useRouter();
  const { username } = useSession();

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-secondary w-32 truncate rounded-md px-1 py-2.5 text-center font-semibold">
        {username}
      </div>
      <button
        onClick={handleLogout}
        className="bg-secondary hover:bg-faded m-4 cursor-pointer rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-150 hover:opacity-90"
      >
        Logout
      </button>
    </div>
  );
}
