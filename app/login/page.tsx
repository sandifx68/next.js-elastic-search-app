'use client';

import { useRouter } from 'next/navigation';
import TextInput from '../components/input/TextInput';
import { SubmitEvent, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function blankError(field: string) {
    return `${field} cannot be blank`;
  }

  async function validateForm(): Promise<string> {
    const errors: string[] = [];
    const fields = [
      { value: username, label: 'Username' },
      { value: password, label: 'Password' },
    ];

    fields.forEach(({ value, label }) => {
      if (!value) errors.push(blankError(label));
    });

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

    const loginResponse = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    });
    if (!loginResponse.ok) {
      const error = (await loginResponse.json()).errors.join('. ');
      setError(error);
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="border-accent bg-secondary flex w-1/3 flex-col items-center justify-center rounded-md border"
      >
        <div className="p-4 text-xl">Welcome back!</div>
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
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-primary hover:bg-faded m-4 cursor-pointer rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-150 hover:opacity-90"
        >
          Login!
        </button>
      </form>
    </div>
  );
}
