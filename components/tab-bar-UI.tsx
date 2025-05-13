'use client';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
  MagnifyingGlassCircleIcon as SolidMagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
  MagnifyingGlassCircleIcon as OutlineMagnifyingGlassIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logOut } from '@/lib/log-out';

interface ITabBarUI {
  profilePath: string;
}

export default function TabBarUI({ profilePath }: ITabBarUI) {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-2 *:text-white bg-neutral-800'>
      <Link href='/main' className='flex flex-col items-center gap-px'>
        {pathname === '/main' ? (
          <SolidHomeIcon className='w-7 h-7' />
        ) : (
          <OutlineHomeIcon className='w-7 h-7' />
        )}
        <span>메인</span>
      </Link>
      <Link href='/tweet/add' className='flex flex-col items-center gap-px'>
        {pathname === '/tweet/add' ? (
          <SolidNewspaperIcon className='w-7 h-7' />
        ) : (
          <OutlineNewspaperIcon className='w-7 h-7' />
        )}
        <span>글쓰기</span>
      </Link>
      <Link href='/search' className='flex flex-col items-center gap-px'>
        {pathname === '/search' ? (
          <SolidMagnifyingGlassIcon className='w-7 h-7' />
        ) : (
          <OutlineMagnifyingGlassIcon className='w-7 h-7' />
        )}
        <span>검색</span>
      </Link>
      <Link href={profilePath} className='flex flex-col items-center gap-px'>
        {pathname === profilePath ? (
          <SolidUserIcon className='w-7 h-7' />
        ) : (
          <OutlineUserIcon className='w-7 h-7' />
        )}
        <span>프로필</span>
      </Link>
      <form action={logOut} className='flex flex-col items-center gap-px cursor-pointer'>
        <button type='submit' className='btn-red flex flex-col items-center cursor-pointer '>
          <ArrowRightEndOnRectangleIcon className='w-7 h-7' />
          로그아웃
        </button>
      </form>
    </div>
  );
}
