module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'next/typescript',
  ],
  rules: {
    'prefer-const': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: ['.next', 'node_modules', '*.d.ts'],
};
