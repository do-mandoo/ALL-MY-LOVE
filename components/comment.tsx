'use client';

interface CommentsProps {
  id: number;
  payload: string;
  createdAt: string;
  user: {
    username: string;
  };
}

export default function Comments({ id, payload, createdAt, user }: CommentsProps) {
  return (
    <li key={id} className='p-2 border rounded'>
      <p className='text-sm text-gray-600 mb-1'>
        {user.username} • {createdAt}
      </p>
      <p>{payload}</p>
    </li>
  );
}
