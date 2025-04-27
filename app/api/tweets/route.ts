import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const tweets = await db.tweet.findMany({ include: { user: true, like: true } });
  return NextResponse.json(tweets);
}
