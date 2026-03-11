import Link from 'next/link';
import LoginButtons from './login/LoginButtons';

export default function Navbar() {
  return (
    <nav className="border-accent flex items-center justify-between rounded-b-lg border-3 p-5">
      <Link href="/">
        <i>elastic-search-app</i>
      </Link>
      <LoginButtons />
    </nav>
  );
}
