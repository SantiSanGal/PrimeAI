// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/store/KeycloakProvider';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authenticated, loading } = useAuth();

    // 1. Mientras Keycloak se está inicializando, muestra un estado de carga.
    //    Esto es CRUCIAL para evitar redirecciones prematuras.
    if (loading) {
        return <div>Loading authentication...</div>;
    }

    // 2. Si no está autenticado después de la carga, redirige.
    //    (Con 'login-required', esto es un fallback, Keycloak ya debería haber redirigido)
    if (!authenticated) {
        return <Navigate to="/" />;
    }

    // 3. Si todo está bien, renderiza el componente hijo.
    return <>{children}</>;
};

export default ProtectedRoute;