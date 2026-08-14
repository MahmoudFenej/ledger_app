import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    eslint({
      cache: false,
      include: ['src/**/*.js', 'src/**/*.jsx'],
      emitWarning: true,
      emitError: true,
    }), 
    react(),
    federation({
      name: 'ledger_app',
      remotes: {
        auth_app: 'https://auth-app-dw2.pages.dev/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    target: 'esnext',
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});