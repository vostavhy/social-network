import { Login } from '../../features/user/login';
import { Register } from '../../features/user/register';

export const Auth = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-box w-full max-w-[340px]">
        <input type="radio" name="my_tabs_6" className="tab" aria-label="Register" />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="min-h-[200px]">
            <Register />
          </div>
        </div>

        <input type="radio" name="my_tabs_6" className="tab" aria-label="Login" defaultChecked />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="min-h-[200px]">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};
