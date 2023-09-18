import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import Main from "./components/Main";
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />
      }
    ]
  },
  {
    path: '/login'
  }
]);

export default router;
