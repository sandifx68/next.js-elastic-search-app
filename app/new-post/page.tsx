'use client';

import { SubmitEvent, useState } from 'react';
import TextInput from '../components/input/TextInput';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function getClientSideErrors() {
    const errors: string[] = [];
    if (!title) {
      errors.push('Title cannot be blank.');
    } else if (title.length > 200) {
      errors.push('Title cannot be longer than 200 characters.');
    } else if (description.length > 5000) {
      errors.push('Description cannot be longer than 5000 characters.');
    }
    return errors.join(' ');
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const clientSideErrors = getClientSideErrors();
    if (clientSideErrors) {
      setError(clientSideErrors);
      return;
    }

    const postResponse = await fetch('api/post', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-type': 'application/json' },
    });
    if (!postResponse.ok) {
      const error = (await postResponse.json()).errors.join('. ');
      setError(error || 'There was an error creating the post.');
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <div className="grid h-full grid-cols-12 grid-rows-12">
      <form
        className="border-accent bg-secondary col-span-12 row-span-12 flex flex-col overflow-hidden rounded-md border md:col-span-8 md:col-start-3 md:row-span-10 md:row-start-2 lg:col-span-6 lg:col-start-4"
        method="POST"
        onSubmit={handleSubmit}
      >
        <p className="mt-4 text-center">Create new post</p>
        <TextInput
          id="title"
          label="Title"
          centered={false}
          value={title}
          onChange={setTitle}
        ></TextInput>
        <div className="mx-4 flex flex-1 flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="bg-primary flex-1 resize-none rounded p-1 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <p className="m-2 text-center text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-primary hover:bg-faded m-4 cursor-pointer rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-150 hover:opacity-90"
        >
          Create post!
        </button>
      </form>
    </div>
  );
}
