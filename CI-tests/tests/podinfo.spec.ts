import { test, expect } from "@playwright/test";

test("test button click on podinfo page", async ({ page }) => {
  await page.goto("https://podinfo.uds.dev");
  const button = page.locator('button:has-text("Ping")');
  const initialValue = await button.locator(".v-badge__badge").innerText();
  await button.click();

  const newValue = await button.locator(".v-badge__badge").innerText();

  // Note: playwright producing a different result almost every time when clicking the button more than once. Testing just a single click.
  console.log("Badge value + 1:", newValue?.trim());
  expect(parseInt(newValue)).toBe(parseInt(initialValue) + 1);
});
