import formsPlugin from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      margin: {
        tomato: '120px',
      },
      borderRadius: {
        'sexy-name': '11.11px',
      },
      fontFamily: {
        sans: ['var(--font-inter)'], // 기본 본문
        slab: ['var(--font-roboto-slab)'], // 제목 전용
      },
    },
  },
  plugins: [formsPlugin],
};

export default config;
