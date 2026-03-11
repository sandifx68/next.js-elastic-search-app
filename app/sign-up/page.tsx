'use client';

import { useRouter } from 'next/navigation';
import TextInput from '../components/input/TextInput';
import { SubmitEvent, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function createUser() {
    console.log(
      `User: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );
  }

  function blankError(field: string) {
    return `${field} cannot be blank`;
  }

  async function validateForm(): Promise<string> {
    const errors: string[] = [];
    const fields = [
      { value: username, label: 'Username' },
      { value: password, label: 'Password' },
      { value: confirmPassword, label: 'Confirm password' },
    ];

    fields.forEach(({ value, label }) => {
      if (!value) errors.push(blankError(label));
    });

    if (password && confirmPassword && password != confirmPassword)
      errors.push('Password and confirm password do not match.');

    const errorString = errors.join('. ');
    return errorString;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const errorString = await validateForm();
    if (errorString) {
      setError(errorString);
      return;
    }

    // TODO: handle server side errors
    createUser();
    router.push('/');
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="border-accent bg-secondary flex w-1/3 flex-col items-center justify-center rounded-md border"
      >
        <div className="p-4 text-xl">
          Welcome to <i>elastic-search-app</i>!
        </div>
        <TextInput
          id="username-input"
          label="Username"
          value={username}
          onChange={setUsername}
        />
        <TextInput
          id="password-input"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <TextInput
          id="confirm-password-input"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-primary hover:bg-faded m-4 cursor-pointer rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-150 hover:opacity-90"
        >
          Sign up!
        </button>
      </form>
    </div>
  );
}
