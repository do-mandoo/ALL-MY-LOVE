import TweetList, { TweetWithUser } from '@/components/tweet-list';
import db from '@/lib/db';

interface Props {
  searchParams: { page?: string };
}

export default async function MainPage({ searchParams }: Props) {
  const { page: rawPage } = await searchParams;
  const page = parseInt(rawPage || '1', 10);
  const perPage = 8;
  const total = await db.tweet.count();

  const raw = await db.tweet.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: 'desc' },
    include: {
      user: true,
      _count: {
        select: {
          like: true, // 좋아요 수
          responses: true, // 댓글 수 (Prisma 모델명이 Response라면)
        },
      },
    },
  });

  const tweets: TweetWithUser[] = raw.map(t => ({
    id: t.id,
    tweet: t.tweet,
    created_at: t.created_at.toISOString(),
    user: { username: t.user.username },
    likeCount: t._count.like, // Prisma가 돌려준 좋아요 수
    commentCount: t._count.responses, // Prisma가 돌려준 댓글 수
  }));

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className='px-12 py-6 w-full h-screen bg-black'>
      <TweetList tweets={tweets} page={page} totalPages={totalPages} />
    </div>
  );
}
