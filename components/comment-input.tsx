'use client';

import { useActionState, useOptimistic } from 'react';
import { addResponse } from '@/app/tweet/[id]/actions';

import CommentButton from './comment-button';
import Comments from './comment';

interface CommentRecord {
  id: number;
  comment: string;
  created_at: Date;
  userId: number | null;
  user: { id: number; username: string };
}

export default function CommentInput({
  id,
  sessionId,
  comments,
}: {
  id: number;
  sessionId: number | null;
  comments: CommentRecord[];
}) {
  const [optimisticState, pushComment] = useOptimistic(comments, (prev, newOne: CommentRecord) => [
    ...prev,
    newOne,
  ]);

  const interceptAction = async (formData: FormData) => {
    const text = formData.get('comment')?.toString() ?? '';

    const newComment: CommentRecord = {
      id: Date.now(),
      comment: text,
      created_at: new Date(),
      userId: sessionId,
      user: {
        id: sessionId ?? 0,
        username: '...', // 서버 응답 시 실제 username 으로 대체됨
      },
    };

    pushComment(newComment);
    formData.append('id', id.toString());
    return addResponse(formData);
  };

  const [, action] = useActionState(interceptAction, null);

  return (
    <div>
      <ul className='space-y-2 mb-4'>
        {optimisticState.map(c => (
          <Comments
            key={c.id}
            id={c.id}
            payload={c.comment}
            createdAt={new Date(c.created_at).toLocaleString()}
            user={c.user}
          />
        ))}
      </ul>

      <form action={action} className='grid grid-cols-5 gap-2 w-full mt-4 '>
        <input type='hidden' name='id' value={id} />
        <textarea
          name='comment'
          className='col-span-4 border rounded p-2 text-black bg-white'
          placeholder='댓글을 입력해 주세요.'
          required
          minLength={1}
          maxLength={280}
        />
        <CommentButton />
      </form>
    </div>
  );
}
