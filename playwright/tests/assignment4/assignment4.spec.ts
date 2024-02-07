import { test } from "../../support/fixtures/test.fixture";
import { expect } from "@playwright/test";
import type { todo } from "../../support/helpers/generator";

let generatedTodo: todo;
let todoId: string;

test("Assignment 4", async ({ page, newTodo, generator, home }) => {
  await test.step("Generate new todo", async () => {
    generatedTodo = generator.generateTodo();
  });

  await test.step("Open Todo app", async () => {
    await page.goto("/");
    await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
  });

  await test.step("Create new todo", async () => {
    todoId = await newTodo.createNewTodo(
      generatedTodo.title,
      generatedTodo.priority
    );
  });

  await test.step("Verify todo is created", async () => {
    await expect(
      await home.todoContainer.todoItemComponent.getTodo(todoId)
    ).toHaveText(generatedTodo.title);
  });

  await test.step("Delete todo", async () => {
    await home.todoContainer.todoItemComponent.deleteTodo(todoId);
  });

  await test.step("Verify todo is deleted", async () => {
    await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
  });
});
