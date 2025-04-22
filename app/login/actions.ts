'use server';

export async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get('password');

  await new Promise(resolve => setTimeout(resolve, 2000));

  // 비밀번호 확인
  if (password !== '12345') {
    return {
      success: false,
      errors: ['Wrong password'],
    };
  }

  return {
    success: true,
    errors: [],
    message: 'Welcome back!',
  };
}
