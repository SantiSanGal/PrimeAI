import { useAuth } from 'src/store/KeycloakProvider';
import { Navigate } from 'react-router';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { authenticated, initializing } = useAuth();

    // 1. Mientras Keycloak se está inicializando, muestra un estado de carga.
    if (initializing) {
        return <div>Loading authentication...</div>;
    }

    // 2. Si no está autenticado después de la carga, redirige.
    if (!authenticated) {
        return <Navigate to="/" />;
    }

    // 3. Si todo está bien, renderiza el componente hijo.
    return <>{children}</>;
};

export default ProtectedRoute;