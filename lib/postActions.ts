'use server';

import { addPost } from './postService';

export async function createPost(title: string, description?: string) {
  return await addPost(title, description);
}
