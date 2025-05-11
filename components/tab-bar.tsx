import db from '@/lib/db';
import getSession from '@/lib/session';
import TabBarUI from './tab-bar-UI';

export default async function TabBar() {
  const session = await getSession();

  let profilePath = '/login'; // 로그인이 안됐으면 로그인 페이지로
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
      select: { username: true },
    });
    if (user?.username) {
      profilePath = `/users/${user.username}`;
    }
  }
  return <TabBarUI profilePath={profilePath} />;
}
