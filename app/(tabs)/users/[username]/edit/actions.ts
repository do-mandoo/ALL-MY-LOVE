'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import {
  EMAIL_DOMAIN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH,
} from '@/lib/constants';
import { redirect } from 'next/navigation';

// 이메일 도메인 검사
const checkEmail = (email: string) => email.endsWith(EMAIL_DOMAIN);

// username 금지 단어 검사
const checkUsername = (username: string) => !username.includes('potato');

const profileSchema = z
  .object({
    username: z
      .string()
      .min(USERNAME_MIN_LENGTH, {
        message: `사용자 이름은 ${USERNAME_MIN_LENGTH}자 이상이어야 합니다.`,
      })
      .trim()
      .toLowerCase()
      .refine(checkUsername, 'No potatoes allowed!'),
    email: z
      .string({ message: '유효한 이메일을 입력하세요.' })
      .email()
      .toLowerCase()
      .refine(checkEmail, `오직 "${EMAIL_DOMAIN}" 이메일만 허용됩니다.`),
    bio: z.string().max(160, 'bio정보는 160자까지 제한됩니다.').optional(),
    currentPassword: z.string().min(PASSWORD_MIN_LENGTH, {
      message: `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    }),
    newPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, {
        message: '비밀번호는 반드시 한 개 이상의 숫자를 포함해야 합니다(0123456789).',
      })
      .optional(),
  })
  .superRefine(async (data, ctx) => {
    // 인증 및 현재 비밀번호 확인
    const session = await getSession();
    if (!session.id) {
      ctx.addIssue({ code: 'custom', message: 'Not authenticated' });
      return;
    }
    const user = await db.user.findUnique({
      where: { id: session.id },
      select: { password: true },
    });
    if (!user) {
      ctx.addIssue({ code: 'custom', message: 'User not found' });
      return;
    }
    const valid = await bcrypt.compare(data.currentPassword, user.password);
    if (!valid) {
      ctx.addIssue({
        code: 'custom',
        message: '기존 비밀번호가 틀립니다.',
        path: ['currentPassword'],
      });
    }
  })
  .superRefine(async ({ username }, ctx) => {
    // username 중복 검사
    const session = await getSession();
    const current = await db.user.findUnique({
      where: { id: session.id },
      select: { username: true },
    });
    if (username !== current?.username) {
      const exists = await db.user.findUnique({ where: { username } });
      if (exists) {
        ctx.addIssue({ code: 'custom', message: 'Username already taken', path: ['username'] });
      }
    }
  })
  .superRefine(async ({ email }, ctx) => {
    // email 중복 검사
    const session = await getSession();
    const current = await db.user.findUnique({
      where: { id: session.id },
      select: { email: true },
    });
    if (email !== current?.email) {
      const exists = await db.user.findUnique({ where: { email } });
      if (exists) {
        ctx.addIssue({ code: 'custom', message: 'Email already taken', path: ['email'] });
      }
    }
  });

export async function updateProfile(prevState: any, formData: FormData) {
  if (!formData) return;

  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    bio: formData.get('bio'),
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  };

  const result = await profileSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { username, email, bio, newPassword } = result.data;

  // 업데이트 데이터 구성
  const updateData: any = { username, email, bio };
  if (newPassword) {
    updateData.password = await bcrypt.hash(newPassword, 12);
  }

  const session = await getSession();
  // db업데이트
  const updatedUser = await db.user.update({
    where: { id: session.id },
    data: updateData,
    select: { username: true, email: true, bio: true },
  });

  // 캐시 무효화
  revalidatePath(`/users/${updatedUser.username}`);

  // 성공 시 명시적 반환 없음
}
