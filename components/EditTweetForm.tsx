'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { updateTweet } from '@/app/tweet/[id]/actions';

interface EditTweetFormProps {
  tweetId: number;
  initialContent: string;
}

export default function EditTweetForm({ tweetId, initialContent }: EditTweetFormProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [state, dispatch] = useActionState(updateTweet, null);

  // 저장 후 상세 페이지로 돌아가기
  useEffect(() => {
    if (state === undefined) {
      router.push(`/tweet/${tweetId}`);
    }
  }, [state, router, tweetId]);

  return (
    <div className='max-w-md mx-auto p-4'>
      <h1 className='text-xl font-bold mb-4'>트윗 수정</h1>
      <form action={dispatch} className='space-y-4'>
        <input type='hidden' name='id' value={tweetId} />
        <textarea
          name='content'
          value={content}
          onChange={e => setContent(e.target.value)}
          className='w-full p-2 border rounded'
        />
        <div className='flex space-x-2'>
          <button type='submit' className='cursor-pointer px-4 py-2 bg-blue-600 text-white rounded'>
            저장
          </button>
          <button
            type='button'
            className='cursor-pointer px-4 py-2 border rounded'
            onClick={() => router.push('/main')}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
