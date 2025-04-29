import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  // 오직 session에 ID가 없을 때만 실행된다. 만약 session에 ID가 있고 user를 찾을 수 없다면 notFound가 실행된다.
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };
  return (
    <div className='flex flex-col justify-center items-center py-8 px-32'>
      <div className='mb-20'>
        <h1 className='uppercase mb-10'>{user?.username}'s Profile</h1>
        <div className='w-36 h-36 bg-amber-300 rounded-full'></div>
        <div className='mt-5 w-full flex flex-col'>
          <div className='flex'>
            <span className='mr-2 w-20'>id:</span>
            <span>{user?.id}</span>
          </div>
          <div className='flex'>
            <span className='mr-2 w-20'>username:</span>
            <span>{user?.username}</span>
          </div>
          <div className='flex'>
            <span className='mr-2 w-20'>email:</span>
            <span>{user?.email}</span>
          </div>
          <div className='flex'>
            <span className='mr-2 w-20'>bio:</span>
            <span>{user?.bio ? user?.bio : 'undefind!'}</span>
          </div>
        </div>
      </div>
      <form action={logOut}>
        <button className='primary-btn cursor-pointer px-3'>Log out</button>
      </form>
    </div>
  );
}
