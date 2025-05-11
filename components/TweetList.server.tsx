import db from '@/lib/db';

export default async function TweetList() {
  const tweets = await db.tweet.findMany({
    include: { user: true, like: true },
  });

  return (
    <ul className='hidden'>
      {tweets.map(t => (
        <li key={t.id}>
          <strong>{t.user.username}</strong>: {t.tweet}
          <span> ({t.like.length} like)</span>
        </li>
      ))}
    </ul>
  );
}
