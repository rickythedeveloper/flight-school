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
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: [
              "./src/!(app|theme.ts)",
              "./src/app/!(layout.tsx|components)",
              "./src/app/!(components)/**",
            ],
            from: "./node_modules/@mantine/core",
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
      files: ["./src/utils/environment/environment.ts"],
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
