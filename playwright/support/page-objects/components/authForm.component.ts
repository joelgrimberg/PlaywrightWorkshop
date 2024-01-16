import type { Locator, Page } from "@playwright/test";

export class AuthForm {
  private page: Page;
  private component: Locator;
  email: Locator;
  password: Locator;
  submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = this.page.locator("form");
    this.email = this.component.getByRole("textbox", { name: "Email" });
    this.password = this.component.getByRole("textbox", { name: "Password" });
    this.submit = this.component.getByRole("button", { name: "Sign In" });
  }

  async fillUsername(username: string) {
    await this.email.fill(username);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async clickSubmitButton() {
    await this.submit.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmitButton();
  }
}
