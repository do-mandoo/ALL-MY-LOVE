'use client';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  text: string;
  className?: string;
}

export default function Button({ text, className = '' }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`${className}
        primary-btn h-10 disabled:bg-neutral-400 rounded-full disabled:text-neutral-300 disabled:cursor-not-allowed`}
    >
      {pending ? '로딩 중' : text}
    </button>
  );
}
