import db from '@/lib/db';
import { notFound } from 'next/navigation';

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id: Number(id) },
    include: { user: true, like: true },
  });
  // console.log(tweet, 'tweet');

  return tweet;
}

export default async function TweetDetail({ params }: { params: { id: string } }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  return (
    <div className='px-4 py-6 space-y-4'>
      <h2 className='text-xl font-bold'>{tweet.user.username} 님의 트윗</h2>
      <p>{tweet.tweet}</p>
      <p className='text-sm text-gray-500'>{new Date(tweet.created_at).toLocaleString()}</p>
      <p>❤️ 좋아요: {tweet.like.length}</p>
    </div>
  );
}
