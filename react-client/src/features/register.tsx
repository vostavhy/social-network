import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyCurrentQuery, useRegisterMutation } from '../app/services/userApi';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { ErrorMSG } from '../components/error-msg/errorMsg';

export const Register = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [register, { isLoading }] = useRegisterMutation();
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    };
    console.log(data);

    try {
      const response = await register(data).unwrap();
      console.log('Response:', response);
    } catch (error: any) {
      console.log('Error occurred:', error);

      if (error.data.error) {
        setErrorMsg(error.data.error);
      } else {
        setErrorMsg('An unknown error occurred');
      }

      console.log('type of ErrorMSG:', typeof errorMsg);
      console.log('ErrorMSG:', errorMsg);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" type="email" required />
      <Input name="password" placeholder="Password" type="password" required />
      <Input name="name" placeholder="Name" type="text" />
      {errorMsg && <ErrorMSG errorMsg={errorMsg} />}
      <Button type="submit" isLoading={isLoading}>
        Register
      </Button>
    </form>
  );
};
