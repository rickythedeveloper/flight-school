import type { Page } from "@playwright/test";
import { pathService } from "@/services/pathService/injection";
import type { BasePage } from "@/e2e/pages/BasePage";

export class ProfilePage implements BasePage {
  constructor(private page: Page) {}

  waitForPage = async (): Promise<void> => {
    await this.page.waitForURL(pathService.profile.url);
  };
}
