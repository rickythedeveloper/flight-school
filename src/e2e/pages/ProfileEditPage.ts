import type { Page, Locator } from "@playwright/test";
import { pathService } from "@/services/pathService/injection";
import type { BasePage } from "@/e2e/pages/BasePage";

export class ProfileEditPage implements BasePage {
  constructor(private page: Page) {}

  waitForPage = async (): Promise<void> => {
    await this.page.waitForURL(pathService.profile.edit.url);
  };

  fillFirstName = async (value: string): Promise<void> => {
    await this.getFirstNameInput().fill(value);
  };

  fillLastName = async (value: string): Promise<void> => {
    await this.getLastNameInput().fill(value);
  };

  clickSave = async (): Promise<void> => {
    await this.getSaveButton().click();
  };

  private getFirstNameInput = (): Locator =>
    this.page.getByLabel("First Name *");
  private getLastNameInput = (): Locator => this.page.getByLabel("Last Name *");
  private getSaveButton = (): Locator =>
    this.page.getByRole("button", { name: "Save" });
}
