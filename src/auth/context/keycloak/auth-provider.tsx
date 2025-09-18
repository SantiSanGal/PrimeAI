import type { AuthContextValue, UserType } from '../../types';
import { useAuth as useKC } from 'src/store/KeycloakProvider';
import type { KeycloakProfile } from 'keycloak-js';
import { AuthContext } from '../auth-context';
import React, { useMemo } from 'react';

type Props = { children: React.ReactNode };

function mapUser(profile: KeycloakProfile | null, token?: string): UserType {
  if (!profile) return null;

  const displayName =
    profile.firstName || profile.lastName
      ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
      : profile.username || profile.email || 'User';

  // Ajusta estas claves al shape que use tu UI (displayName, photoURL, role, etc.)
  return {
    ...profile,
    id: (profile as any).id ?? profile.username ?? profile.email, // fallback
    email: profile.email,
    displayName,
    role: (profile as any).role ?? 'admin',
    accessToken: token,
    photoURL: (profile as any)?.attributes?.picture?.[0],
  };
}

export function AuthProvider({ children }: Props) {
  const { authenticated, initializing, profile, token } = useKC();

  const value: AuthContextValue = useMemo(
    () => ({
      user: mapUser(profile, token),
      loading: initializing,
      authenticated,
      unauthenticated: !authenticated && !initializing,
      // Minimal lo tiene opcional; con Keycloak no hace falta
      checkUserSession: undefined,
    }),
    [authenticated, initializing, profile, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
