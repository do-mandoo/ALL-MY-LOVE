'use client';

import { createAccount } from './actions';
import { useActionState, useState } from 'react';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import Input from '@/components/input';
import Button from '@/components/button';

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

  // login버튼을 클릭해도 input의 값을 유지하기 위해 useState를 사용함.
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h2 className='text-xl'>Fill in the form below to join!</h2>
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
    </div>
  );
}
