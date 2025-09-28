import { AccountLayout } from 'src/sections/account/account-layout';
import { LoadingScreen } from 'src/components/loading-screen';
import { DashboardLayout } from 'src/layouts/dashboard';
import { RequireAuth } from '../guards/RequireAuth';
import type { RouteObject } from 'react-router';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
// Product
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
const ProductBrandListPage = lazy(() => import('src/pages/dashboard/product/brand-list'));
const ProductCategoriesListPage = lazy(() => import('src/pages/dashboard/product/categories-list'));
// Order
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// User
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// Account
const AccountGeneralPage = lazy(() => import('src/pages/dashboard/user/account/general'));
const AccountChangePasswordPage = lazy(
  () => import('src/pages/dashboard/user/account/change-password')
);

const dashboardLayout = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

const accountLayout = () => (
  <AccountLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </AccountLayout>
);

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <RequireAuth />,
    children: [
      {
        element: dashboardLayout(),
        children: [
          { index: true, element: <IndexPage /> },
          { path: 'analytics', element: <OverviewAnalyticsPage /> },
          {
            path: 'user',
            children: [
              { index: true, element: <UserProfilePage /> },
              { path: 'profile', element: <UserProfilePage /> },
              { path: 'cards', element: <UserCardsPage /> },
              { path: 'list', element: <UserListPage /> },
              { path: 'new', element: <UserCreatePage /> },
              { path: ':id/edit', element: <UserEditPage /> },
              {
                path: 'account',
                element: accountLayout(),
                children: [
                  { index: true, element: <AccountGeneralPage /> },
                  { path: 'change-password', element: <AccountChangePasswordPage /> },
                ],
              },
            ],
          },
          {
            path: 'product',
            children: [
              { index: true, element: <ProductListPage /> },
              { path: 'list', element: <ProductListPage /> },
              { path: ':id', element: <ProductDetailsPage /> },
              { path: 'new', element: <ProductCreatePage /> },
              { path: ':id/edit', element: <ProductEditPage /> },
              { path: 'categories', element: <ProductCategoriesListPage /> },
              { path: 'brands', element: <ProductBrandListPage /> },
            ],
          },
          {
            path: 'order',
            children: [
              { index: true, element: <OrderListPage /> },
              { path: 'list', element: <OrderListPage /> },
              { path: ':id', element: <OrderDetailsPage /> },
            ],
          },
          {
            path: 'invoice',
            children: [
              { index: true, element: <InvoiceListPage /> },
              { path: 'list', element: <InvoiceListPage /> },
              { path: ':id', element: <InvoiceDetailsPage /> },
              { path: ':id/edit', element: <InvoiceEditPage /> },
              { path: 'new', element: <InvoiceCreatePage /> },
            ],
          },
        ],
      },
    ],
  },
];
