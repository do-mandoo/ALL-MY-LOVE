'use server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import {
  EMAIL_DOMAIN,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH,
} from '@/lib/constants';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

// 이메일 도메인 검사
const checkEmail = (email: string) => email.endsWith(EMAIL_DOMAIN);

// username 금지 단어 검사
const checkUsername = (username: string) => !username.includes('potato');

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'Where is my username???',
      })
      .min(USERNAME_MIN_LENGTH, {
        message: `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
      })
      .trim()
      .toLowerCase()
      .refine(checkUsername, 'No potatoes allowed!'),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkEmail, `Only emails ending with "${EMAIL_DOMAIN}" are allowed.`),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, { message: 'Password must include at least one number.' }),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    // props를 async (data,ctx)로 하고 where에 username:data.username 을 하는것과 같다.
    // username 중복 체크
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This username is already taken',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    // email 중복 체크
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: 'This email is already taken',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, { message: 'Two passwords should be same', path: ['confirm_password'] });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten(), '에러 체크');

    return result.error.flatten();
  } else {
    // === DONE ===
    // 1. check if username is taken -> Zod에서 validation함. checkUniqueUsername -> superRefine으로 대체
    // 2. check if the email is already used -> Zod에서 validation함. checkUniqueEmail -> superRefine으로 대체

    // 3. hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12); // 해싱 알고리즘 12번 실행 === 해시의 보안 강화

    // save the user to db(use prisma)
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user, 'user');

    // 4. log the user in
    const session = await getSession();
    session.id = user.id;
    await session.save();

    // 5. redirect '/'
    redirect('/');
  }
}
