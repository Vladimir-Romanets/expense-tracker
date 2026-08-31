// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import nextConfig from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import boundariesPlugin from 'eslint-plugin-boundaries'

const eslintConfig = [
  ...nextConfig,
  {
    plugins: { tailwindcss: tailwindPlugin },
    rules: {
      ...tailwindPlugin.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'off',
    },
    settings: {
      tailwindcss: {
        cssFiles: ['src/app/globals.css'],
      },
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    plugins: { boundaries: boundariesPlugin },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/**', mode: 'file' },
        {
          type: 'features',
          pattern: 'src/features/*',
          mode: 'folder',
          capture: ['slice'],
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/*',
          mode: 'folder',
          capture: ['slice'],
        },
        { type: 'app', pattern: 'src/app/**', mode: 'file' },
      ],
    },
    rules: {
      // Layer hierarchy: shared < features < widgets < app. A layer may only
      // import from layers below it; imports within the same slice are exempt.
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'shared', allow: ['shared'] },
            { from: 'features', allow: ['shared'] },
            { from: 'widgets', allow: ['shared', 'features'] },
            { from: 'app', allow: ['shared', 'features', 'widgets', 'app'] },
          ],
        },
      ],
      // Cross-slice imports must go through a feature's/widget's index.ts barrel.
      'boundaries/entry-point': [
        'error',
        {
          default: 'allow',
          rules: [
            { target: 'features', allow: 'index.ts' },
            { target: 'widgets', allow: 'index.ts' },
          ],
        },
      ],
    },
  },
  prettierConfig,
  ...storybook.configs['flat/recommended'],
]

export default eslintConfig
