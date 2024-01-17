import { test as baseTest } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { AuthPage } from "./pages/auth.page";
import { NewTodoPage } from "./pages/newTodo.page";
import { UpdateTodoPage } from "./pages/updateTodo.page";

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
