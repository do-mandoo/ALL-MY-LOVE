'use client';

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  UserIcon as SolidUserIcon,
  MagnifyingGlassIcon as SolidMagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  UserIcon as OutlineUserIcon,
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ITabBarUI {
  profilePath: string;
}

export default function TabBarUI({ profilePath }: ITabBarUI) {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-4 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800'>
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
      {/* <div className='absolute top-[-80px] right-0'>
        <Link
          href='/tweet/add'
          className='bg-fuchsia-500 flex items-center justify-center rounded-full size-14 text-white transition-colors hover:bg-fuchsia-400'
        >
          <PlusIcon className='size-8' />
        </Link>
      </div> */}
    </div>
  );
}
