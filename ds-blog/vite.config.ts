import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteUserConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // you might want to disable the `css: true` line, since we don't have
    // tests that rely on CSS -- and parsing CSS is slow.
    // I'm leaving it in here becasue often people want to parse CSS in tests.
    css: false
  },
  resolve: {
    alias: {
      // Create an alias for the testing utility
      'testing-library-utils': '/src/test-utils/testing-library-utils.tsx',
      src: '/src'
    }
  }
} as ViteUserConfig)
