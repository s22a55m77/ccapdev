import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from './pages/Login/user.store.ts';

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth: FC<RequireAuthProps> = ({ allowedRoles }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  return user === undefined ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
