import { useAuth } from 'src/store/KeycloakProvider';
import { PropsWithChildren } from 'react';

export const RequireAuth = ({ children }: PropsWithChildren) => {
    const { authenticated, initializing } = useAuth();

    console.log('RequireAuth authenticated', authenticated);


    if (initializing) return <div>Cargando autenticación…</div>;
    if (!authenticated) {
        return <div>Redirigiendo al inicio de sesión…</div>;
    }
    return <>{children}</>;
};
