import { firefox, test } from "@playwright/test";
import { addDays, format, nextDay } from "date-fns";

test("book beach monday", async () => {
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

  // Navigate to home
  await page.getByTestId("home-link").click({ delay: getRandomDelay() });

  // Navigate to sports
  await page
    .getByTestId("explore/web-category-card")
    .nth(4)
    .click({ delay: getRandomDelay() });

  // Navigate to beach
  await page
    .getByTestId("summary-card-banner-image")
    .nth(3)
    .click({ delay: getRandomDelay() });

  // Next button
  await page
    .getByTestId("services-calendar-next-button")
    .click({ delay: getRandomDelay() });

  // Find the next Monday and click
  const today = new Date();
  const nextMonday = nextDay(today, 4);
  const secondMonday = addDays(nextMonday, 7);
  const formattedDate = format(secondMonday, "EEEE d MMMM");
  const timeDiv = page
    .getByLabel(formattedDate)
    .first()
    .getByLabel("Start time, 7:00 PM")
    .first();

  await timeDiv.click({ delay: getRandomDelay() });

  // Add to cart
  await page
    .getByTestId("service-confirm-booking-modal-book-now-button")
    .click({ delay: getRandomDelay() });

  // Go to cart
  await page
    .getByTestId("added-to-cart-view-cart-button")
    .click({ delay: getRandomDelay() });

  // Go to checkout
  await page
    .getByTestId("my-cart-check-out-button")
    .click({ delay: getRandomDelay() });

  // Confirm
  await page
    .getByTestId("payment-confirm-confirm-button")
    .click({ delay: getRandomDelay() });

  // Close browser
  await browser.close();
});
