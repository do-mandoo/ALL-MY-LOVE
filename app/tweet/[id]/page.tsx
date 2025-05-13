import CommentSection from '@/components/comment-section';
import LikeButton from '@/components/like-button';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Do_Hyeon } from 'next/font/google';
import Image from 'next/image';

const dohyon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

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
    <div className='px-4 py-6 space-y-4 bg-black'>
      <div className='flex justify-between items-center'>
        <h2 className='flex justify-start items-end gap-2  text-xl font-bold mb-3'>
          <Image src='/heart_pendant.jpg' alt='next.js logo' width={30} height={30} />
          <Link
            href={`/users/${encodeURIComponent(tweet.user.username)}`}
            className='text-blue-500 hover:underline'
          >
            <div className={`${dohyon.className} flex items-end font-bold text-blue-500 text-4xl`}>
              {tweet.user.username} <p className='text-neutral-300 ml-2'>님의 트윗</p>
            </div>
          </Link>
          <Image src='/heart_pendant.jpg' alt='next.js logo' width={30} height={30} />
        </h2>
      </div>
      <p className='text-lg'>{tweet.tweet}</p>
      <p className='text-sm text-gray-500'>{new Date(tweet.created_at).toLocaleString()}</p>
      <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
      <CommentSection tweetId={tweetId} />
      <div className='text-end hover:underline'>
        <Link href='/main' className='text-purple-300'>
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
