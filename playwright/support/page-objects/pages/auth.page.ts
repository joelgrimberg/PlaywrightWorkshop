import { Page } from "playwright";
import { AuthFormComponent } from "../components/authForm.component";
import { NavComponent } from "../components/nav.component";

export class AuthPage {
  private page: Page;
  public authComponent: AuthFormComponent;
  public nav: NavComponent;

  constructor(page: Page) {
    this.page = page;
    this.nav = new NavComponent(this.page);
    this.authComponent = new AuthFormComponent(this.page);
  }
}
