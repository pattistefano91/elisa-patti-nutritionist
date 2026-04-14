import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Smoke — Home page', () => {
  test('carica con lang="it"', async ({ page }) => {
    await page.goto('/')
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBe('it')
  })

  test('font Cormorant Garamond caricato', async ({ page }) => {
    await page.goto('/')
    const loaded = await page.evaluate(() =>
      document.fonts.check('500 16px Cormorant Garamond'),
    )
    expect(loaded).toBe(true)
  })

  test('CTA primario visibile', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByTestId('cta-primary')
    await expect(cta).toBeVisible()
  })

  test('zero violazioni WCAG AA (axe)', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})
