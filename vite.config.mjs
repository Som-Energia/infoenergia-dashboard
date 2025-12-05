import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // CRA's default build output
  },
  server: {
    open: true,
    port: 3000
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/tests/setupTests.js',

    // Replace problematic import with alias
    alias: {
      '^@mui/material/useMediaQuery$': '@mui/material/node/useMediaQuery/index.js',
    },

    // Vitest MUI's package pre-bundle avoid internal module resolution problems
    server: {
      deps: {
        inline: [
          '@mui/material',
          '@mui/x-date-pickers',
        ],
      },
    },
  },
});