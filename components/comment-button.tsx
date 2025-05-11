'use client';

import { useFormStatus } from 'react-dom';

export default function CommentButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='bg-orange-400 rounded px-4 text-white disabled:opacity-50'
    >
      {pending ? <span className='loading loading-bars loading-sm' /> : '등록'}
    </button>
  );
}
