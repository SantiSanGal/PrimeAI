import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { KeycloakProvider } from './store/KeycloakProvider';
import { HelmetProvider } from 'react-helmet-async';
import { routesSection } from './routes/sections';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    children: routesSection,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </KeycloakProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
