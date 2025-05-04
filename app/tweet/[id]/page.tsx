import CommentSection from '@/components/comment-section';
import LikeButton from '@/components/like-button';
import db from '@/lib/db';
import getSession from '@/lib/session';
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
  // 파라미터 검증
  const { id } = await params;
  const tweetId = Number(id);
  if (isNaN(tweetId)) {
    return notFound();
  }
  // 트윗, 유저 정보 가져오기
  const tweet = await getTweet(tweetId);
  if (!tweet) {
    return notFound();
  }
  // 세션 가져와서 좋아요 상태, 개수 조회
  const session = await getSession();
  const userId = session?.id;

  const isLiked = userId
    ? Boolean(
        await db.like.findUnique({
          where: { userId_tweetId: { userId, tweetId } },
        })
      )
    : false;

  const likeCount = await db.like.count({
    where: { tweetId },
  });

  return (
    <div className='px-4 py-6 space-y-4'>
      <h2 className='text-xl font-bold'>{tweet.user.username} 님의 트윗</h2>
      <p>{tweet.tweet}</p>
      <p className='text-sm text-gray-500'>{new Date(tweet.created_at).toLocaleString()}</p>
      {/* <p>❤️ 좋아요: {tweet.like.length}</p> */}
      {/* <CommentSection tweetId={tweet.id} /> */}
      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
      <CommentSection tweetId={tweetId} />
    </div>
  );
}
