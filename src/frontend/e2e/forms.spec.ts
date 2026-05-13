import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#lien-he');
    await page.waitForSelector('form', { timeout: 10000 });
    await page.waitForTimeout(300);
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();
    await expect(page.getByText(/vui lòng nhập họ tên/i)).toBeVisible();
    await expect(page.getByText(/số điện thoại không hợp lệ/i)).toBeVisible();
  });

  test('shows phone validation error for wrong format', async ({ page }) => {
    await page.locator('input[id="contact-phone"]').fill('1234567890');
    await page.locator('button[type="submit"]').first().click();
    await expect(page.getByText(/số điện thoại không hợp lệ/i)).toBeVisible();
  });

  test('successfully submits a valid contact form', async ({ page }) => {
    await page.locator('input[id="contact-name"]').fill('Nguyễn Văn Test');
    await page.locator('input[id="contact-phone"]').fill('0912345678');
    await page.locator('textarea[id="contact-content"]').fill('Tôi cần tư vấn vận chuyển VLXD cho dự án xây dựng.');
    await page.locator('button[type="submit"]').first().click();
    await expect(page.getByText(/gửi thành công/i)).toBeVisible({ timeout: 8000 });
  });
});

test.describe('Partner Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/doi-tac#form');
    await page.waitForSelector('#form form', { timeout: 10000 });
    await page.waitForTimeout(300);
  });

  test('shows fullName error on empty submit', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/vui lòng nhập họ tên/i)).toBeVisible();
  });

  test('shows phone validation error', async ({ page }) => {
    await page.locator('input[id="partner-phone"]').fill('123');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/số điện thoại không hợp lệ/i)).toBeVisible();
  });

  test('successfully submits partner form', async ({ page }) => {
    await page.locator('input[id="partner-name"]').fill('Nguyễn Tài Xế');
    await page.locator('input[id="partner-phone"]').fill('0987654321');
    await page.locator('select[id="partner-vehicle"]').selectOption('5T');
    await page.locator('input[id="partner-area"]').fill('Hà Nội, Hưng Yên');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/đăng ký thành công/i)).toBeVisible({ timeout: 8000 });
  });
});

test.describe('Job Application Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tuyen-dung#apply-form');
    await page.waitForSelector('#apply-form form', { timeout: 10000 });
    await page.waitForTimeout(300);
  });

  test('shows error for invalid email', async ({ page }) => {
    await page.locator('input[id="job-email"]').fill('not-valid-email');
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/email không hợp lệ/i)).toBeVisible();
  });

  test('shows fullName error on empty submit', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/vui lòng nhập họ tên/i)).toBeVisible();
  });

  test('successfully submits job application', async ({ page }) => {
    await page.locator('input[id="job-name"]').fill('Lê Thị Ứng Viên');
    await page.locator('input[id="job-phone"]').fill('0901234567');
    await page.locator('input[id="job-email"]').fill('ung.vien@example.com');
    await page.locator('select[id="job-title"]').selectOption({ index: 1 });
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText(/hồ sơ đã được gửi/i)).toBeVisible({ timeout: 8000 });
  });
});
