import TweetFeed from '@/components/tweet-feed';
import TweetListHeader from '@/components/tweet-list-header';

interface IProps {
  searchParams: { page?: string };
}

export default function MainPage({ searchParams }: IProps) {
  const { page: rawPage } = searchParams;
  const page = parseInt(rawPage || '1', 10);

  return (
    <div className='relative flex flex-col justify-start px-12 py-6 w-full h-screen bg-black'>
      <TweetListHeader />
      <TweetFeed page={page} perPage={8} />
    </div>
  );
}
