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
      "@typescript-eslint/explicit-member-accessibility": "error",

      "@typescript-eslint/member-ordering": [
        "warn",
        {
          default: {
            memberTypes: [
              // Static fields
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "static-field",

              // Static methods
              "public-static-method",
              "protected-static-method",
              "private-static-method",
              "static-method",

              // Field
              "public-field",
              "protected-field",
              "private-field",
              "field",

              // Constructor
              "constructor",

              // Methods
              "public-method",
              "protected-method",
              "private-method",
              "method",

              // Getters / setters
              "get",
              "set"
            ]
          }
        }
      ],

      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: 'variableLike',
          format: [ 'camelCase' ]
        },

        {
          selector: 'property',
          format: [ 'camelCase' ],
          leadingUnderscore: 'allow'
        },

        {
          selector: 'property',
          modifiers: [ 'static' ],
          format: [ 'camelCase', 'UPPER_CASE' ]
        },

        {
          selector: 'property',
          modifiers: [ 'static', 'public' ],
          format: [ 'UPPER_CASE' ]
        },

        {
          selector: 'method',
          format: [ 'camelCase' ]
        },

        {
          selector: 'classicAccessor',
          format: [ 'camelCase' ]
        },

        {
          selector: 'typeLike',
          format: [ 'PascalCase' ]
        },

        {
          selector: 'enumMember',
          format: [ 'UPPER_CASE' ]
        }
      ],

      "@typescript-eslint/no-array-delete": "error",
      "@typescript-eslint/no-base-to-string": "warn"
    }
  }
];