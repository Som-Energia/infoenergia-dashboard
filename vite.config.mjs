import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

/**
 * Splitting vendor chunks manually
 */
const vendorChunks = [
  { chunk: 'vendor-mui', includes: ['@mui', '@emotion', 'styled-components'] },
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
]

function manualChunks(id) {
  if (!id.includes('node_modules')) return
  const match = vendorChunks.find(({ includes }) =>
    includes.some((pkg) => id.includes(pkg)),
  )
  return match ? match.chunk : 'vendor'
}

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'BASE_URL') }

  const ovOptions =
    mode === 'ov'
      ? {
          entryFileNames: 'js/main.js',
          chunkFileNames: (fileInfo) => {
            if (fileInfo.name.includes('vendor')) {
              return 'js/vendor.js' // Explicitly name the entry JS file
            }
            return 'js/[name]-[hash].js'
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/main.css' // Explicitly name the CSS file
            }
            return 'css/[name]-[hash].[ext]'
          },
        }
      : {}

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
          manualChunks,
        },
      },
      target: 'es2020',
    },
    server: {
      open: true,
      port: 3000,
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
            /@somenergia\/somenergia-ui/,
          ],
        },
      },
    },
  }
})
