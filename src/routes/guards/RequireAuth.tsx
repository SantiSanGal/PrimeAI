import { useAuth } from 'src/store/KeycloakProvider';
import { Outlet } from 'react-router';

export const RequireAuth = () => {
    const { authenticated, initializing } = useAuth();

    console.log('RequireAuth authenticated', authenticated);

    if (initializing) return <div>Cargando autenticación…</div>;
    if (!authenticated) {
        return <div>Redirigiendo al inicio de sesión…</div>;
    }

    return <Outlet />;
};
