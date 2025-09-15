import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import lintRules from './lint-rules/index.js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: [
      'vite.config.mts',
      '**/node_modules/*',
      '.git/',
      'build/**',
      'lint-rules/**',
      'public/**',
      'tailwind.config.ts',
      '**/docs/assets/**',
      '**/services/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ...react.configs.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
    },
  },
  {
    languageOptions: { globals: globals.node },
    plugins: {
      local: lintRules,
    },
    rules: {
      // 'local/no-bang-after-variable': 'error',
      'local/jsx-inline-style-check': 'error',
      // 'no-console': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      'max-lines': ['error', { max: 1500, skipBlankLines: false, skipComments: false }],
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
];
