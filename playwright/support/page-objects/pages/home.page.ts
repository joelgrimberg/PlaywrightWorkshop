import { Page } from "playwright";
import { AuthFormComponent } from "../components/authForm.component";
import { NavComponent } from "../components/nav.component";
import { TodoContainerComponent } from "../components/todoContainer.component";

export class HomePage {
  private page: Page;
  public authComponent: AuthFormComponent;
  public nav: NavComponent;
  public todoContainer: TodoContainerComponent;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavComponent(this.page);
    this.authComponent = new AuthFormComponent(this.page);
    this.todoContainer = new TodoContainerComponent(this.page);
  }
}
