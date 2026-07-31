import nextConfig from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

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
  prettierConfig,
]

export default eslintConfig
