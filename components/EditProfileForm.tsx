'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { updateProfile } from '@/app/(tabs)/users/[username]/edit/actions';
import { useRouter } from 'next/navigation';
import Button from './button';
import Input from './input';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface IEditProfileForm {
  initialUser: {
    username: string;
    email: string;
    bio: string | null;
  };
}

export default function EditProfileForm({ initialUser }: IEditProfileForm) {
  const router = useRouter();

  // 초기 상태는 null, 오류 객체 {formErrors, fieldErrors} 타입
  const [state, dispatch] = useActionState(updateProfile, null);

  const [username, setUsername] = useState(initialUser.username);
  const [email, setEmail] = useState(initialUser.email);
  const [bio, setBio] = useState(initialUser.bio ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 성공 시 페이지 새로 고침
  useEffect(() => {
    if (state === undefined) router.back();
  }, [state, router]);

  return (
    <div className='flex flex-col px-5 bg-black w-full  h-screen'>
      <div
        className='cursor-pointer'
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon className='size-8' />
      </div>
      <form action={dispatch} className='space-y-6 max-w-md mx-auto p-4'>
        {/* Username */}
        <label className='flex flex-col gap-1'>
          <span>Username</span>
          <Input
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            errors={state?.fieldErrors.username}
          />
        </label>

        {/* Email */}
        <label className='flex flex-col gap-1'>
          <span>Email</span>
          <Input
            type='email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            errors={state?.fieldErrors.email}
          />
        </label>

        {/* Bio */}
        <label className='flex flex-col gap-1'>
          <span>Bio</span>
          <textarea
            name='bio'
            value={bio}
            onChange={e => setBio(e.target.value)}
            className={`bg-transparent rounded w-full p-2 border ${
              state?.fieldErrors.bio?.length ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {state?.fieldErrors.bio?.map((err, i) => (
            <span key={i} className='text-red-400 text-xs'>
              {err}
            </span>
          ))}
        </label>

        {/* Current Password */}
        <label className='flex flex-col gap-1'>
          <span>Current Password</span>
          <Input
            type='password'
            name='currentPassword'
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            errors={state?.fieldErrors.currentPassword}
          />
        </label>

        {/* New Password */}
        <label className='flex flex-col gap-1'>
          <span>New Password</span>
          <Input
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            errors={state?.fieldErrors.newPassword}
          />
        </label>

        {/* Submit Button */}
        <Button text='Save' />

        {/* Form-level errors */}
        {state?.formErrors?.length > 0 && (
          <div className='text-red-500 space-y-2'>
            {state?.formErrors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
