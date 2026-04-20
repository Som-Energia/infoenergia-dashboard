import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint2'

import {
  createAppConfig,
  createManualChunks,
} from '@somenergia/frontend-config/vite'

export default createAppConfig((mode) => {
  const ovOptions =
    mode === 'ov'
      ? {
          entryFileNames: 'js/main.js',
          chunkFileNames: (fileInfo) => {
            return fileInfo.name.includes('vendor')
              ? 'js/vendor.js' // Explicitly name the entry JS file
              : 'js/[name]-[hash].js'
          },
          assetFileNames: (assetInfo) => {
            return assetInfo.name.endsWith('.css')
              ? 'css/main.css' // Explicitly name the CSS file
              : 'css/[name]-[hash].[ext]'
          },
        }
      : {}

  return {
    plugins: [react(), eslint({ build: true, emitWarning: false })],
    build: {
      outDir: 'build', // CRA's default build output
      manifest: 'asset-manifest.json',
      cssCodeSplit: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          ...ovOptions,
          manualChunks: createManualChunks([
            {
              chunk: 'vendor-mui',
              includes: ['@mui', '@emotion', 'styled-components'],
            },
            {
              chunk: 'vendor-react',
              includes: [
                '/node_modules/react/',
                '/node_modules/react-dom/',
                '/node_modules/react-router',
                '/node_modules/scheduler/',
                '@remix-run',
              ],
            },
            {
              chunk: 'vendor-charts',
              includes: [
                '/recharts/',
                '/d3-',
                '/react-smooth/',
                '/recharts-scale/',
                '/decimal.js-light/',
              ],
            },
            { chunk: 'vendor-i18n', includes: ['i18next', 'react-i18next'] },
            { chunk: 'vendor-somenergia', includes: ['@somenergia'] },
          ]),
        },
      },
    },
    test: {
      setupFiles: './src/tests/setupTests.js',
      // Vitest MUI's package pre-bundle avoid internal module resolution problems
      server: {
        deps: {
          inline: [
            /@mui\/material/,
            /@mui\/icons-material/,
            '@mui/x-date-pickers',
            /@somenergia\/somenergia-ui/,
          ],
        },
      },
      exclude: ['**/node_modules/**', '**/scripts/**', '**/coverage/**'],
    },
  }
})
