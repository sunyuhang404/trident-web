/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const INLINE_ELEMENTS = require('eslint-plugin-vue/lib/utils/html-elements.json');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript'
    // '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'vue', //
    'prettier',
    'eslint-plugin-vue',
    'html'
  ],
  rules: {
    // 'prettier/prettier': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'eol-last': 'error',
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],

    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 3
      }
    ],
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: true
      }
    ],
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false
      }
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true
      }
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
        allowMultiplePropertiesPerLine: true
      }
    ],
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],

    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,

    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止空语句块
    'no-empty': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号 //(a * b) + c;//报错
    'no-extra-parens': 0,

    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格

    // 禁止或强制在单行代码块中使用空格(禁用)
    'block-spacing': [1, 'never'],

    // 控制逗号前后的空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],

    // vue 配置
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true
      }
    ],

    'vue/no-unused-vars': [
      'error',
      {
        ignorePattern: '^_'
      }
    ],

    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below'
      }
    ],

    // 闭合标签换行
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],

    // 自闭合标签配置，需要写 /
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],

    // 多行html内容独占一行
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea']
      }
    ],

    // 单行html内容，独占一行
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: [...INLINE_ELEMENTS]
      }
    ],

    'vue/no-unused-properties': [
      'error',
      {
        groups: ['props'],
        deepData: false,
        ignorePublicMembers: false
      }
    ],

    'vue/no-unused-refs': 'error',

    'vue/this-in-template': ['error'],

    // 属性换行配置
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1
        }
      }
    ],
    // 格式对齐配置
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: []
      }
    ],

    // 双花括号和内容之间需要有空格
    'vue/mustache-interpolation-spacing': ['error', 'always'],

    // 空格不允许有多个
    'vue/no-multi-spaces': ['error'],

    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],

    'no-var': ['error'],
    'no-const-assign': ['error'],

    'object-shorthand': ['error'],

    // typescript
    // 允许 any
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
