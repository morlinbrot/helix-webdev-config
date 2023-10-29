module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier", // This disables rules in presets that conflict with prettier (or other formatters).
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true, // Find the closest tsconfig.json for each source file.
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  root: true,
};
