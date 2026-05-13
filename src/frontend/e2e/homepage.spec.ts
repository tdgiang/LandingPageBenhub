import { test, expect } from '@playwright/test';

test.describe('Homepage — section visibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('hero headline is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('hero CTA buttons are present', async ({ page }) => {
    const ctaPrimary = page.getByRole('link', { name: /liên hệ tư vấn ngay/i });
    await expect(ctaPrimary).toBeVisible();
    const ctaSecondary = page.getByRole('link', { name: /trở thành đối tác tài xế/i });
    await expect(ctaSecondary).toBeVisible();
  });

  test('hero stats pills render', async ({ page }) => {
    await expect(page.getByText('500+')).toBeVisible();
    await expect(page.getByText('98%')).toBeVisible();
  });

  test('services section renders all 4 service titles', async ({ page }) => {
    // Scroll to trigger whileInView animations
    for (const title of ['Giao hàng VLXD', 'Điều phối xe tải', 'Dịch vụ bốc xếp', 'Giao ngoài giờ']) {
      const el = page.getByText(title).first();
      await el.scrollIntoViewIfNeeded();
      await expect(el).toBeVisible({ timeout: 5000 });
    }
  });

  test('process section has 4 step titles', async ({ page }) => {
    for (const title of ['Tạo yêu cầu', 'Điều phối xe', 'Giao hàng', 'Hoàn tất']) {
      const el = page.getByText(title).first();
      await el.scrollIntoViewIfNeeded();
      await expect(el).toBeVisible({ timeout: 5000 });
    }
  });

  test('contact section renders the form', async ({ page }) => {
    await page.goto('/#lien-he');
    await page.waitForTimeout(500);
    const formHeading = page.getByText(/gửi yêu cầu tư vấn/i).first();
    await formHeading.scrollIntoViewIfNeeded();
    await expect(formHeading).toBeVisible({ timeout: 5000 });
  });

  test('footer renders brand name', async ({ page }) => {
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toContainText('BENHUB', { timeout: 3000 });
  });

  test('scroll to top button appears after scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.getByRole('button', { name: /cuộn lên đầu trang/i })).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Homepage — stats countUp renders', () => {
  test('stats section shows key metric labels', async ({ page }) => {
    await page.goto('/');
    const statsSection = page.getByText(/khách hàng b2b/i).first();
    await statsSection.scrollIntoViewIfNeeded();
    await expect(statsSection).toBeVisible({ timeout: 5000 });
  });
});
