// eslint.config.js
// const { defineConfig }= require('eslint-define-config';
// const js= require('@eslint/js';
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginTypeScript = require('@typescript-eslint/eslint-plugin');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginStylistic = require("@stylistic/eslint-plugin");
const eslintPlugImport = require("eslint-plugin-import");
const eslintPluginN = require("eslint-plugin-n");
const eslintPluginPromise = require("eslint-plugin-promise");
const TypescriptEslintParser = require('@typescript-eslint/parser');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const stylisticEslintPlugin = require('@stylistic/eslint-plugin');
// const stylisticTs = require('@stylistic/eslint-plugin-ts');
module.exports = {


  languageOptions: {
    ecmaVersion: 'latest', // Версия ECMAScript
    sourceType: 'module', // Использование модулей
    globals: {
      browser: true, // Глобальные переменные браузера
      // node: true, // Глобальные переменные Node.js
      // browser: true,
      commonjs: true,
      es2021: true,
    },
    parser: TypescriptEslintParser, // Парсер для TypeScript
    parserOptions: {
      project: ['./tsconfig.json'],
      ecmaVersion: 2022, //'latest',
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true,
        tsx: true,
      },
    },
  },

  plugins: {

    'react': eslintPluginReact,
    prettier: eslintPluginPrettier,
    promise: eslintPluginPromise,
    'react-hooks': eslintPluginReactHooks,
    '@typescript-eslint': eslintPluginTypeScript,
    '@stylistic': eslintPluginStylistic,
    'import': eslintPlugImport,
    'eslintpluginn': eslintPluginN,

    // '@stylistic/js': js,
    // '@stylistic/eslint-plugin-ts': stylisticEslintPluginTS,
    // '@stylistic/jsx',
    '@stylistic/eslint-plugin-plus': stylisticEslintPlugin,
  // '@stylistic/ts': stylisticTs,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
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
    // '@stylistic/ts/indent': ['error', 2],
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
    // '@stylistic/ts/member-delimiter-style': [
    //   'error', {
    //     multiline: {
    //       delimiter: 'none', // Options are ',' or ';'
    //       requireLast: false, // Last line
    //     },
    //   },
    // ],

  defaultParamLast: 'off',
  '@typescript-eslint/default-param-last': 'off',

  '@typescript-eslint/prefer-nullish-coalescing': 'off', //["error", { ignoreTernaryTests: true }]
},
  ignores: [
  "webpack.config.js",
  "postcss.config.js",
  "/*eslintrc.js",
  "/src/index.ts",
  "babel.config.js",
  "dist/",
  "src/**/interfaces.ts",
  "src/index.ts",
    "src/frontend/index.*",
    "*.js"
],
};
