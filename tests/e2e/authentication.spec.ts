import { expect, Locator, Page, test } from "@playwright/test";

test("Sign up and sign in", async ({ page }) => {
  await page.goto("/login");

  await getEmailInputLocator(page).fill("test@example.com");
  await getPasswordInputLocator(page).fill("test123");
  await getSignUpButton(page).click();
  await getSignInButton(page).click();

  await page.waitForURL("/profile/edit");

  await getFirstNameInput(page).fill("First");
  await getLastNameInput(page).fill("Last");
});

const getEmailInputLocator = (page: Page): Locator =>
  page.getByLabel("Email *");
const getPasswordInputLocator = (page: Page): Locator =>
  page.getByLabel("Password *");
const getSignInButton = (page: Page): Locator =>
  page.getByRole("button", { name: "Sign in" });
const getSignUpButton = (page: Page): Locator =>
  page.getByRole("button", { name: "Sign up" });

const getFirstNameInput = (page: Page): Locator =>
  page.getByLabel("First Name *");
const getLastNameInput = (page: Page): Locator =>
  page.getByLabel("Last Name *");
