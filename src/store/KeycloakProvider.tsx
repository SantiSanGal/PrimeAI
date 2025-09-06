import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Keycloak, { KeycloakConfig, KeycloakProfile } from 'keycloak-js';
import { attachAuth } from 'src/api/primeai.api';

type AuthContextType = {
    keycloak: Keycloak | null;
    authenticated: boolean;
    initializing: boolean;
    profile: KeycloakProfile | null;
    token?: string;
    login: () => void;
    logout: () => void;
    hasRealmRole: (role: string) => boolean;
    hasResourceRole: (role: string, resource?: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const keycloakConfig: KeycloakConfig = {
    url: 'https://api.hpenayo.com/keycloak',
    realm: 'primeai',
    clientId: 'primeai-front',
};

const kcSingleton = new Keycloak(keycloakConfig);

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [profile, setProfile] = useState<KeycloakProfile | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            try {
                const auth = await kcSingleton.init({
                    onLoad: 'login-required',
                    pkceMethod: 'S256',
                    checkLoginIframe: true,
                });

                if (!mounted) return;

                setKeycloak(kcSingleton);
                setAuthenticated(auth);
                setToken(kcSingleton.token);

                if (auth) {
                    try {
                        const p = await kcSingleton.loadUserProfile();
                        if (mounted) setProfile(p);
                    } catch { /* opcional: log */ }
                }

                kcSingleton.onTokenExpired = async () => {
                    try {
                        const refreshed = await kcSingleton.updateToken(30);
                        if (refreshed && mounted) setToken(kcSingleton.token);
                    } catch {
                        kcSingleton.login();
                    }
                };
            } catch (e) {
                console.error('Keycloak init failed', e);
            } finally {
                if (mounted) setInitializing(false);
            }
        };

        init();
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        if (!keycloak) return;

        attachAuth(
            () => keycloak.token,
            async () => { await keycloak.updateToken(30); }, // ensureFreshToken
            () => keycloak.login()
        );
    }, [keycloak]);

    const value = useMemo<AuthContextType>(() => ({
        keycloak,
        authenticated,
        initializing,
        profile,
        token,
        login: () => keycloak?.login(),
        logout: () => keycloak?.logout({ redirectUri: window.location.origin }),
        hasRealmRole: (role: string) => !!keycloak?.hasRealmRole?.(role),
        hasResourceRole: (role: string, resource?: string) => !!keycloak?.hasResourceRole?.(role, resource),
    }), [keycloak, authenticated, initializing, profile, token]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within KeycloakProvider');
    return ctx;
};
