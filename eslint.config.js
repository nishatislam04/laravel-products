import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import typescript from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"], // Required for React 17+
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "import/order": "off", // avoid fighting Prettier
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      // typescript stricter rules
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: true, // makes TS paths from tsconfig.json work
      },
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "off",
    },
  },

  {
    ignores: ["vendor", "node_modules", "public", "bootstrap/ssr", "tailwind.config.js"],
  },
  prettier, // Turn off all rules that might conflict with Prettier
];
