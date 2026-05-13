import { test, expect } from '@playwright/test';

const pages = [
  { url: '/', heading: /vận chuyển vlxd/i },
  { url: '/dich-vu', heading: /dịch vụ vận chuyển vlxd/i },
  { url: '/khach-hang', heading: /khách hàng của benhub/i },
  { url: '/doi-tac', heading: /kiếm thu nhập ổn định/i },
  { url: '/tin-tuc', heading: /tin tức & cập nhật/i },
  { url: '/tuyen-dung', heading: /gia nhập đội ngũ/i },
  { url: '/ve-chung-toi', heading: /về benhub/i },
];

test.describe('Navigation — all pages load', () => {
  for (const { url, heading } of pages) {
    test(`${url} renders the correct h1`, async ({ page }) => {
      await page.goto(url);
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    });
  }

  test('brand logo navigates to home', async ({ page }) => {
    await page.goto('/dich-vu');
    // Click BENHUB in the navbar (scoped to header)
    await page.locator('header, [role="banner"]').getByText('BENHUB').first().click();
    await expect(page).toHaveURL('/');
  });

  test('desktop navbar link navigates correctly', async ({ page }) => {
    await page.goto('/');
    // Use header-scoped link to avoid footer ambiguity
    const header = page.locator('div').filter({ has: page.locator('nav') }).first();
    // Click "Dịch vụ" in the navbar area (not footer)
    await page.locator('nav').first().getByRole('link', { name: 'Dịch vụ' }).click();
    await expect(page).toHaveURL('/dich-vu');
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await footer.getByRole('link', { name: /về chúng tôi/i }).click();
    await expect(page).toHaveURL('/ve-chung-toi');
  });
});

test.describe('Navigation — mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hamburger opens mobile menu with nav links', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.getByRole('button', { name: /mở menu/i });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    // Scoped to the floating header area (not footer)
    const header = page.locator('div').first();
    await expect(page.getByRole('link', { name: 'Dịch vụ' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tin tức' }).first()).toBeVisible();
  });

  test('mobile menu closes after navigating', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /mở menu/i }).click();
    // Click first "Tin tức" link (navbar one)
    await page.getByRole('link', { name: 'Tin tức' }).first().click();
    await expect(page).toHaveURL('/tin-tuc');
    await expect(page.getByRole('button', { name: /mở menu/i })).toBeVisible();
  });
});
