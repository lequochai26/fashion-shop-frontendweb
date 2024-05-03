import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    files: [ "src/**/*.ts", "src/**/*.tsx" ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      "@typescript-eslint/array-type": [ "warn", { default: "array" } ],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-types": "error",
      "class-methods-use-this": "off",
      "@typescript-eslint/class-methods-use-this": "warn",
      "@typescript-eslint/consistent-generic-constructors": [ "warn", "type-annotation" ],
      "@typescript-eslint/consistent-indexed-object-style": [ "warn", "index-signature" ],
      "@typescript-eslint/consistent-type-assertions": [ "error", { assertionStyle: "as", objectLiteralTypeAssertions: "never" } ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/consistent-type-definitions": [ "error", "interface" ],
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": "error"
    }
  }
];