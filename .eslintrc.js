module.exports = {
  extends: ['@mpxjs/eslint-config-ts'],
  env: {
    jest: true // 解决eslint报错：'describe' is not defined. eslint (no-undef)
  },
  rules: {
    // .mpx文件规则 https://mpx-ecology.github.io/eslint-plugin-mpx/rules/
    'space-before-function-paren': 0,
    'mpx/valid-component-range': 0,
    'mpx/valid-wx-key': 0
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // .ts文件规则 https://typescript-eslint.io/rules/
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['**/*.js'],
      rules: {
        // .js文件规则 https://eslint.bootcss.com/docs/rules/
      }
    }
  ]
}
