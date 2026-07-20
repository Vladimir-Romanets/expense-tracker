import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const sharedRules = {
  'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-explicit-any': 'warn',
  'import/no-anonymous-default-export': 'off',
  'prettier/prettier': 'error',
};

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '**/next-env.d.ts',
    '**/drizzle/**',
    '**/*.config.{js,ts,mjs,cjs}',
    '**/pgdata/**',
  ]),
  {
    settings: {
      react: {
        version: '19.0',
      },
      next: {
        rootDir: ['apps/web/', './'],
      },
    },
  },
  js.configs.recommended,
  ...tseslint.config({
    name: 'api',
    files: ['apps/api/src/**/*.ts', 'src/**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    extends: [...tseslint.configs.recommended, prettierConfig],
    rules: {
      ...sharedRules,
    },
  }),
  ...nextVitals.map((cfg) => ({
    ...cfg,
    files: ['apps/web/src/**/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],
    settings: {
      ...cfg.settings,
      react: {
        version: '19.0',
      },
      next: {
        rootDir: ['apps/web/', './'],
      },
    },
  })),
  ...nextTs.map((cfg) => ({
    ...cfg,
    files: ['apps/web/src/**/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],
  })),
  {
    name: 'web-custom',
    files: ['apps/web/src/**/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...sharedRules,
      ...prettierConfig.rules,
    },
  },
]);
