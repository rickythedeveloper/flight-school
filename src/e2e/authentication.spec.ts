import type { Locator, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { generateRandomString } from "./utils/generateRandomString";

test("Sign up and sign in", async ({ page }) => {
  await page.goto("/login");

  const email = `test-${generateRandomString()}@example.com`;

  await getEmailInputLocator(page).fill(email);
  await getPasswordInputLocator(page).fill("test123");
  await getSignUpButton(page).click();
  await getSignInButton(page).click();

  await page.waitForURL("/profile/edit");

  await getFirstNameInput(page).fill("First");
  await getLastNameInput(page).fill("Last");
  await getSaveButton(page).click();

  await page.waitForURL("/profile");

  await expect(page.getByText("First Last")).toBeVisible();
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
const getSaveButton = (page: Page): Locator =>
  page.getByRole("button", { name: "Save" });
