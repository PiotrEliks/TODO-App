import type { RequestHandler } from './$types';
import { getTodosCollection } from '$lib/db';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const PUT: RequestHandler = async ({ params, request }) => {
  const { id } = params;
  const { done, task } = await request.json();
  if (typeof done !== 'boolean') {
    return json({ error: 'Invalid done flag' }, { status: 400 });
  }
  const col = await getTodosCollection();
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { done, task } }
  );
  if (result.matchedCount === 0) {
    return json({ error: 'Not found' }, { status: 404 });
  }
  return json({ success: true });
};

export const DELETE: RequestHandler = async ({ params }) => {
  const { id } = params;
  const col = await getTodosCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    return json({ error: 'Not found' }, { status: 404 });
  }
  return json({ success: true });
};
