import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    testTimeout: 10000,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/.next/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.next/**',
        'e2e/**',
        '*.config.*',
        'vitest.setup.ts',
        'app/layout.tsx',
        'app/**/page.tsx',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
