import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateOrder from './pages/create-order';
import DashboardPage from './pages/dashboard';
import NotFound from './pages/not-found';
import "@fontsource/inter"; 
import "@fontsource/inter/400.css"; 
const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateOrder />,
    errorElement: (
      <div>
        <NotFound />
      </div>
    ),
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
