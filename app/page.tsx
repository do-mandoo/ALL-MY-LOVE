import TweetList, { TweetWithUser } from '@/components/tweet-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Props {
  searchParams: { page?: string };
}

export default async function MainPage({ searchParams }: Props) {
  const { page: rawPage } = await searchParams;
  const page = parseInt(rawPage || '1', 10);
  const perPage = 1; // 테스트 시 1, 실제는 10
  const total = await db.tweet.count();

  const raw = await db.tweet.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: 'desc' },
    include: { user: true },
  });

  const tweets: TweetWithUser[] = raw.map(t => ({
    id: t.id,
    tweet: t.tweet,
    created_at: t.created_at.toISOString(),
    user: { username: t.user.username },
  }));

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className='px-4 py-6'>
      <TweetList tweets={tweets} page={page} totalPages={totalPages} />
      <Link
        href='/tweet/add'
        className='bg-red-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-red-400'
      >
        <PlusIcon className='size-10' />
      </Link>
    </div>
  );
}
