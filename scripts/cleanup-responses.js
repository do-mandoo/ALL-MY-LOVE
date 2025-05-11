// scripts/cleanup-responses.js
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // tweetId가 NULL인 레코드를 모두 삭제
  const { count } = await db.response.deleteMany({
    where: { tweetId: null },
  });
  console.log(`🗑️  Deleted ${count} orphan responses (tweetId IS NULL)`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    db.$disconnect();
  });
