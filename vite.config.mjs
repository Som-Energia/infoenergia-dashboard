import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite'


export default defineConfig(({ mode }) => {

   process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'BASE_URL') }

  const ovOptions = mode === 'ov' ? {
    entryFileNames: 'js/main.js',
    chunkFileNames: (fileInfo) => {
      if (fileInfo.name.includes('vendor')) {
        return 'js/vendor.js';  // Explicitly name the entry JS file
      }
      return 'js/[name]-[hash].js';
    },
    assetFileNames: (assetInfo) => {
      if (assetInfo.name.endsWith('.css')) {
        return 'css/main.css'; // Explicitly name the CSS file
      }
      return 'css/[name]-[hash].[ext]';
    }
  } : {}


  return {
    base: process.env.BASE_URL,
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
    resolve: {
      dedupe: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/x-date-pickers",
        "@mui/system",
        "@mui/base",
        "styled-components",
        "dayjs",
      ],
    },
    optimizeDeps: {
      include: [
        "@mui/material",
        "@mui/x-date-pickers",
        "@somenergia/somenergia-ui",
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
      setupFiles: './src/tests/setupTests.js',
      // Vitest MUI's package pre-bundle avoid internal module resolution problems
      server: {
        deps: {
          inline: [
            /@mui\/material/,
            /@mui\/icons-material/,
            '@mui/x-date-pickers',
            /@somenergia\/somenergia-ui/
          ],
        },
      },
    },
  }
});
