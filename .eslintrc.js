module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": [
      "error",
      "single",
      { "avoidEscape": true, "allowTemplateLiterals": true }
    ],
    "prettier/prettier": ["error", {singleQuote: true, trailingComma: 'es5' }]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
