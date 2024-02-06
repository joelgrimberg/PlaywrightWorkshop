import { AccountGenerator } from "@/test/fixtures/accountGenerator.fixture";
import { expect, test } from "../../support/fixtures/resetRoutes.fixture";

const authFile = "playwright/.auth/user.json";

test("Assignment 3", async ({ page }) => {
  const generator = new AccountGenerator();
  const user = generator.createRandomUser();

  await page.goto(
    "http://localhost:3000/auth?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
  await page.context().storageState({ path: authFile });
});
