import { ChangeEvent, ReactNode } from 'react';
import { InputHTMLAttributes } from 'react';

interface InputProps {
  errors?: string[];
  name: string;
  icon?: ReactNode; // SVG나 컴포넌트 아이콘 전달할 수 있도록 ReactNode 타입을 사용함.
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 입력값 변경 시 호출되는 핸들러. 위의 value와 같은 이유로 추가함.
}

export default function Input({
  errors = [],
  name,
  icon,
  onChange,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='relative w-full'>
        {icon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500'>{icon}</div>
        )}
        <input
          name={name}
          className={`
            bg-transparent rounded-full w-full h-10 pl-10 pr-3 
            focus:outline-none transition
            ring-2
            ${
              // 조건문이 errors가 아닌 error의 길이인 이유는 errors의 빈 배열도 true이기 때문이다.
              // errors.length는 errors의 배열에 오류 메시지가 하나라도 들어오면 true이기 때문에 이렇게 하는것이 더 정확하다.
              errors.length > 0
                ? 'ring-red-400 focus:ring-red-400' // 에러 있을 때
                : ''
            }
          `}
          onChange={onChange}
          {...rest}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className='text-red-400 text-xs'>
          {error}
        </span>
      ))}
    </div>
  );
}
