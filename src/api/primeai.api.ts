import axios, { InternalAxiosRequestConfig } from 'axios';

console.log('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL)

export const primeaiApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Estas funciones se setean desde el Provider
let getToken: (() => string | undefined | null) | null = null;
let ensureFreshToken: (() => Promise<void>) | null = null;
let handleAuthError: (() => void) | null = null;

/** El Provider llamará a esto una sola vez al montar */
export function attachAuth(getTokenFn: () => (string | undefined | null),
    ensureFreshTokenFn: () => Promise<void>,
    onAuthError: () => void) {
    getToken = getTokenFn;
    ensureFreshToken = ensureFreshTokenFn;
    handleAuthError = onAuthError;
}

// Interceptor de request (se registra una vez)
primeaiApi.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    if (ensureFreshToken) {
        try { await ensureFreshToken(); } catch { }
    }
    const token = getToken ? getToken() : undefined;
    console.log('token', token)
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de response (reintento básico ante 401)
let isRefreshing = false;
primeaiApi.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { response, config } = error || {};
        if (response?.status === 401 && !config?._retry && ensureFreshToken) {
            if (!isRefreshing) {
                isRefreshing = true;
                try { await ensureFreshToken(); } catch { }
                isRefreshing = false;
            }
            config._retry = true;
            return primeaiApi(config); // reintenta una vez
        }

        if (response?.status === 401 && handleAuthError) {
            handleAuthError(); // keycloak.login()
        }
        return Promise.reject(error);
    }
);
