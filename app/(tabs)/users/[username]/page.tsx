import TweetList, { TweetWithUser } from '@/components/tweet-list';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { logOut } from '@/lib/log-out';
import { Do_Hyeon } from 'next/font/google';
import TweetFeed from '@/components/tweet-feed';

const dohyon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

interface IUserProfile {
  params: { username: string };
  searchParams: { page?: string };
}

export default async function UserProfilePage({ params, searchParams }: IUserProfile) {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername);
  const page = parseInt(searchParams.page || '1', 10);

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

  return (
    <div className='relative w-full px-12 py-4 flex flex-col justify-start bg-black min-h-screen pb-[98px]'>
      {/* 프로필 헤더 */}
      <div className='mb-6 '>
        <h2 className='flex justify-start items-end gap-2  text-xl font-bold mb-3'>
          <Image src='/heart_pendant.jpg' alt='next.js logo' width={30} height={30} />
          <div className={`${dohyon.className} flex items-end font-bold text-blue-500 text-4xl`}>
            {userWithTweets.username}
            <p className='text-neutral-200 ml-0.5'>님의 정보</p>
          </div>
          <Image src='/heart_pendant.jpg' alt='next.js logo' width={30} height={30} />
        </h2>

        {/* 사용자 정보 */}
        <div className='mt-5 w-full flex justify-center items-center'>
          <Image
            src='/pengsoo-hair.jpg'
            alt='next.js logo'
            width={200}
            height={200}
            className='rounded-4xl mb-4'
          />
          <div className='text-start ml-10 flex flex-col gap-4 justify-end'>
            <p>
              <strong className='uppercase'>ID:</strong> {userWithTweets.id}
            </p>
            <p>
              <strong className='uppercase'>Email:</strong> {userWithTweets.email}
            </p>
            <p>
              <strong className='uppercase'>Bio:</strong> {userWithTweets.bio || 'No bio provided.'}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className='flex justify-center text-sm items-center mt-4'>
            <Link
              href={`/users/${username}/edit`}
              className='inline-block p-2 bg-green-500 text-white rounded-md'
            >
              프로필 편집
            </Link>
            <form action={logOut}>
              <button className='p-2 primary-btn bg-orange-400 cursor-pointer ml-2'>
                로그아웃
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 트윗 목록 */}
      <hr className='border-neutral-900 mb-4' />
      <div className=''>
        <div className='font-bold'>{userWithTweets.username}님이 작성한 트윗들</div>
        <TweetFeed page={page} perPage={4} where={{ userId: userWithTweets.id }} />
      </div>
    </div>
  );
}
