import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const PORT = 8080;

export default defineConfig(({ mode }) => {
  // Carga .env.*, según el modo (development / production / etc.)
  // El tercer argumento '' indica que cargue TODO (no solo claves que empiezan con VITE_)
  const env = loadEnv(mode, process.cwd(), '');

  // Usa una var de entorno para el target del proxy en DEV
  // Por ejemplo DEV_PROXY_TARGET en .env.development
  const devProxyTarget = env.DEV_PROXY_TARGET || 'http://localhost:7778';

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
          dev: { logLevel: ['error'] },
        },
        overlay: false,
        terminal: true,
      }),
    ],
    resolve: {
      alias: [
        { find: /^~(.+)/, replacement: path.resolve(process.cwd(), 'node_modules/$1') },
        { find: /^src(.+)/, replacement: path.resolve(process.cwd(), 'src/$1') },
      ],
    },
    server: {
      port: PORT,
      host: true,
      proxy: {
        '/api': {
          target: devProxyTarget,   // <<--- viene de .env
          changeOrigin: true,
          // rewrite: (p) => p, // o ajusta según tu backend
        },
      },
    },
    preview: { port: PORT, host: true }, // aquí no hay proxy
  };
});
