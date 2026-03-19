'use client';
import Link from 'next/link';
import LoginButtons from './login/LoginButtons';
import { useSession } from './SessionProvider';
import LoggedInButtons from './login/LoggedInButtons';

export default function Navbar() {
  const { userId } = useSession();

  return (
    <nav className="border-accent flex items-center justify-between rounded-b-lg border-3 p-5">
      <Link href="/">
        <i>elastic-search-app</i>
      </Link>
      {userId ? <LoggedInButtons /> : <LoginButtons />}
    </nav>
  );
}
