module.exports = {
  extends: [
    'next/core-web-vitals',
    'next/typescript'
  ],
  rules: {
    // Disable unused variables warning
    '@typescript-eslint/no-unused-vars': 'off',
    // Disable explicit any warning  
    '@typescript-eslint/no-explicit-any': 'off',
    // Disable exhaustive deps warning
    'react-hooks/exhaustive-deps': 'off',
    // Disable other common issues
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 'off',
    // Disable import order warnings
    '@typescript-eslint/no-unused-expressions': 'off',
    // Disable console warnings
    'no-console': 'off',
  }
} 