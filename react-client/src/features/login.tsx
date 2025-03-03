import { Button } from '../components/button';
import { Input } from '../components/input';

export const Login = () => {
  return (
    <form className="flex flex-col gap-4">
      <Input name="email" placeholder="Email" type="email" required />
      <Input name="password" placeholder="Password" type="password" required />
      <Button type="submit">Login</Button>
    </form>
  );
};
