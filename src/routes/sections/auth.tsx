import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';
import { paths } from '../paths';

const SignInPage = lazy(() => import('src/pages/auth/Auth'));

const auth = {
  path: paths.auth,
  element: <SignInPage />,
}

// ----------------------------------------------------------------------

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
