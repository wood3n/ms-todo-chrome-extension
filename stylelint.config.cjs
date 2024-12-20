/** @type {import('stylelint').Config} */
module.exports = {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-order"],
  rules: {
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
