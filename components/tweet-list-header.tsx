import Image from 'next/image';
import { Do_Hyeon } from 'next/font/google';

const dohyon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

export default function TweetListHeader() {
  return (
    <h2 className='flex justify-star m-0 p-0 gap-1'>
      <Image src='/star_pendant.jpg' alt='next.js logo' width={30} height={30} />
      <div className={`${dohyon.className} flex items-end font-bold text-blue-500 text-4xl`}>
        트윗 목록
      </div>
      <Image src='/star_pendant.jpg' alt='next.js logo' width={30} height={30} />
    </h2>
  );
}
