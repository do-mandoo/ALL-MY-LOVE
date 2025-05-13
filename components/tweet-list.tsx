'use client';

import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
}

export default function TweetList({ tweets }: TweetListProps) {
  return (
    <div className='flex flex-col gap-2 justify-center mb-4  mt-5'>
      <ul className='flex flex-wrap justify-center w-full gap-6'>
        {tweets.map(t => (
          <li key={t.id} className='flex bg-neutral-100 p-3 rounded shadow w-[300px] '>
            <Link href={`/tweet/${t.id}`} className='w-full flex flex-col justify-between'>
              <p className='font-bold'>
                {t.user.username}
                <span className='font-medium ml-0.5'>님의 트윗</span>
              </p>
              <p
                className='mt-1 overflow-hidden text-neutral-900'
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  // 3번째 줄에 말줄임표 설정.
                  WebkitLineClamp: 3,
                  textOverflow: 'ellipsis',
                }}
              >
                {t.tweet}
              </p>
              <p className='mt-1 text-xs text-gray-500'>
                {new Date(t.created_at).toLocaleString()}
              </p>

              {/* 좋아요·댓글 카운트 */}
              <div className='flex items-center gap-4 mt-1 text-sm text-gray-600'>
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
    </div>
  );
}
