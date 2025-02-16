import { Button } from '../button';
import { Link } from 'react-router-dom';

type NavButtonProps = {
  children: React.ReactNode;
  icon: React.ReactElement;
  href: string;
};

export const NavButton = ({ children, icon, href }: NavButtonProps) => {
  return (
    <Button className="btn-ghost flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  );
};
