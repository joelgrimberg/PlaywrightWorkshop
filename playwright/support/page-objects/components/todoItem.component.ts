import type { Locator, Page } from "@playwright/test";

export class TodoItemComponent {
  private page: Page;
  private component: Locator;
  private parentLocator: Locator;

  constructor(page: Page, parentLocator: Locator) {
    this.page = page;
    this.parentLocator = parentLocator;
    this.component = this.parentLocator.getByTestId("TodoItem");
  }

  async getTodos(): Promise<Locator> {
    return this.component.locator("ul > li");
  }

  async getTodo(id: string): Promise<Locator> {
    return this.page.locator(`[data-testid="TodoItem"][id="${id}"]`);
  }

  async editTodo(id: string): Promise<void> {
    const todo = await this.getTodo(id);
    await todo.getByRole("button", { name: "Edit" }).click();
  }

  async deleteTodo(id: string): Promise<void> {
    const todo = await this.getTodo(id);
    await todo.getByRole("button", { name: "Delete" }).click();
  }
}
