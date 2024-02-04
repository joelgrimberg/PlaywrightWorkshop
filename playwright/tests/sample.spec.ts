import { HomePage } from "@/test/pages/home.page";
import { NewTodoPage } from "@/test/pages/newTodo.page";
import { UpdateTodoPage } from "@/test/pages/updateTodo.page";
import { test, expect } from "@playwright/test";

test("create Todo", async ({ page }) => {
  const homePage = new HomePage(page);
  const newTodoPage = new NewTodoPage(page);

  await page.goto("/");
  await homePage.authComponent.login("test@test.nl", "test");
  const createdTodo = await newTodoPage.createNewTodo("test1234", "Important");
  await expect(
    await homePage.todoContainer.todoItemComponent.getTodo(createdTodo.id)
  ).toHaveText("test1234");
});

test("update Todo", async ({ page }) => {
  const homePage = new HomePage(page);
  const newTodoPage = new NewTodoPage(page);
  const updateTodoPage = new UpdateTodoPage(page);

  await page.goto("/");
  await homePage.authComponent.login("test@test.nl", "test");
  const createdTodo = await newTodoPage.createNewTodo("test57890", "Important");
  await homePage.todoContainer.todoItemComponent.editTodo(createdTodo.id);
  await updateTodoPage.updateTodoDetails(
    createdTodo.id,
    "Ghislain",
    "Not Important"
  );
  await expect(
    await homePage.todoContainer.todoItemComponent.getTodo(createdTodo.id)
  ).toHaveText("Ghislain");
});

test("delete Todo", async ({ page }) => {
  const homePage = new HomePage(page);
  const newTodoPage = new NewTodoPage(page);

  await page.goto("/");
  await homePage.authComponent.login("test@test.nl", "test");
  const createdTodo = await newTodoPage.createNewTodo("test57890", "Important");
  await homePage.todoContainer.todoItemComponent.deleteTodo(createdTodo.id);
  await expect(
    await homePage.todoContainer.todoItemComponent.getTodo(createdTodo.id)
  ).not.toBeVisible();
});
