import { useNavigate } from 'react-router-dom';
import { useCurrentQuery } from '../../app/services/userApi';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return <>{children}</>;
};
