'use client';

import { addTweet } from './actions';
import Button from '@/components/button';
import Input from '@/components/input';
import { useActionState } from 'react';

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, null);

  return (
    <div className='max-w-md mx-auto p-4'>
      <h2 className='text-xl font-bold mb-3'>새 트윗 작성</h2>
      <form action={action} className='space-y-2'>
        <Input
          name='tweet'
          required
          type='text'
          placeholder='무슨 생각을 하고 있나요?'
          className='w-full p-2 border rounded'
          errors={state?.fieldErrors.tweet}
        />

        <Button text='등록하기' />
      </form>
    </div>
  );
}
