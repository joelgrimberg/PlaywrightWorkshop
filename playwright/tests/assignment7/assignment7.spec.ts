import { test } from "../../support/fixtures/test.fixture";
import { expect } from "@playwright/test";
import type { todo } from "../../support/helpers/generator";
import AxeBuilder from "@axe-core/playwright"; // 1

let firstTodo: todo;
let secondTodo: todo;
let thirdTodo: todo;

test("Assignment 7", async ({ page, newTodo, generator }) => {
  await test.step("Generate new todo", async () => {
    firstTodo = generator.generateTodo();
    secondTodo = generator.generateTodo();
    thirdTodo = generator.generateTodo();
  });

  await test.step("Open Todo app", async () => {
    await page.goto("/");
    await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
  });

  await test.step("Create new todos", async () => {
    await newTodo.createNewTodo(firstTodo.title, firstTodo.priority);
    await newTodo.createNewTodo(secondTodo.title, secondTodo.priority);
    await newTodo.createNewTodo(thirdTodo.title, thirdTodo.priority);
  });

  await test.step("Run Axe accesability scan", async () => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4
    console.log(accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});
