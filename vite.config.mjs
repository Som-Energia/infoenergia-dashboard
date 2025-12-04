import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // CRA's default build output
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/tests/setupTests.js'
  }
});