'use server';

import {
  EMAIL_DOMAIN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH,
} from '@/lib/constants';

import { z } from 'zod';

// endsWith를 사용하여 문자열의 끝이 @zod.com인지 확인
const checkEmail = (email: string) => email.endsWith(EMAIL_DOMAIN);

const formSchema = z.object({
  email: z
    .string({ message: '유효한 이메일을 입력하세요.' })
    .email()
    .toLowerCase()
    .refine(checkEmail, `오직 "${EMAIL_DOMAIN}" 이메일만 허용됩니다.`),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, {
      message: `사용자 이름은 ${USERNAME_MIN_LENGTH}자 이상이어야 합니다.`,
    })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, {
      message: `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    })
    .regex(PASSWORD_REGEX, {
      message: '비밀번호는 반드시 한 개 이상의 숫자를 포함해야 합니다(0123456789).',
    }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };

  await new Promise(res => setTimeout(res, 1000)); // 1초 대기

  const result = formSchema.safeParse(data);
  if (!result.success) {
    // Zod 에러를 field별로 분리해서 반환
    const { fieldErrors, formErrors } = result.error.flatten();
    return {
      success: false,
      fieldErrors,
      formErrors,
      message: '',
    };
  } else {
    console.log(result.data);
    return {
      success: true,
      fieldErrors: {}, // 또는 undefined
      formErrors: [],
      message: '로그인에 성공했습니다!',
    };
  }
}
