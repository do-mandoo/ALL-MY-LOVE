'use client';

import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';

import { useOptimistic, useTransition } from 'react';
import { dislikePost, likePost } from '@/app/tweet/[id]/actions';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({ isLiked, likeCount, tweetId }: LikeButtonProps) {
  const [state, toggle] = useOptimistic({ isLiked, likeCount }, prev => ({
    isLiked: !prev.isLiked,
    likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
  }));

  // transition 훅
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    const wasLiked = state.isLiked;
    startTransition(() => {
      toggle('toggle');
    });
    if (wasLiked) {
      dislikePost(tweetId);
    } else {
      likePost(tweetId);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={`mb-10 flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2  transition-colors ${
        state.isLiked ? 'bg-pink-500 text-white border-pink-500' : 'hover:bg-neutral-800'
      }`}
    >
      {state.isLiked ? <HeartIcon className='size-5' /> : <OutlineHeartIcon className='size-5' />}
      {state.isLiked ? (
        <span> {state.likeCount}</span>
      ) : (
        <span>좋아요 &nbsp;({state.likeCount})</span>
      )}
    </button>
  );
}
