/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:n/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "no-type-assertion"],
  root: true,
  rules: {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "no-console": "warn",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            // Mantine should only be imported within components folder and a few other exceptions.
            target: [
              "./src/!(theme.ts)",
              "./src/!(components|app/layout.tsx|hooks/useColorScheme.ts)/**",
            ],
            from: "./node_modules/@mantine/core",
          },
          {
            // Implementation of injection should only be imported into injection files.
            target: [
              "./src/!(services)",
              "./src/!(services)/**",
              "./src/services/**/!(injection.ts|*Impl.test.ts)",
            ],
            from: "./src/services/**/*Impl.ts",
          },
          {
            // Non e2e files cannot import from e2e files
            target: ["./src/!(e2e)", "./src/!(e2e)/**"],
            from: "./src/e2e/**",
          },
          {
            // Storybook utils can only be imported within storybook files
            target: ["./src/**/!(*.stories.tsx)"],
            from: "./src/storybook-utils/**",
          },
        ],
      },
    ],
    "import/order": "error",
    "n/no-missing-import": "off", // Does not recognise the @ shortcut.
    "n/no-process-env": "error", // only environment.ts can access process.env
    "no-type-assertion/no-type-assertion": "error",
  },
  overrides: [
    {
      // only environment.ts can access process.env
      files: ["./src/services/envService/envServiceImpl.ts"],
      rules: {
        "n/no-process-env": "off",
      },
    },
    {
      files: ["./src/**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-type-assertion/no-type-assertion": "off",
      },
    },
  ],
};
