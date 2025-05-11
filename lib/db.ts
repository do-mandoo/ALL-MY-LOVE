import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

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

export default db;
