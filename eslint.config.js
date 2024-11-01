import eslintConfig from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";

export default eslintConfig(
  {
    languageOptions: {
      globals: {
        chrome: true,
      },
    },
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
      "no-unused-vars": 0,
      "unused-imports/no-unused-imports": "error",
      "antfu/top-level-function": 0,
      "react-hooks/exhaustive-deps": 0,
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          internalPattern: ["@/**"],
          groups: [
            "react",
            "type",
            ["builtin", "builtin-type"],
            ["external", "external-type"],
            ["internal", "internal-type"],
            ["index", "index-type", "sibling", "sibling-type", "parent", "parent-type"],
            "side-effect",
            ["style", "side-effect-style"],
            "object",
            "unknown",
          ],
          customGroups: {
            value: {
              react: ["react", "react-*", "typescript"],
            },
            type: {
              react: ["react", "react-*"],
            },
          },
        },
      ],
    },
  },
  tailwind.configs["flat/recommended"],
  {
    rules: {
      "tailwindcss/enforces-shorthand": "off",
    },
  },
);
