import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from './pages/Login/user.store.ts';

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth: FC<RequireAuthProps> = ({ allowedRoles }) => {
  const user = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);
  const location = useLocation();

  console.log(user);

  if (isLogin === undefined) return '';

  if (!isLogin)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (user && allowedRoles.includes(user.role)) return <Outlet />;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
