import { Navigate, type RouteObject } from 'react-router';
import { RequireAuth } from '../guards/RequireAuth';
import { dashboardRoutes } from './dashboard';
import { mainRoutes } from './main';
import { lazy } from 'react';

const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  // PROTEGIDAS
  {
    element: <RequireAuth />,
    children: [...dashboardRoutes, ...mainRoutes],
  },

  { path: '*', element: <Page404 /> },
];
