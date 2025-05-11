'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const textChange = ['MY', 'YOUR', 'OUR'];

type Ttweet = {
  id: number;
  tweets: {
    tweet: string;
  }[];
  user: {
    username: string;
  };
  username: string;
  likes: {
    id: number;
  }[];
};

export default function Home() {
  const [tweets, setTweets] = useState<Ttweet[]>([]);
  // db테스트
  useEffect(() => {
    const fetchTweets = async () => {
      const res = await fetch('/api/tweets');
      const data = await res.json();
      setTweets(data);
    };
    fetchTweets();
  }, []);

  // tweets가 바뀔 때만 콘솔 찍기
  useEffect(() => {
    console.log(tweets, 'tweets');
  }, [tweets]);

  // 1초마다 변하는 문구
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % textChange.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center bg-black py-8 px-32'>
      <div className='flex flex-col items-center *:font-medium mb-10'>
        <h1 className='text-5xl font-bold text-center  uppercase'>Welcom</h1>

        <Image src='/pendant.png' alt='next.js logo' width={180} height={38} />
        <h1 className='text-4xl font-bold text-center'>
          ALL &quot;<span className='text-pink-500'>{textChange[index]}</span>&quot; LOVE
        </h1>
      </div>
      <div className='flex flex-col items-center gap-3 w-full'>
        <Link href='/create-account' className='primary-btn text-lg py-2.5'>
          시작하기
        </Link>
        <div className='flex gap-2'>
          <span>이미 계정이 있나요?</span>
          <Link href='/login' className='hover:underline'>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
