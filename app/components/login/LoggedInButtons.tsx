import { useSession } from '../SessionProvider';

export default function LoggedInButtons() {
  const { username } = useSession();

  return (
    <div className="flex items-center gap-2">
      <div className="bg-secondary w-32 truncate rounded-md p-1 text-center font-semibold">
        {username}
      </div>
      <div className="bg-secondary w-32 truncate rounded-md p-1 text-center font-semibold">
        Logout
      </div>
    </div>
  );
}
