import { NavComponent } from "../components/nav.component";
import type { Locator, Page } from "@playwright/test";

export class NewTodoPage {
  private page: Page;
  public nav: NavComponent;
  private newTodoPage: Locator;
  private title: Locator;
  private importance: Locator;
  private cancel: Locator;
  private create: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavComponent(this.page);
    this.newTodoPage = this.page.getByTestId("new-todo-page");
    this.title = this.newTodoPage.getByRole("textbox", { name: "Title" });
    this.importance = this.newTodoPage.getByRole("combobox", {
      name: "Importance",
    });
    this.cancel = this.newTodoPage.getByRole("button", { name: "Cancel" });
    this.create = this.newTodoPage.getByRole("button", { name: "Create" });
  }

  async createNewTodo(
    title: string,
    importance = "Important" || "Not Important"
  ): Promise<string> {
    await this.nav.clickNewTodo();
    await this.title.fill(title);
    await this.importance.selectOption({ label: importance });
    const responsePromise = this.page.waitForResponse(
      (resp) => resp.url().includes("/api/todos") && resp.status() === 201
    );
    await this.create.click();
    const response = await (await responsePromise).json();
    console.log(response);
    return response.id;
  }
}
