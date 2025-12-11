import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig(({ mode }) => {

  const ovOptions = mode === 'ov' ? {
    entryFileNames: 'static/js/main.js',
    chunkFileNames: (fileInfo) => {
      if (fileInfo.name.includes('vendor')) {
        return 'static/js/vendor.js';  // Explicitly name the entry JS file
      }
      return 'static/js/[name]-[hash].js';
    },
    assetFileNames: (assetInfo) => {
      if (assetInfo.name.endsWith('.css')) {
        return 'static/css/main.css'; // Explicitly name the CSS file
      }
      return 'static/css/[name]-[hash].[ext]';
    }
  } : {}


  return {
    plugins: [react()],
    build: {
      outDir: 'build', // CRA's default build output
      manifest: 'asset-manifest.json',
      cssCodeSplit: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          ...ovOptions,
        }
      },
      target: "es2020",
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
  }
});