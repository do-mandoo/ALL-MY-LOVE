import TweetList, { TweetWithUser } from '@/components/tweet-list';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

// 로그아웃 서버 액션
const logOut = async () => {
  'use server';
  const session = await getSession();
  session.destroy();
  redirect('/login');
};

interface IUserProfile {
  params: { username: string };
}

export default async function UserProfilePage({ params }: IUserProfile) {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername);

  // 현재 로그인 된 사용자의 세션(userId) 가져오기
  const session = await getSession();
  if (!session.id) return redirect('/login');

  // 프로필 대상 유저 조회(username 파라미터 기반)
  const userWithTweets = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      tweets: {
        orderBy: { created_at: 'desc' },
        include: { user: { select: { username: true } } }, // TweetList가 요구하는 형태로.
      },
    },
  });

  if (!userWithTweets) {
    // 해당 username의 유저가 없다면 404 띄워준다.
    notFound();
  }

  // '내 프로필'인지 판별
  const isOwner = session.id === userWithTweets.id;

  // 트윗 데이터 변환 (prisma date -> string변환, 불필요 필드 제거)
  const tweets: TweetWithUser[] = userWithTweets.tweets.map(t => ({
    id: t.id,
    tweet: t.tweet,
    created_at: t.created_at.toISOString(),
    user: { username: t.user.username },
  }));

  return (
    <div className='w-full px-10 py-4 bg-black min-h-screen pb-[98px]'>
      {/* 프로필 헤더 */}
      <div className='mb-6 '>
        <h1 className='text-2xl font-bold'>{userWithTweets.username}님의 정보</h1>

        {isOwner && (
          <div className='flex justify-end items-center'>
            <Link
              href={`/users/${username}/edit`}
              className='inline-block px-4 py-2 bg-green-500 text-white rounded-md'
            >
              프로필 편집
            </Link>
            <form action={logOut}>
              <button className='px-4 py-2 primary-btn cursor-pointer ml-2'>로그아웃</button>
            </form>
          </div>
        )}

        {/* <div className='w-36 h-36 bg-amber-300 rounded-full mb-4'> */}
        <Image
          src='/pengsoo-hair.jpg'
          alt='next.js logo'
          width={200}
          height={200}
          className='rounded-4xl'
        />
        {/* </div> */}
        <div className='mt-5 w-full flex flex-col'>
          <p>
            <strong>ID:</strong> {userWithTweets.id}
          </p>
          <p>
            <strong>Email:</strong> {userWithTweets.email}
          </p>
          <p>
            <strong>Bio:</strong> {userWithTweets.bio || 'No bio provided.'}
          </p>
        </div>
      </div>

      {/* 트윗 목록 */}
      <div className=''>
        <div>{userWithTweets.username}님이 작성한 트윗들</div>
        <TweetList tweets={tweets} page={1} totalPages={1} />
      </div>
    </div>
  );
}
