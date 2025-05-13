import TweetList, { TweetWithUser } from '@/components/tweet-list';
import TweetListPagination from '@/components/tweet-list-pagination';
import db from '@/lib/db';

interface TweetFeedProps {
  page: number;
  perPage: number;
  where?: Record<string, any>;
}

export default async function TweetFeed({ page, perPage, where = {} }: TweetFeedProps) {
  const total = await db.tweet.count({ where }); // 전체 개수 조회

  const raw = await db.tweet.findMany({
    where,
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: 'desc' },
    include: {
      user: true,
      _count: {
        select: {
          like: true,
          responses: true,
        },
      },
    },
  });

  // 타입 변환
  const tweets: TweetWithUser[] = raw.map(t => ({
    id: t.id,
    tweet: t.tweet,
    created_at: t.created_at.toISOString(),
    user: { username: t.user.username },
    likeCount: t._count.like, // Prisma가 돌려준 좋아요 수
    commentCount: t._count.responses, // Prisma가 돌려준 댓글 수
  }));

  // 총 페이지 계산
  const totalPages = Math.ceil(total / perPage);

  // 렌더링
  return (
    <>
      <TweetList tweets={tweets} />
      <TweetListPagination page={page} totalPages={totalPages} />
    </>
  );
}
