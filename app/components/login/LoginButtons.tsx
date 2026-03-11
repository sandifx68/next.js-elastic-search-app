import Link from 'next/link';

export default function LoginButtons() {
  return (
    <div className="flex items-center">
      <Link href="/sign-up" className="p-1">
        Sign up
      </Link>
      <Link href="/login" className="p-1">
        Login
      </Link>
    </div>
  );
}
