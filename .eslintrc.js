module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "eol-last": 2
  }
};
