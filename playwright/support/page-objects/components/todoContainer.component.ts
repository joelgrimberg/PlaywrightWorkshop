import type { Page, Locator } from "@playwright/test";
import { TodoItemComponent } from "./todoItem.component";

export class TodoContainerComponent {
  private readonly page: Page;
  private component: Locator;
  public todoItemComponent: TodoItemComponent;

  constructor(page: Page) {
    this.page = page;
    this.component = this.page.getByTestId("TodoList");
    this.todoItemComponent = new TodoItemComponent(this.page, this.component);
  }
}
