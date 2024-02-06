import path from "path";
import { test } from "../../support/fixtures/test.fixture";
import { expect } from "@playwright/test";

test("Assignment 5A", async ({ page }) => {
  await test.step("Open Todo app", async () => {
    await page.goto("/");
  });
  await test.step("Should match screenshot", async () => {
    await expect(page).toHaveScreenshot({ mask: [page.getByAltText("Gibli")] });
  });
});

/*
Use the display: none; property. This will completely hide the image from the user.
Use the visibility: hidden; property. This will hide the image from the user, but it will still take up space on the page.
*/

test("Assignment 5B", async ({ page }) => {
  await test.step("Open Todo app", async () => {
    await page.goto("/");
  });
  await test.step("Should match screenshot", async () => {
    await expect(page).toHaveScreenshot("test5b.png", {
      stylePath: path.join(__dirname, "mask.css"),
    });
  });
});
//https://github.com/microsoft/playwright/issues/29249 need to add file name for screenshot
