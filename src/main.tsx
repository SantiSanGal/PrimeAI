import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';
import { KeycloakProvider } from './store/KeycloakProvider';
import { HelmetProvider } from 'react-helmet-async';
import { routesSection } from './routes/sections';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app';

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
    <KeycloakProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </KeycloakProvider>
  </StrictMode>
);
