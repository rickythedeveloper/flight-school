import type { Page, Locator } from "@playwright/test";
import type { BasePage } from "@/e2e/pages/BasePage";
import { pathService } from "@/services/pathService/injection";

export class LoginPage implements BasePage {
  constructor(private page: Page) {}

  waitForPage = async (): Promise<void> => {
    await this.page.waitForURL(pathService.login.url);
  };

  fillEmail = async (value: string): Promise<void> => {
    await this.getEmailInputLocator().fill(value);
  };

  fillPassword = async (value: string): Promise<void> => {
    await this.getPasswordInputLocator().fill(value);
  };

  clickSignUp = async (): Promise<void> => {
    await this.getSignUpButton().click();
  };

  clickSignIn = async (): Promise<void> => {
    await this.getSignInButton().click();
  };

  private getEmailInputLocator = (): Locator => this.page.getByLabel("Email *");
  private getPasswordInputLocator = (): Locator =>
    this.page.getByLabel("Password *");
  private getSignInButton = (): Locator =>
    this.page.getByRole("button", { name: "Sign in" });
  private getSignUpButton = (): Locator =>
    this.page.getByRole("button", { name: "Sign up" });
}
