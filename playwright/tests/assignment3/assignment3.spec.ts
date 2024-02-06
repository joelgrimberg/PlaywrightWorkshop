import { test } from "../../support/fixtures/test.fixture";
import { expect } from "@playwright/test";

test("Assignment 3", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/auth?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
});
