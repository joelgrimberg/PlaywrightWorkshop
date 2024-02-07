import { defineConfig, devices } from "@playwright/test";
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright/tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    // headless: !!process.env.CI,
    headless: false,
  },
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "assignment1",
      testDir: "./playwright/tests/assignment1",
    },
    {
      name: "assignment2",
      testDir: "./playwright/tests/assignment2",
    },
    {
      name: "assignment3",
      testDir: "./playwright/tests/assignment3",
      dependencies: ["setup"],
      use: {
        storageState: "playwright/.auth/user.json",
      },
    },
    {
      name: "assignment4",
      testDir: "./playwright/tests/assignment4",
      dependencies: ["setup"],
      use: {
        storageState: "playwright/.auth/user.json",
      },
    },
    {
      name: "assignment5",
      testDir: "./playwright/tests/assignment5",
    },
    {
      name: "assignment6",
      testDir: "./playwright/tests/assignment6",
    },
    {
      name: "assignment7",
      testDir: "./playwright/tests/assignment7",
      dependencies: ["setup"],
      use: {
        storageState: "playwright/.auth/user.json",
      },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
