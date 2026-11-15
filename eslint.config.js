import tseslint from "typescript-eslint";

// Dependency direction: domain <- application <- infrastructure <- apps.
const forbid = (patterns, message) => ({
  "no-restricted-imports": ["error", { patterns: [{ group: patterns, message }] }],
});

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["src/domain/**/*.ts"],
    rules: forbid(["@application/*", "@infrastructure/*", "@apps/*"], "domain depends on nothing else"),
  },
  {
    files: ["src/application/**/*.ts"],
    rules: forbid(["@infrastructure/*", "@apps/*"], "application may only depend on domain"),
  },
  {
    files: ["src/infrastructure/**/*.ts"],
    rules: forbid(["@apps/*"], "infrastructure must not depend on apps"),
  },
);
