import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number; // 쿠키에 id가 없을 수도 있기 때문에 optional로 둔다.
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: 'new-lover',
    password: process.env.COOKIE_PASSWORD!, // !느낌표는 타입스크립트에게 .env안에 COOKIE_PASSWORD가 무조건 존재한다는것을 알려주는 것이다.
  });
}
