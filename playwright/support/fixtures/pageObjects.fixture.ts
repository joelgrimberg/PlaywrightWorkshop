import { test as baseTest } from "@playwright/test";
import { HomePage } from "../page-objects/pages/home.page";
import { AuthPage } from "../page-objects/pages/auth.page";
import { NewTodoPage } from "../page-objects/pages/newTodo.page";
import { UpdateTodoPage } from "../page-objects/pages/updateTodo.page";

export const test = baseTest.extend<{
  home: HomePage;
  auth: AuthPage;
  newTodo: NewTodoPage;
  updateTodo: UpdateTodoPage;
}>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  auth: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  newTodo: async ({ page }, use) => {
    await use(new NewTodoPage(page));
  },
  updateTodo: async ({ page }, use) => {
    await use(new UpdateTodoPage(page));
  },
});
