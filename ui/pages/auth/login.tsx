import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { useRouter } from 'next/router';

// this is copied and slightly adapted from session.schema.ts
const createSessionSchema = object({
  email: string().nonempty({
    message: 'Email is required',
  }),
  password: string().nonempty({
    message: 'Password is required',
  }),
});

// lets us type useForm and onSubmit
type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  console.log(process.env.NEXT_PUBLIC_TEST);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  async function onSubmit(values: CreateSessionInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true },
      );
      router.push('/');
    } catch (e) {
      setLoginError((e as Error).message);
    }
  }

  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-element'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            placeholder='jane.doe@example.com'
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className='form-element'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='********'
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button type='submit'>SUBMIT</button>
      </form>
    </>
  );
}

export default LoginPage;
