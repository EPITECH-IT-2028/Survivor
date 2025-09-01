import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        "entryPoint": "app/globals.css",
      }
    },
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/enforce-consistent-class-order": "warn",
      "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
      "better-tailwindcss/enforce-consistent-important-position": "warn",
      "better-tailwindcss/enforce-shorthand-classes": "warn",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-deprecated-classes": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",

      "better-tailwindcss/no-unregistered-classes": "off",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-restricted-classes": "off",
    },
  },
];

export default eslintConfig;

