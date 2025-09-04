// https://api.hpenayo.com/keycloak/realms/primeai/protocol/openid-connect/auth?client_id=account-console&redirect_uri=https%3A%2F%2Fapi.hpenayo.com%2Fkeycloak%2Frealms%2Fprimeai%2Faccount&state=eec85fc0-dcc4-4a9d-a7d1-afdb4062442d&response_type=code&code_challenge=uuQVGNf4bWMKkBE5ZcaSUx6LL5JbQpp5Y2dS_D1QcRE&code_challenge_method=S256
// santiago.galvan@gmail.com
// hugo2001

import { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
// import { useHistory } from 'react-router-dom';

const Auth = () => {
    // const history = useHistory();
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const initKeycloak = async () => {
            const kc = new Keycloak({
                url: 'https://api.hpenayo.com/keycloak',
                realm: 'primeai',
                clientId: 'account-console',
            });

            try {
                await kc.init({
                    onLoad: 'login-required',
                    checkLoginIframe: true,
                    pkceMethod: 'S256',
                });

                setKeycloak(kc);

                // Si está autenticado, redirigimos al dashboard
                if (kc.authenticated) {
                    setAuthenticated(true);
                    // history.push('/dashboard');
                }
            } catch (error) {
                console.error('Keycloak init failed', error);
            }
        };

        initKeycloak();
    }, [history]);

    if (!keycloak) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <div>Authenticating...</div>;
    }

    return (
        <div>
            <h1>Welcome to the Auth Page</h1>
            {/* Aquí podrías agregar más contenido o botones, pero con Keycloak ya autenticado */}
        </div>
    );
};

export default Auth;
