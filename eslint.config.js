import antfu from "@antfu/eslint-config";

export default antfu({
  formatters: {
    css: false,
    html: true,
    markdown: true,
  },
  typescript: true,
  react: true,
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
  rules: {
    "no-alert": 0,
    "no-console": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/method-signature-style": 0,
    "n/prefer-global/process": 0,
  },
});
