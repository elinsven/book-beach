import { firefox, test } from "@playwright/test";
import { addDays, format, nextDay } from "date-fns";

test("book beach thursday", async () => {
  // Setup
  const browser = await firefox.launch({
    headless: false,
    args: [
      "--enable-webgl",
      "--use-gl=swiftshader",
      "--enable-accelerated-2d-canvas",
    ],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
    timezoneId: "America/New_York",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  });
  const page = await context.newPage();
  const getRandomDelay = () => Math.random() * (200 - 50) + 50;
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  await page.goto("https://iksu.goactivebooking.com/login");

  // Accept cookies
  await page
    .getByTestId("cookie-consent-modal-allow-all-button")
    .click({ delay: getRandomDelay() });

  // Email
  const emailInput = page.getByTestId("login-username-input");
  await emailInput.click({ delay: getRandomDelay() });
  await emailInput.fill(email as string);

  // Password
  const passwordInput = page.getByTestId("login-password-input");
  await passwordInput.click({ delay: getRandomDelay() });
  await passwordInput.fill(password as string);

  // Login
  await page.getByTestId("login-button").click({ delay: getRandomDelay() });

  // Close browser
  await browser.close();
});
