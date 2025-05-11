'use server';

import { z } from 'zod';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const tweetSchema = z.object({
  tweet: z.string().min(1, '트윗을 입력해주세요').max(280, '280자 이내로 입력해주세요'),
});

export async function addTweet(_prevState: unknown, formData: FormData) {
  const data = {
    tweet: formData.get('tweet'),
  };

  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });

      redirect(`/tweet/${tweet.id}`);
    }
  }
}
