module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:flowtype/recommended",
    "prettier",
    "prettier/flowtype"
  ],
  plugins: ["flowtype", "jest"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "eol-last": 2
  }
};

