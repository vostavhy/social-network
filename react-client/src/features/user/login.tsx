import { useNavigate } from 'react-router-dom';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useState } from 'react';
import { ErrorMSG } from '../../components/error-msg/errorMsg';

export const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    console.log('Data:', data);

    try {
      await login(data).unwrap();
      await triggerCurrentQuery().unwrap();
      navigate('/');
    } catch (error: any) {
      console.log('Error occurred:', error);
      if (error.data.error) {
        setErrorMsg(error.data.error);
      } else {
        setErrorMsg('An unknown error occurred');
      }

      console.log('ErrorMSG:', errorMsg);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" type="email" required />
      <Input name="password" placeholder="Password" type="password" required />
      <ErrorMSG errorMsg={errorMsg} />
      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
    </form>
  );
};
