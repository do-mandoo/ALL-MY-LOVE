import CommentInput from './comment-input';
import db from '@/lib/db';
import getSession from '@/lib/session';

export default async function CommentSection({ tweetId }: { tweetId: number }) {
  const session = await getSession();
  const sessionId = session?.id ?? null;

  // 원본 데이터 불러오기
  const rawComments = await db.response.findMany({
    where: { tweetId },
    include: {
      user: {
        select: { id: true, username: true },
      },
    },
    orderBy: { created_at: 'asc' },
  });

  // user가 null이 아닌 것만 골라내고, user! 어설션으로 타입 맞추기
  const comments = rawComments
    .filter(c => c.user !== null)
    .map(c => ({
      id: c.id,
      comment: c.comment,
      created_at: c.created_at,
      userId: c.userId,
      // 이 user!는 위에서 null 아님을 보장했으니 안전합니다.
      user: { id: c.user!.id, username: c.user!.username },
    }));

  return <CommentInput id={tweetId} sessionId={sessionId} comments={comments} />;
}
