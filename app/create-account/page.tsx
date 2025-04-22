// // 나중에 홈 화면으로 사용하기.
// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';

// const phrases = ['MY', 'YOUR', 'OUR'];

// export default function Home() {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex(prev => (prev + 1) % phrases.length);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className='flex flex-col items-center justify-between min-h-screen p-6'>
//       <div className='my-auto min-w-80 flex flex-col items-center gap-2 *:font-medium'>
//         <h1 className='text-4xl text-purple-400'>WELCOME</h1>
//         <Image src='/pendant.png' alt='next.js logo' width={180} height={38} />
//         <h1 className='text-4xl font-bold text-center transition-all duration-500'>
//           ALL &quot;<span className='text-pink-500'>{phrases[index]}</span>&quot; LOVE
//         </h1>
//       </div>
//       <div className='flex flex-col items-center gap-3 w-full'>
//         <Link href='/create-account' className='primary-btn text-lg py-2.5'>
//           시작하기
//         </Link>
//         <div className='flex gap-2'>
//           <span>이미 계정이 있나요?</span>
//           <Link href='/login' className='hover:underline'>
//             로그인
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
