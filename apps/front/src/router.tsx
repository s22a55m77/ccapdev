import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import Main from './pages/Main';
import Restroom from './pages/Restroom';
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
    ],
  },
  {
    path: '/login',
  },
]);

export default router;
