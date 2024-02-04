import { NavComponent } from "../components/nav.component";
import type { Locator, Page } from "@playwright/test";

export class UpdateTodoPage {
  private page: Page;
  public nav: NavComponent;
  private updateTodoPage: Locator;
  private title: Locator;
  private importance: Locator;
  private cancel: Locator;
  private update: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavComponent(this.page);
    this.updateTodoPage = this.page.getByTestId("update-todo-page");
    this.title = this.updateTodoPage.getByRole("textbox", { name: "Title" });
    this.importance = this.updateTodoPage.getByRole("combobox", {
      name: "Importance",
    });
    this.cancel = this.updateTodoPage.getByRole("button", { name: "Cancel" });
    this.update = this.updateTodoPage.getByRole("button", { name: "Update" });
  }

  async updateTodoDetails(
    id: string,
    title: string,
    importance = "Important" || "Not Important"
  ) {
    await this.title.fill(title);
    await this.importance.selectOption({ label: importance });
    const responsePromise = this.page.waitForResponse(
      (resp) => resp.url().includes(`/api/todos/${id}`) && resp.status() === 201
    );
    await this.update.click();
    const response = await (await responsePromise).json();
    return response;
  }
}
