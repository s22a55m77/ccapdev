import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import Main from './pages/Main';
import Restroom from './pages/Restroom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Index from './pages/CreateRestroom';
import UserProfile from './pages/UserProfile';
import AdminTable from './pages/AdminTable';
import Error404 from './pages/Error/Error404.tsx';
import RequireAuth from './RequireAuth.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/restroom/:restroomId',
        element: <Restroom />,
      },
      {
        path: '/submit-restroom',
        element: <Index />,
      },
      {
        path: '/user/:userId',
        element: <UserProfile />,
      },
      {
        path: '/admin-table',
        element: <RequireAuth allowedRoles={['ADMIN']} />,
        children: [
          {
            index: true,
            element: <AdminTable />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/404',
    element: <Error404 />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
]);

export default router;
