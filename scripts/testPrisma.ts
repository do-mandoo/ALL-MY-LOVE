// testPrisma함수 때문에 db.ts를 import하면 바로 PrismaClient가 실행된다.
// 그렇게되면 브라우저에서도 작동하려고 시도를 한다.
// 결과적으로 에러들이 폭발적으로 터진다.....

// 따라서 해결하는 방법은 테스트용 데이터를 따로 분리해서 수동으로 실행해야 한다.
// 실행 명령어 `npx tsx scripts/testPrisma.ts`

import db from '@/lib/db';

async function testPrisma() {
  // // --- user 데이터 생성 ---
  // const newUser = await db.user.create({
  //   data: {
  //     username: 'Hello World!',
  //     email: 'hello@world.com',
  //     password: '123123',
  //   },
  // });
  // console.log(newUser);

  // // --- tweet 데이터 생성 ---
  // const newTweet = await db.tweet.create({
  //   data: {
  //     tweet: '첫 번째 트윗입니다!',
  //     user: { connect: { id: 1 } }, // 이미 있는 유저(예: id=1)로 연결
  //   },
  // });
  // console.log('testPrisma:', newTweet);

  // // --- like 데이터 생성 ---
  // const newLike = await db.like.create({
  //   data: {
  //     user: { connect: { id: 1 } }, // 유저 연결 (userId)
  //     tweet: { connect: { id: 1 } }, // 트윗 연결 (tweetId)
  //   },
  // });
  // console.log('newLike:', newLike);

  // // --- tweet관계 확인 ---
  // const tweet = await db.tweet.findUnique({
  //   where: { id: 2 },
  //   include: {
  //     user: true,
  //   },
  // });
  // console.log(tweet);

  // --- user, tweet, like관계 확인 ---
  const users = await db.user.findUnique({
    where: { id: 1 },
    include: {
      tweets: true,
      likes: { include: { user: true } },
    },
  });
  console.log(users);
}

testPrisma();
