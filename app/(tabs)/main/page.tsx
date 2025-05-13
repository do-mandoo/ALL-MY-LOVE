import TweetFeed from '@/components/tweet-feed';
import TweetListHeader from '@/components/tweet-list-header';

interface Props {
  searchParams: { page?: string };
}

export default async function MainPage({ searchParams }: Props) {
  const { page: rawPage } = await searchParams;
  const page = parseInt(rawPage || '1', 10);

  return (
    <div className='relative flex flex-col justify-start px-12 py-6 w-full h-screen bg-black'>
      <TweetListHeader />
      <TweetFeed page={page} perPage={8} />
    </div>
  );
}
