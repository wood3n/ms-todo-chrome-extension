/** @type {import('stylelint').Config} */
export default {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order", "stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": ["width", "height"],
    "block-no-empty": true,
    "color-hex-length": "short",
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["extends", "tailwind"],
      },
    ],
  },
};
