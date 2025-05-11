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

// 'use client';

// import { useOptimistic, useTransition } from 'react';
// import { addResponse } from '@/app/tweet/[id]/actions';

// interface Reply {
//   id: number;
//   content: string;
//   created_at: string;
//   user: { username: string };
// }

// interface CommentSectionProps {
//   tweetId: number;
// }

// export default function CommentSection({ tweetId }: CommentSectionProps) {
//   // 낙관적 업데이트용 stat
//   const [replies, pushReply] = useOptimistic((prev, newOne: Reply) => [...prev, newOne]);
//   const [isPending, startTransition] = useTransition();

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const fd = new FormData(form);
//     const content = fd.get('content') as string;

//     // 1) 임시 답글 객체: id는 타임스탬프로, 유저명은 빈 문자열 처리
//     const tempReply: Reply = {
//       id: Date.now(),
//       content,
//       created_at: new Date().toISOString(),
//       user: { username: '...' },
//     };

//     startTransition(() => {
//       // 2) UI 에 바로 반영
//       pushReply(tempReply);
//       // 3) 서버 액션 호출
//       addResponse(fd);
//       // 4) 폼 초기화
//       form.reset();
//     });
//   };

//   return (
//     <div className='mt-8'>
//       <h3 className='text-lg font-bold mb-2'>답글</h3>
//       <ul className='space-y-2 mb-4'>
//         {replies.map(r => (
//           <li key={r.id} className='p-2 border rounded'>
//             <p className='text-sm text-gray-600'>
//               {r.user.username} • {new Date(r.created_at).toLocaleString()}
//             </p>
//             <p>{r.content}</p>
//           </li>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit} className='space-y-2'>
//         <input type='hidden' name='tweetId' value={tweetId} />
//         <textarea
//           name='content'
//           rows={3}
//           className='w-full border rounded p-2'
//           placeholder='답글을 입력하세요'
//           required
//           minLength={1}
//           maxLength={280}
//         />
//         <button
//           type='submit'
//           disabled={isPending}
//           className='px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50'
//         >
//           {isPending ? '작성 중…' : '댓글 달기'}
//         </button>
//       </form>
//     </div>
//   );
// }
