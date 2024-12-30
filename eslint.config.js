// eslint.config.js
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
  ],
  overrides: [],
  plugins: [
    'react',
    'react-hooks',
    'eslint-plugin-react',
    '@typescript-eslint',
    '@stylistic',
    '@stylistic/js',
    '@stylistic/eslint-plugin-ts',
    '@stylistic/jsx',
    '@stylistic/eslint-plugin-plus',
    '@stylistic/ts',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    quotes: 'off',
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', {
      ignoreTypeValueShadow: true,
      ignoreFunctionTypeParameterNameValueShadow: true,
    }],
    '@typescript-eslint/space-before-function-paren': 'off',
    '@stylistic/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
    }],
    'no-new': 'off',
    'no-new-wrappers': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/semi': 'off',
    '@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: false }],
    'semi-spacing': ['error', { before: false, after: true }],
    '@stylistic/semi-style': ['error', 'last'],
    '@typescript-eslint/semi': 'off',
    'react/display-name': 'off',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false, ignoreRestArgs: true }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    "no-unused-vars": 'off',
  '@typescript-eslint/await-thenable': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',

  // TypeScript - три разделителя между элементами в интерфейсах и псевдонимах типов
  '@stylistic/ts/member-delimiter-style': [
    'error', {
      multiline: {
        delimiter: 'none', // Options are ',' or ';'
        requireLast: false, // Last line
      },
    },
  ],

  defaultParamLast: 'off',
  '@typescript-eslint/default-param-last': 'off',

  '@typescript-eslint/prefer-nullish-coalescing': 'off', //["error", { ignoreTernaryTests: true }]
},
  ignorePatterns: [
  "webpack.config.js",
  "postcss.config.js",
  "/*eslintrc.js",
  "/src/index.ts",
  "babel.config.js",
  "dist/",
  "src/**/interfaces.ts",
  "src/index.ts",
  "src/frontend/index.*"
],
});
