/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: [
              "./src/!(components|app|theme.ts)",
              "./src/app/!(layout.tsx)",
            ],
            from: "./node_modules/@mantine/core",
          },
        ],
      },
    ],
  },
};
