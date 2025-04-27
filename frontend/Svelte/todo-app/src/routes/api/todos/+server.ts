import type { RequestHandler } from './$types';
import { getTodosCollection } from '$lib/db';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const status = url.searchParams.get('status') || 'all';

  const filter: Record<string, unknown> = {};
  if (status === 'done') {
    filter.done = true;
  } else if (status === 'not_done') {
    filter.done = false;
  }

  const col = await getTodosCollection();
  const todos = await col.find(filter).toArray();
  const out = todos.map(({ _id, task, done }) => ({
    _id: _id.toString(),
    task,
    done
  }));
  return json(out);
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
