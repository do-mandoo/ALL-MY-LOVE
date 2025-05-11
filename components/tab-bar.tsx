'use client';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800'>
      <Link href='/' className='flex flex-col items-center gap-px'>
        {pathname === '/' ? (
          <SolidHomeIcon className='w-7 h-7' />
        ) : (
          <OutlineHomeIcon className='w-7 h-7' />
        )}
        <span>홈</span>
      </Link>
      <Link href='/tweet/add' className='flex flex-col items-center gap-px'>
        {pathname === '/tweet/add' ? (
          <SolidNewspaperIcon className='w-7 h-7' />
        ) : (
          <OutlineNewspaperIcon className='w-7 h-7' />
        )}
        <span>글쓰기</span>
      </Link>

      <Link href='/profile' className='flex flex-col items-center gap-px'>
        {pathname === '/profile' ? (
          <SolidUserIcon className='w-7 h-7' />
        ) : (
          <OutlineUserIcon className='w-7 h-7' />
        )}
        <span>사용자</span>
      </Link>
    </div>
  );
}
