import { test as baseTest } from "@playwright/test";
import { Generator } from "../helpers/generator";

export const test = baseTest.extend<{
  generator: Generator;
}>({
  generator: async ({}, use) => {
    await use(new Generator());
  },
});
