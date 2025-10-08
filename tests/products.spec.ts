// @ts-check
import { test, expect } from '@playwright/test';

const slugs = ['vizitky','letaky-prospekty','skladane-letaky','pvc-bannery','plexi-cedule'];

test.describe('products smoke', () => {
  for (const slug of slugs) {
    test(`product page ${slug} renders and has CTA`, async ({ page }) => {
      await page.goto(`/products/${slug}`);
      await expect(page).toHaveTitle(/PhotoBook Pro|Photobook Pro/i);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByRole('link', { name: /Konfigurovat/ })).toBeVisible();
    });
  }
});
