'use client';

import { addTweet } from './actions';
import Button from '@/components/button';
import Input from '@/components/input';
import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';
import { Do_Hyeon } from 'next/font/google';

const dohyon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, null);

  return (
    <div className='max-w-md mx-auto p-4 bg-black'>
      <h2 className='flex justify-start items-end gap-2  text-xl font-bold mb-3'>
        <Image src='/clover_pendant.jpg' alt='next.js logo' width={30} height={30} />
        <div className={`${dohyon.className} flex items-end font-bold text-blue-500 text-4xl`}>
          새 트윗 작성
        </div>
        <Image src='/clover_pendant.jpg' alt='next.js logo' width={30} height={30} />
      </h2>
      <form action={action} className='space-y-2'>
        <Input
          name='tweet'
          required
          type='text'
          placeholder='새로운 트윗을 작성하세요.'
          className='w-full p-2 border rounded min-h-28'
          errors={state?.fieldErrors.tweet}
        />
        <p className='text-neutral-500 mb-4'>⁕Enter를 누르면 글이 등록됩니다.</p>
        <Button text='등록하기' />
      </form>
      <Link href='/main' className='flex justify-end hover:underline mt-2'>
        작성 취소
      </Link>
    </div>
  );
}
