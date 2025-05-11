import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/main': false,
  '/log-in': true,
  '/create-account': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  // session에 id가 있다면 /페이지로, 아니라면 로그인 페이지로 유도
  if (!session?.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/log-in', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/main', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg|pendant.png).*)'],
};
