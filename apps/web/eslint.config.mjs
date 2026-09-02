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
        { type: 'shared', pattern: 'src/shared/**' },
        {
          type: 'features',
          pattern: 'src/features/*',
          capture: ['slice'],
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/*',
          capture: ['slice'],
        },
        { type: 'app', pattern: 'src/app/**' },
      ],
    },
    rules: {
      // Layer hierarchy: shared < features < widgets < app. A layer may only
      // import from layers below it; imports within the same slice are exempt.
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } },
            },
            {
              from: { element: { type: 'features' } },
              allow: { to: { element: { type: 'shared' } } },
            },
            {
              from: { element: { type: 'widgets' } },
              allow: { to: { element: { type: ['shared', 'features'] } } },
            },
            {
              from: { element: { type: 'app' } },
              allow: {
                to: { element: { type: ['shared', 'features', 'widgets', 'app'] } },
              },
            },
            // Cross-slice imports into features/widgets must go through their index.ts
            // barrel. Folded into this rule (not a separate boundaries/entry-point) because
            // that rule's `default: 'allow'` + allow-only policies can never actually reject
            // a non-barrel import: an unmatched `allow` falls through to the rule's own
            // default instead of failing, so it never reports anything.
            {
              from: { element: { type: ['widgets', 'app'] } },
              to: { element: { type: 'features' } },
              disallow: { to: { element: { fileInternalPath: '!index.ts' } } },
            },
            {
              from: { element: { type: 'app' } },
              to: { element: { type: 'widgets' } },
              disallow: { to: { element: { fileInternalPath: '!index.ts' } } },
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
  ...storybook.configs['flat/recommended'],
]

export default eslintConfig
