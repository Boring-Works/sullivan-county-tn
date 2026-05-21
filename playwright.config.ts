import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  retries: 1,
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120000,
  },
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4173",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: "tablet",
      use: { ...devices["iPad Pro"], viewport: { width: 1024, height: 1366 } },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 14 Pro"], viewport: { width: 390, height: 844 } },
    },
  ],
});
