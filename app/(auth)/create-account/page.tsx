'use client';

import { createAccount } from './actions';
import { useActionState, useState } from 'react';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Input from '@/components/input';
import Button from '@/components/button';
import Link from 'next/link';
import Image from 'next/image';

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

  // login버튼을 클릭해도 input의 값을 유지하기 위해 useState를 사용함.
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  return (
    // <div className='flex flex-col gap-10 py-8 px-6'>
    <div className='flex flex-col justify-center bg-black w-full min-h-screen py-8 px-32'>
      <div className='flex flex-col items-center *:font-medium mb-10'>
        {/* ai로 생성한 이미지 */}
        <Image src='/pendant.png' alt='next.js logo' width={80} height={18} />
        <h1 className='text-4xl font-bold text-center'>
          &quot; <span className='text-pink-500 uppercase'>join-membership</span> &quot;
        </h1>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='username'
          type='text'
          placeholder='Username'
          required
          errors={state?.fieldErrors.username}
          value={username}
          onChange={e => setUsername(e.target.value)}
          maxLength={10}
        />
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          errors={state?.fieldErrors.email}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name='confirm_password'
          type='password'
          placeholder='Confirm Password'
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text='Create account' />
      </form>
      <div className='flex gap-2 justify-between mt-5'>
        <div>
          <Link href='/' className='hover:underline'>
            홈으로 가기
          </Link>
        </div>
        <div>
          <span>이미 계정이 있나요?</span>
          <Link href='/login' className='hover:underline'>
            로그인하러 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
