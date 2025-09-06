import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Keycloak from 'keycloak-js';

// 1. Configuración de la instancia de Keycloak
const keycloakInstance = new Keycloak({
    url: 'https://api.hpenayo.com/keycloak',
    realm: 'primeai',
    clientId: 'primeai-front',
});

// 2. Crear el Contexto
interface IAuthContext {
    keycloak: Keycloak | null;
    authenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
    keycloak: null,
    authenticated: false,
    loading: true,
});

// 3. Crear el Provider
interface KeycloakProviderProps {
    children: ReactNode;
}

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const auth = await keycloakInstance.init({
                    onLoad: 'login-required', // O 'check-sso' si el login no es obligatorio en todas las páginas
                    checkLoginIframe: true,
                    pkceMethod: 'S256',
                });

                console.log('Keycloak initialized. Authenticated:', auth);
                setKeycloak(keycloakInstance);
                setAuthenticated(auth);
            } catch (error) {
                console.error('Keycloak init failed', error);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const contextValue = {
        keycloak,
        authenticated,
        loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Crear un custom hook para consumir el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};