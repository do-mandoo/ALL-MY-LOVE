'use client';

import Image from 'next/image';
import Input from '@/components/input';
import Button from '@/components/button';
import { useActionState, useState } from 'react';
import { logIn } from './actions';

export default function Home() {
  const [state, dispatch] = useActionState(logIn, null);

  // login버튼을 클릭해도 input의 값을 유지하기 위해 useState를 사용함.
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex flex-col justify-center min-h-screen py-8 px-32'>
      <div className='flex flex-col items-center *:font-medium mb-10'>
        {/* ai로 생성한 이미지 */}
        <Image src='/pendant.png' alt='next.js logo' width={80} height={18} />
        <h1 className='text-4xl font-bold text-center'>
          &quot; <span className='text-pink-500'>LOG-IN</span> &quot;
        </h1>
        <span>Log in with email, username, password.</span>
      </div>
      <form action={dispatch} className='flex flex-col gap-5'>
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          icon={
            <svg
              data-slot='icon'
              fill='none'
              strokeWidth='1.5'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
              ></path>
            </svg>
          }
          value={email}
          onChange={e => setEmail(e.target.value)}
          errors={state?.fieldErrors?.email}
        />
        <Input
          name='username'
          type='text'
          placeholder='Username'
          required
          icon={
            <svg
              data-slot='icon'
              fill='none'
              strokeWidth='1.5'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              ></path>
            </svg>
          }
          value={username}
          onChange={e => setUsername(e.target.value)}
          errors={state?.fieldErrors?.username ?? []}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          required
          icon={
            <svg
              data-slot='icon'
              fill='none'
              strokeWidth='1.5'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z'
              ></path>
            </svg>
          }
          value={password}
          onChange={e => setPassword(e.target.value)}
          errors={state?.fieldErrors?.password ?? []}
        />
        <Button text='Log in' />
      </form>
    </div>
  );
}
