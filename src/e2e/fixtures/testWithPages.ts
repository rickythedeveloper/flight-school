import { test } from "@playwright/test";
import { ProfilePage } from "@/e2e/pages/ProfilePage";
import { LoginPage } from "@/e2e/pages/LoginPage";
import { ProfileEditPage } from "@/e2e/pages/ProfileEditPage";

export const testWithPages = test.extend<{
  loginPage: LoginPage;
  profilePage: ProfilePage;
  profileEditPage: ProfileEditPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  profileEditPage: async ({ page }, use) => {
    await use(new ProfileEditPage(page));
  },
});
