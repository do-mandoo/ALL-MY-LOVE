import TweetList, { TweetWithUser } from '@/components/tweet-list';
import db from '@/lib/db';

interface ISearchPage {
  searchParams: {
    keyword?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: ISearchPage) {
  const { keyword: rawKeyword, page: rawPage } = await searchParams;
  const keyword = rawKeyword?.trim() || '';
  const page = parseInt(rawPage || '1', 10);
  const perPage = 5;

  // 검색어가 없으면 빈 배열
  const total = keyword ? await db.tweet.count({ where: { tweet: { contains: keyword } } }) : 0;

  const findTweets = keyword
    ? await db.tweet.findMany({
        where: {
          tweet: {
            contains: keyword,
          },
        },
        orderBy: {
          created_at: 'desc',
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
      })
    : [];

  const tweets: TweetWithUser[] = findTweets.map(t => ({
    id: t.id,
    tweet: t.tweet,
    created_at: t.created_at.toISOString(),
    user: {
      username: t.user.username,
    },
  }));
  return (
    <div className='max-w-xl mx-auto p-4'>
      <form method='GET' className='mb-6'>
        <input
          type='text'
          name='keyword'
          placeholder='트윗 검색'
          defaultValue={keyword}
          className='w-full p-2 border rounded'
        />
        <button type='submit' className='mt-2 p-2 bg-blue-500 text-white rounded'>
          검색
        </button>
      </form>

      {!keyword ? (
        <p className='text-center text-gray-500'>검색어를 입력하세요.</p>
      ) : total === 0 ? (
        <p className='text-center text-gray-500'>“{keyword}” 검색 결과가 없습니다.</p>
      ) : (
        <TweetList tweets={tweets} page={1} totalPages={1} />
      )}
    </div>
  );
}
