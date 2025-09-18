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

// --- Singleton + initPromise para tolerar StrictMode/HMR ---
const getKc = () => {
  const g = globalThis as any;
  if (!g.__kcInstance) g.__kcInstance = new Keycloak(keycloakConfig);
  return g.__kcInstance as Keycloak;
};
const getInitPromise = () => {
  const g = globalThis as any;
  return g.__kcInitPromise as Promise<boolean> | undefined;
};
const setInitPromise = (p: Promise<boolean>) => {
  const g = globalThis as any;
  g.__kcInitPromise = p;
};
export const getKcInstance = () => getKc();

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [profile, setProfile] = useState<KeycloakProfile | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        const kc = getKc();

        // Evita doble init: reutiliza la promesa si ya existe
        let initP = getInitPromise();
        if (!initP) {
          initP = kc.init({
            onLoad: 'login-required', // muestra el formulario si no hay sesión
            pkceMethod: 'S256',
            checkLoginIframe: false, // <= reduce problemas de 3rd-party cookies/iframes
          });
          setInitPromise(initP);
        }

        const auth = await initP;

        if (!mounted) return;

        setKeycloak(kc);
        setAuthenticated(!!auth);
        setToken(kc.token ?? undefined);

        if (auth) {
          try {
            const p = await kc.loadUserProfile();
            if (mounted) setProfile(p);
          } catch {
            /* noop */
          }
        }

        kc.onTokenExpired = async () => {
          try {
            const refreshed = await kc.updateToken(30);
            if (refreshed && mounted) setToken(kc.token ?? undefined);
          } catch {
            kc.login();
          }
        };
      } catch (e) {
        console.error('Keycloak init failed', e);
      } finally {
        if (mounted) setInitializing(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!keycloak) return;
    if (keycloak.token) localStorage.setItem('token', keycloak.token);
    attachAuth(
      () => keycloak.token,
      async () => {
        await keycloak.updateToken(30);
      },
      () => keycloak.login()
    );
  }, [keycloak]);

  const value = useMemo<AuthContextType>(
    () => ({
      keycloak,
      authenticated,
      initializing,
      profile,
      token,
      login: () => keycloak?.login(),
      logout: () => keycloak?.logout({ redirectUri: window.location.origin }),
      hasRealmRole: (role: string) => !!keycloak?.hasRealmRole?.(role),
      hasResourceRole: (role: string, resource?: string) =>
        !!keycloak?.hasResourceRole?.(role, resource),
    }),
    [keycloak, authenticated, initializing, profile, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within KeycloakProvider');
  return ctx;
};
