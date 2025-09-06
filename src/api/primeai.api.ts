export const primeaiApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// api/axios.ts
import axios from 'axios';
import { useAuth } from "src/store/KeycloakProvider";

export const useApi = () => {
    const { token, keycloak } = useAuth();

    const instance = axios.create({ baseURL: '/api' });

    instance.interceptors.request.use(async (config) => {
        // asegúrate de que el token esté fresco
        try { await keycloak?.updateToken?.(30); } catch { /* noop */ }
        const fresh = keycloak?.token ?? token;
        if (fresh) config.headers.Authorization = `Bearer ${fresh}`;
        return config;
    });

    return instance;
};
