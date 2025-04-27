import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const tweets = await db.user.findMany({ include: { tweets: true, likes: true } });
  return NextResponse.json(tweets);
}
