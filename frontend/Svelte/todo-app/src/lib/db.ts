// src/lib/mongo.ts
import { MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_DB } from '$env/static/private';

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI');
if (!MONGODB_DB)  throw new Error('Missing MONGODB_DB');

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!globalThis._mongoClientPromise) {
  // ← just pass the URI
  globalThis._mongoClientPromise = new MongoClient(MONGODB_URI).connect();
}

clientPromise = globalThis._mongoClientPromise!;

export async function getTodosCollection() {
  const client = await clientPromise;
  return client.db(MONGODB_DB).collection('tasks');
}
