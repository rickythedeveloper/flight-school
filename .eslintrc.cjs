/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:n/recommended",
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
    "n/no-missing-import": "off", // Does not recognise the @ shortcut.
    "n/no-process-env": "error", // only environment.ts can access process.env
  },
  overrides: [
    {
      // only environment.ts can access process.env
      files: ["./src/utils/environment/environment.ts"],
      rules: {
        "n/no-process-env": "off",
      },
    },
  ],
};
