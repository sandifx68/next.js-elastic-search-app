import LoginButtons from './login/LoginButtons';

export default function Navbar() {
  return (
    <nav className="border-accent flex items-center justify-between border-3 p-5">
      <span>
        <i>elastic-search-app</i>
      </span>
      <LoginButtons />
    </nav>
  );
}
