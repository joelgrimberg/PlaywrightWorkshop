import type { Locator, Page } from "@playwright/test";

export class NavPage {
  private readonly page: Page;
  private component: Locator;
  private signIn: Locator;
  private signOut: Locator;
  private newTodo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = this.page.locator("nav");
    this.signIn = this.component.getByRole("button", { name: "Sign In" });
    this.signOut = this.component.getByRole("button", { name: "Sign Out" });
    this.newTodo = this.component.getByRole("button", { name: "New Todo" });
  }

  public async clickSignIn(): Promise<void> {
    await this.signIn.click();
  }

  public async clickNewTodo(): Promise<void> {
    await this.newTodo.click();
  }

  public async clickLogout(): Promise<void> {
    await this.signOut.click();
  }
}
