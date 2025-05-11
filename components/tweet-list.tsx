'use client';

import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Do_Hyeon } from 'next/font/google';

const dohyon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

export type TweetWithUser = {
  id: number;
  tweet: string;
  created_at: string;
  user: { username: string };
  likeCount: string;
  commentCount: string;
};

interface TweetListProps {
  tweets: TweetWithUser[];
  page: number;
  totalPages: number;
}

export default function TweetList({ tweets, page, totalPages }: TweetListProps) {
  return (
    <div className='flex flex-col gap-3 justify-center mb-[90px]'>
      <h2 className='flex justify-start items-end  text-blue-500 text-4xl font-bold m-0 p-0 gap-2'>
        <Image src='/star_pendant.jpg' alt='next.js logo' width={40} height={40} />
        <div className={dohyon.className}>트윗 목록</div>
      </h2>
      <ul className='flex flex-wrap justify-center w-full gap-6 mt-6'>
        {tweets.map(t => (
          <li key={t.id} className='flex bg-neutral-100 p-4 rounded shadow w-[300px]'>
            <Link href={`/tweet/${t.id}`}>
              <p className='font-bold'>{t.user.username} 님의 트윗</p>
              <p className='mt-1 text-neutral-900'>{t.tweet}</p>
              <p className='mt-1 text-xs text-gray-500'>
                {new Date(t.created_at).toLocaleString()}
              </p>

              {/* 좋아요·댓글 카운트 */}
              <div className='flex items-center gap-4 mt-2 text-sm text-gray-600'>
                <div className='flex items-center gap-1'>
                  <HeartIcon className='w-5 h-5' />
                  <span>{t.likeCount}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <ChatBubbleLeftIcon className='w-5 h-5' />
                  <span>{t.commentCount}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex justify-between items-center mt-3'>
        {page > 1 ? (
          <Link
            href={`/main?page=${page - 1}`}
            className='px-4 py-2 bg-gray-200 rounded text-rose-500 hover:bg-gray-300'
          >
            ← 이전
          </Link>
        ) : (
          <span className='px-4 py-2 bg-gray-200 rounded text-rose-500 disable cursor-not-allowed'>
            ← 이전
          </span>
        )}

        <span className='text-sm'>
          {page} / {totalPages}
        </span>

        {page < totalPages ? (
          <Link
            href={`/main?page=${page + 1}`}
            className='px-4 py-2 bg-gray-200 rounded text-rose-500 hover:bg-gray-300'
          >
            다음 →
          </Link>
        ) : (
          <span className='px-4 py-2 bg-gray-200 rounded text-rose-500 disable cursor-not-allowed'>
            다음 →
          </span>
        )}
      </div>
    </div>
  );
}
