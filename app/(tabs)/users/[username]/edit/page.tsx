import EditProfileForm from '@/components/EditProfileForm';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

interface IEditPage {
  params: { username: string };
}

export default async function ProfileEditPage({ params }: IEditPage) {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername);

  // 사용자 확인하여 로그인된 사용자만 접근
  const session = await getSession();
  if (!session.id) {
    return redirect('/login');
  }

  // db에서 유저 정보를 조회
  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
    },
  });
  // 유저가 없다면 404페이지
  if (!user) {
    return notFound();
  }

  // 본인 여부 확인
  if (user.username !== username) {
    return redirect(`/users/${user.username}`);
  }

  // EditProfileForm에 초기값 전달
  return <EditProfileForm initialUser={user} />;
}
