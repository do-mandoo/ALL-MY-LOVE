import db from '@/lib/db';
import Input from '@/components/input';
import Button from '@/components/button';
import Image from 'next/image';
import { Do_Hyeon } from 'next/font/google';
import TweetFeed from '@/components/tweet-feed';

const dohyon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

interface ISearchPage {
  searchParams: {
    keyword?: string;
    page?: string;
  };
}

const SearchPage = async ({ searchParams }: ISearchPage) => {
  const { keyword: rawKeyword, page: rawPage } = searchParams;
  const keyword = rawKeyword?.trim() || '';
  const page = parseInt(rawPage || '1', 10);
  const perPage = 8;

  // 검색어가 없으면 빈 배열
  const total = keyword ? await db.tweet.count({ where: { tweet: { contains: keyword } } }) : 0;

  return (
    <div className='flex flex-col w-full px-12 p-4 h-screen relative '>
      <h2 className='flex justify-start items-end gap-2  text-xl font-bold mb-3'>
        <Image src='/clover_pendant.jpg' alt='next.js logo' width={30} height={30} />
        <div className={`${dohyon.className} flex items-end font-bold text-blue-500 text-4xl`}>
          트윗 검색
        </div>
        <Image src='/clover_pendant.jpg' alt='next.js logo' width={30} height={30} />
      </h2>
      <form method='GET' className='space-y-2 mb-10 flex'>
        <Input
          type='text'
          name='keyword'
          placeholder='트윗 검색'
          defaultValue={keyword}
          className='w-full p-2 border rounded mb-2'
          cln='flex-2 mr-2'
        />
        <Button text='검색' className='flex-1' />
      </form>

      {!keyword ? (
        <p className='text-center text-gray-500'>검색어를 입력하세요.</p>
      ) : total === 0 ? (
        <p className='text-center text-gray-500'>“{keyword}” 검색 결과가 없습니다.</p>
      ) : (
        <>
          <p className='text-center text-gray-500'>“{keyword}”으/로 검색한 결과입니다.</p>
          <TweetFeed page={page} perPage={perPage} where={{ tweet: { contains: keyword } }} />
        </>
      )}
    </div>
  );
};
export default SearchPage;
