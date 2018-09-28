/*

# eslint

http://eslint.org
https://prettier.io
https://github.com/prettier/eslint-plugin-prettier
https://github.com/prettier/eslint-config-prettier

*/

let opts = {
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2015
  },
  rules: {
    "no-console": [0],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "prettier/prettier": "error"
  },
  globals: {
    describe: true,
    it: true,
    xit: true,
    should: true
  }
}

module.exports = opts
