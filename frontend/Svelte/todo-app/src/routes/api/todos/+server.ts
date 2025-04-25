import type { RequestHandler } from './$types';
import { getTodosCollection } from '$lib/db';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  const todos = await (await getTodosCollection()).find().toArray();
  return json(todos);
};

export const POST: RequestHandler = async ({ request }) => {
  const { task } = await request.json();
  if (!task || typeof task !== 'string') {
    return json({ error: 'Invalid todo text' }, { status: 400 });
  }
  const col = await getTodosCollection();
  const result = await col.insertOne({ task, done: false });
  return json({ _id: result.insertedId, task, done: false }, { status: 201 });
};
