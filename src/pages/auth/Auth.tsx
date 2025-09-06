import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import Keycloak from 'keycloak-js';

const Auth = () => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const initKeycloak = async () => {
            const kc = new Keycloak({
                url: 'https://api.hpenayo.com/keycloak',
                realm: 'primeai',
                clientId: 'primeai-front',
            });

            try {
                await kc.init({
                    onLoad: 'login-required',
                    checkLoginIframe: true,
                    pkceMethod: 'S256',
                });

                setKeycloak(kc);

                if (kc.authenticated) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error('Keycloak init failed', error);
            }
        };

        initKeycloak();
    }, [history]);

    return <Navigate to='/dashboard'></Navigate>
};

export default Auth;
