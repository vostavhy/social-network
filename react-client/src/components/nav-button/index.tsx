import { Button } from '../button';
import { Link } from 'react-router-dom';

type NavButtonProps = {
  children: React.ReactNode;
  icon: React.ReactElement;
  href: string;
};

export const NavButton = ({ children, icon, href }: NavButtonProps) => {
  return (
    <Link to={href}>
      <Button className="btn-ghost btn-lg flex justify-start text-xl" icon={icon} fullWidth={true}>
        {children}
      </Button>
    </Link>
  );
};
