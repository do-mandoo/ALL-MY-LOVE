'use server';

import { z } from 'zod';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidatePath, revalidateTag } from 'next/cache';

const ResponseSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Invalid tweet ID').transform(Number),
  comment: z.string().min(1, '비어있으면 안됩니다.'),
});

//===================수정
export async function updateTweet(_prevState: unknown, formData: FormData) {
  // 유효성 검사
  const id = formData.get('id');
  const content = formData.get('content');

  if (typeof id !== 'string' || typeof content !== 'string') return;

  await db.tweet.update({
    where: { id: Number(id) },
    data: { tweet: content },
  });

  // 캐시 무효화
  revalidatePath('/');
  revalidatePath(`/tweet/${id}`);
}

//======삭제
export async function daleteTweet(_prevState: unknown, formData: FormData) {
  const id = formData.get('id');
  if (typeof id !== 'string') return;

  await db.tweet.delete({
    where: { id: Number(id) },
  });
  revalidatePath('/');
  revalidatePath('/main');
}

//=======댓글 추가
export async function addResponse(_prevState: unknown, formData: FormData) {
  // 유효성 검사
  const data = {
    id: formData.get('id'),
    comment: formData.get('comment'),
  };

  // db저장
  const result = ResponseSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { id: tweetId } = result.data;

  // 로그인 유저 가져오기
  const session = await getSession();
  if (!session?.id) {
    throw new Error('로그인이 필요합니다.');
  }

  await db.response.create({
    data: {
      comment: result.data.comment,
      user: {
        connect: {
          id: session.id,
        },
      },
      tweet: {
        connect: { id: tweetId },
      },
    },
  });
  revalidateTag(`tweet-${tweetId}`);
  // revalidatePath(`/tweets/${tweetId}`);
}

//===========================================================================
// like, disLike
export async function likePost(tweetId: number) {
  // await new Promise(r => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`tweet-${tweetId}`);
  } catch {}
}

export async function dislikePost(tweetId: number) {
  // await new Promise(r => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        userId_tweetId: { tweetId, userId: session.id! },
      },
    });
    revalidateTag(`tweet-${tweetId}`);
  } catch {}
}
