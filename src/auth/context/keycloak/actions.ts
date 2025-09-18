// /src/auth/context/keycloak/actions.ts
import { getKcInstance } from 'src/store/KeycloakProvider'; // exporta esto desde tu provider (ver nota abajo)

export const signOut = async (): Promise<void> => {
  await getKcInstance().logout({ redirectUri: window.location.origin });
};

// Minimal puede llamar a esto desde pantallas de login. Redirige al IdP:
export const signInWithPassword = async (): Promise<void> => {
  await getKcInstance().login();
};

export const signUp = async (): Promise<void> => {
  await getKcInstance().register?.(); // si tienes registration habilitado
};

// Stubs por si alguna vista los importa:
export const resetPassword = async () => {
  await getKcInstance().accountManagement?.();
};
export const updatePassword = async () => {
  await getKcInstance().accountManagement?.();
};
