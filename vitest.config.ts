import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/routeTree.gen.ts", "src/db/migrations/**"],
    },
    exclude: ["e2e/**", "node_modules/**"],
  },
});
