import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],

    plugins: {
      react,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'no-undef': 'error',
      'react/jsx-uses-vars': 'warn',

      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]