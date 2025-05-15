'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { daleteTweet } from '@/app/tweet/[id]/actions';

interface ITweetActions {
  tweetId: number;
}

export default function TweetActions({ tweetId }: ITweetActions) {
  const router = useRouter();
  const [state, del] = useActionState(daleteTweet, null);

  // 삭제 성공 시 메인으로 이동
  useEffect(() => {
    if (state === undefined) {
      router.push('/main');
    }
  }, [state, router]);

  return (
    <div className='flex items-center space-x-4 '>
      <Link
        href={`/tweet/${tweetId}/edit`}
        className='px-3 py-1 border border-purple-400 rounded text-neutral-200 hover:bg-purple-400'
      >
        수정
      </Link>

      <form action={del} className='inline'>
        <input type='hidden' name='id' value={tweetId} />
        <button
          type='submit'
          className='cursor-pointer px-3 py-1 border border-red-400 text-neutral-200  rounded hover:bg-red-400'
        >
          삭제
        </button>
      </form>
    </div>
  );
}
