module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'tailwindcss'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    tailwindcss: {
      // white list all custom colors here!
      // white list aspect-ratio plugin classnames
      whitelist: [
        '(text|bg|border|ring|ring-offset|divide|from|via|to)\\-(red|blue|light|dark)',
        'aspect\\-(h|w)\\-[1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|none]',
      ],
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'tailwindcss/classnames-order': 'off',
  },
};
