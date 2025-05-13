'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@/lib/constants';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const checkUserExists = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return Boolean(user);
};

// // endsWith를 사용하여 문자열의 끝이 @zod.com인지 확인
// const checkEmail = (email: string) => email.endsWith(EMAIL_DOMAIN);

const formSchema = z
  .object({
    email: z.string({ message: '유효한 이메일을 입력하세요.' }).email().toLowerCase(),
    username: z
      .string()
      .min(USERNAME_MIN_LENGTH, {
        message: `Username은 최소 ${USERNAME_MIN_LENGTH}자, 최대 ${USERNAME_MAX_LENGTH}자까지 입력이 가능합니다.`,
      })
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상, ${PASSWORD_MAX_LENGTH}자 이하로 입력하셔야 합니다.`,
      })
      .regex(PASSWORD_REGEX, {
        message: '비밀번호는 반드시 한 개 이상의 숫자를 포함해야 합니다(0123456789).',
      }),
  })
  .superRefine(async (data, ctx) => {
    // 이메일 존재 여부 검사
    const emailExists = await checkEmailExists(data.email);

    if (!emailExists) {
      ctx.addIssue({
        code: 'custom',
        message: '이 이메일을 사용하는 계정이 존재하지 않습니다.',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }

    // 유저네임 존재 여부 검사
    const userExists = await checkUserExists(data.username);

    if (!userExists) {
      ctx.addIssue({
        code: 'custom',
        message: '이 사용자명을 사용하는 계정이 존재하지 않습니다.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function logIn(_prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get('email')?.toString() ?? '',
    username: formData.get('username')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  };

  await new Promise(res => setTimeout(res, 500)); // 0.5초 대기

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? 'xxxx');

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/');
    } else {
      return {
        fieldErrors: {
          password: ['잘못된 비밀번호입니다.'],
          email: [],
        },
      };
    }
  }
}
