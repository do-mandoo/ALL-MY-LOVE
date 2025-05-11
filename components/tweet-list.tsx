'use client';

import Link from 'next/link';

export type TweetWithUser = {
  id: number;
  tweet: string;
  created_at: string;
  user: { username: string };
};

interface TweetListProps {
  tweets: TweetWithUser[];
  page: number;
  totalPages: number;
}

export default function TweetList({ tweets, page, totalPages }: TweetListProps) {
  return (
    <div className='flex flex-col gap-6'>
      <ul className='space-y-4'>
        {tweets.map(t => (
          <li key={t.id} className='bg-white p-4 rounded shadow'>
            <Link href={`/tweet/${t.id}`}>
              <p className='font-bold'>{t.user.username}</p>
              <p className='mt-2'>{t.tweet}</p>
              <p className='mt-1 text-xs text-gray-500'>
                {new Date(t.created_at).toLocaleString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className='flex justify-between items-center mt-4'>
        {page > 1 ? (
          <Link
            href={`/?page=${page - 1}`}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            ← 이전
          </Link>
        ) : (
          <span className='px-4 py-2 bg-gray-200 rounded disable cursor-not-allowed'>← 이전</span>
        )}

        <span className='text-sm'>
          {page} / {totalPages}
        </span>

        {page < totalPages ? (
          <Link
            href={`/?page=${page + 1}`}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            다음 →
          </Link>
        ) : (
          <span className='px-4 py-2 bg-gray-200 rounded disable cursor-not-allowed'>다음 →</span>
        )}
      </div>
    </div>
  );
}
