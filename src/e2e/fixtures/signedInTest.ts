import { generateRandomString } from "@/e2e/utils/generateRandomString";
import { testWithPages } from "@/e2e/fixtures/testWithPages";
import { LoginPage } from "@/e2e/pages/LoginPage";
import { ProfileEditPage } from "@/e2e/pages/ProfileEditPage";
import { ProfilePage } from "@/e2e/pages/ProfilePage";
import { pathService } from "@/services/pathService/injection";

export const signedInTest = testWithPages.extend({
  page: async ({ page }, use) => {
    await page.goto(pathService.login.url);

    const loginPage = new LoginPage(page);
    await loginPage.waitForPage();

    const email = `test-${generateRandomString()}@example.com`;

    await loginPage.fillEmail(email);
    await loginPage.fillPassword("test123");
    await loginPage.clickSignUp();
    await loginPage.clickSignIn();

    const profileEditPage = new ProfileEditPage(page);
    await profileEditPage.waitForPage();

    await profileEditPage.fillFirstName("First");
    await profileEditPage.fillLastName("Last");
    await profileEditPage.clickSave();

    const profilePage = new ProfilePage(page);
    await profilePage.waitForPage();

    await use(page);
  },
});
