import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import Main from './pages/Main';
import Restroom from './pages/Restroom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Index from './pages/CreateRestroom';
import UserProfile from './pages/UserProfile';
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
        path: '/user-profile',
        element: <UserProfile />,
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
]);

export default router;
