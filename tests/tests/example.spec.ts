import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
  console.log("Cookies cleared before test.");
});

test("test", async ({ page }) => {
  await page.goto("https://podinfo.uds.dev/");

  const badgeValueText = await page
    .locator(".v-badge__badge.red span")
    .textContent();

  const badgeValueOrig: number = Number(badgeValueText?.trim());
  console.log("Original badge value:", badgeValueOrig);
  const incrementBadgeValue1 = badgeValueOrig + 1;
  const badgeValueString1: string = String(incrementBadgeValue1);
  const incrementBadgeValue2 = badgeValueOrig + 2;
  const badgeValueString2: string = String(incrementBadgeValue2);
  console.log("Badge value + 1:", badgeValueString1?.trim());
  console.log("Badge value + 2:", badgeValueString2?.trim());

  // await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Badge Ping" }).click();
  await page.getByRole("button", { name: "Badge Ping" }).click();
  const badgeValue = await page
    .locator(".v-badge__badge.red span")
    .textContent();

  //Log and assert the value
  console.log("Badge value after button:", badgeValue?.trim());
  expect(badgeValue?.trim()).toBe(badgeValueString1);

  // await page.getByRole("button", { name: "Badge Ping" }).click();
  // const badgeValue2 = await page
  //   .locator(".v-badge__badge.red span")
  //   .textContent();

  // // Log and assert the value
  // console.log("Badge value:", badgeValue2?.trim());
  // expect(badgeValue2?.trim()).toBe(badgeValueString1);

  // await page.reload();
  // await page.getByRole("button", { name: "Badge Ping" }).click();

  // const buttonText = await page
  //   .getByRole("button", { name: "Badge Ping" })
  //   .textContent();
  // console.log("Button text:", buttonText?.trim());
  // expect(buttonText?.trim()).toContain("touch_app0");

  // await page.getByRole("button", { name: "Badge Ping" }).click();
  // const buttonText2 = await page
  //   .getByRole("button", { name: "Badge Ping" })
  //   .textContent();
  // console.log("Button text:", buttonText2?.trim());
  // expect(buttonText2?.trim()).toContain("touch_app1");
});
