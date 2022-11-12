module.exports = {
  extends: ['next', 'next/core-web-vitals', 'smarthr'],
  plugins: ['import'],
  rules: {
    'storybook/prefer-pascal-case': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'smarthr/prohibit-import': 'off',
    'smarthr/require-barrel-import': 'off',
    '@next/next/no-html-link-for-pages': ['error', './src/pages/'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'import/no-duplicates': ['error'],
    'import/no-useless-path-segments': ['error'],
    'smarthr/a11y-clickable-element-has-text': 'warn',
    'smarthr/a11y-image-has-alt-attribute': 'warn',
    'smarthr/a11y-trigger-has-button': 'error',
    'smarthr/best-practice-for-date': 'error',
    'smarthr/prohibit-export-array-type': 'error',
    'smarthr/jsx-start-with-spread-attributes': [
      'error',
      {
        fix: false,
      },
    ],
    'smarthr/a11y-prohibit-input-placeholder': 'error',
  },
}
