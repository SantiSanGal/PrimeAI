import { useAuth } from 'src/store/KeycloakProvider';
import { Navigate } from 'react-router';

const Auth = () => {
    const { authenticated, initializing } = useAuth();

    if (initializing) return <div>Cargando…</div>;
    if (authenticated) return <Navigate to="/dashboard" replace />;
    return <div>Redirigiendo al inicio de sesión…</div>;
};

export default Auth;
