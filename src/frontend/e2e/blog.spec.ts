import { test, expect } from '@playwright/test';
import { POSTS } from '../lib/data';

test.describe('Blog — list page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tin-tuc');
    await page.waitForLoadState('networkidle');
  });

  test('renders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/tin tức/i);
  });

  test('renders all 4 category filter tabs', async ({ page }) => {
    await expect(page.getByRole('button', { name: /tất cả/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /tin công ty/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /tin thị trường/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /logistics/i })).toBeVisible();
  });

  test('renders correct number of post cards', async ({ page }) => {
    const cards = page.locator('a[href^="/tin-tuc/"]');
    await expect(cards).toHaveCount(POSTS.length);
  });

  test('filters posts by "Tin công ty" category', async ({ page }) => {
    await page.getByRole('button', { name: /tin công ty/i }).click();
    const expected = POSTS.filter((p) => p.category === 'company').length;
    const cards = page.locator('a[href^="/tin-tuc/"]');
    await expect(cards).toHaveCount(expected);
  });

  test('clicking a post navigates to its detail page', async ({ page }) => {
    const firstPost = POSTS[0];
    await page.getByRole('link', { name: firstPost.title }).first().click();
    await expect(page).toHaveURL(`/tin-tuc/${firstPost.slug}`);
  });
});

test.describe('Blog — detail page', () => {
  const post = POSTS[0];

  test.beforeEach(async ({ page }) => {
    await page.goto(`/tin-tuc/${post.slug}`);
    await page.waitForLoadState('networkidle');
  });

  test('renders post title in h1', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText(post.title);
  });

  test('renders post excerpt in lead section', async ({ page }) => {
    // Use partial excerpt match (first 30 chars) to handle line wrapping
    const excerpt = post.excerpt.slice(0, 30);
    await expect(page.locator('body')).toContainText(excerpt);
  });

  test('renders "Tin tức" breadcrumb link', async ({ page }) => {
    const tinTucLinks = page.getByRole('link', { name: /^tin tức$/i });
    await expect(tinTucLinks.first()).toBeVisible();
  });

  test('renders "Quay lại danh sách" link', async ({ page }) => {
    await expect(page.getByRole('link', { name: /quay lại danh sách/i })).toBeVisible();
  });

  test('renders category badge', async ({ page }) => {
    await expect(page.getByText(post.categoryLabel).first()).toBeVisible();
  });

  test('shows contact form in sidebar', async ({ page }) => {
    await expect(page.getByText(/cần tư vấn/i)).toBeVisible();
  });

  test('returns 404 for unknown slug', async ({ page }) => {
    const response = await page.goto('/tin-tuc/slug-khong-ton-tai-xyz');
    expect(response?.status()).toBe(404);
  });
});
