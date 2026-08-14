import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth_app',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login.jsx',
        './useSharedState': './src/store/useSharedState.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 5001,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
});
