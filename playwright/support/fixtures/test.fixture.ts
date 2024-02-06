import { mergeTests } from "@playwright/test";
import { test as helpers } from "./helpers.fixture";
import { test as pageObjects } from "./pageObjects.fixture";
import { test as resetRoutes } from "./resetRoutes.fixture";

export const test = mergeTests(helpers, pageObjects, resetRoutes);
