import React from 'react';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import EditTweetForm from '@/components/EditTweetForm';

interface Props {
  params: { id: string };
}

export default async function EditTweetPage({ params }: Props) {
  const { id } = params;
  const tweetId = Number(id);

  if (isNaN(tweetId)) return notFound();

  const tweet = await db.tweet.findUnique({ where: { id: tweetId } });
  if (!tweet) return notFound();

  return (
    // 클라이언트 컴포넌트에 데이터만 전달
    <EditTweetForm tweetId={tweetId} initialContent={tweet.tweet} />
  );
}
