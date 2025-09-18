import { SplashScreen } from 'src/components/loading-screen';
import type { RouteObject } from 'react-router';
import {
  // lazy,
  Suspense,
} from 'react';
import { Outlet } from 'react-router';

// const SignInPage = lazy(() => import('src/pages/auth/Auth'));

const auth = {
  path: '/auth/keycloak',
  // element: <SignInPage />,
  element: <></>,
};

export const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [auth],
  },
];
