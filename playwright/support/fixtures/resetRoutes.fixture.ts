import { test as base } from "@playwright/test";

const response: any = global;
const user: any = global;

export const test = base.extend<{ resetRoutes: void }>({
  resetRoutes: [
    async ({ page }, use: any): Promise<any> => {
      await use();
      await page.unrouteAll();
    },
    { auto: true },
  ], // starts automatically for every test - we pass "auto" for that.
});

export { expect } from "@playwright/test";
