import { expect } from "@playwright/test";
import { signedInTest as test } from "@/e2e/fixtures/signedInTest";

test("Go to profile page and edit", async ({ page, profilePage }) => {
  await profilePage.waitForPage();

  await expect(page.getByRole("button", { name: "Edit" })).toBeVisible();
});
