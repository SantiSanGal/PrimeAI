import { Navigate, type RouteObject } from 'react-router';
import { componentsRoutes } from './components';
import { dashboardRoutes } from './dashboard';
import { authDemoRoutes } from './auth-demo';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { lazy } from 'react';

const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <Navigate to='/auth/keycloak'></Navigate>
    ),
  },

  // Auth
  ...authRoutes,
  ...authDemoRoutes,

  // Dashboard
  ...dashboardRoutes,

  // Main
  ...mainRoutes,

  // Components
  ...componentsRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
