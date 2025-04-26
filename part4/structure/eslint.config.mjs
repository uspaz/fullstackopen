import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin-js";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { 
      js,
      stylistic
    }, 
    extends: ["js/recommended"],
    languageOptions: { 
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "stylistic/indent": ["error", 4],
      "stylistic/linebreak-style": ["error", "windows"],
      "stylistic/quotes": ["error", "double"],
      "stylistic/semi": ["error", "never"],
      "no-console": ["error", { allow: ["warn", "error", "info"] }]
  },
  },
  {
    ignores: [
      "dist/"
    ]
  }
  
]);