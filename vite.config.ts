import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'
import checker from 'vite-plugin-checker';
import path from 'path';

const PORT = 8080;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const devProxyTarget = env.DEV_PROXY_TARGET || 'http://localhost:7778';

  return {
    plugins: [
      tailwindcss(),
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
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: /^~(.+)/, replacement: path.resolve(process.cwd(), 'node_modules/$1') },
        { find: /^src(.+)/, replacement: path.resolve(process.cwd(), 'src/$1') },
      ],
    },
    server: {
      port: PORT,
      host: true,
      proxy: {
        '/api': {
          target: devProxyTarget,
          changeOrigin: true,
        },
      },
    },
    preview: { port: PORT, host: true },
  };
});
