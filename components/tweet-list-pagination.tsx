'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface IPagination {
  page: number;
  totalPages: number;
}

export default function TweetListPagination({ page, totalPages }: IPagination) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 현재 쿼리 스트링을 복제하고 page만 교체한다.
  const buildHref = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex justify-between items-center mt-3 mb-6 absolute bottom-20 left-13 right-13'>
      {page > 1 ? (
        <Link
          href={buildHref(page - 1)}
          className='px-4 py-2 bg-gray-200 rounded text-rose-500 hover:bg-gray-300'
        >
          ← 이전
        </Link>
      ) : (
        <span className='px-4 py-2 bg-gray-500 rounded text-rose-200 disable cursor-not-allowed'>
          ← 이전
        </span>
      )}

      <span className='text-sm'>
        {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={buildHref(page + 1)}
          className='px-4 py-2 bg-gray-200 rounded text-rose-500 hover:bg-gray-300'
        >
          다음 →
        </Link>
      ) : (
        <span className='px-4 py-2 bg-gray-500 rounded text-rose-200 disable cursor-not-allowed'>
          다음 →
        </span>
      )}
    </div>
  );
}
