import { LoadingScreen } from 'src/components/loading-screen';
import { useAuth } from 'src/store/KeycloakProvider';
import { Outlet } from 'react-router';

export const RequireAuth = () => {
    const { authenticated, initializing } = useAuth();

    if (initializing) return <LoadingScreen />;
    if (!authenticated) {
        return <LoadingScreen />;
    }

    return <Outlet />;
};
