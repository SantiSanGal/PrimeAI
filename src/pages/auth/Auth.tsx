import { LoadingScreen } from 'src/components/loading-screen';
import { useAuth } from 'src/store/KeycloakProvider';
import { Navigate } from 'react-router';

const Auth = () => {
    const { authenticated, initializing } = useAuth();

    if (initializing) return <LoadingScreen />;
    if (authenticated) return <Navigate to="/dashboard" replace />;
    return <LoadingScreen />;
};

export default Auth;
