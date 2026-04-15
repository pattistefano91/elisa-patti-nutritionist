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

test.describe('Smoke — Sezione Contatti', () => {
  test('sezione contatti visibile con titolo "Contatti"', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Contatti').first()).toBeVisible()
  })

  test('link mailto: presente', async ({ page }) => {
    await page.goto('/')
    const emailLink = page.locator('a[href^="mailto:"]')
    await expect(emailLink).toBeVisible()
  })

  test('link tel: presente', async ({ page }) => {
    await page.goto('/')
    const telLink = page.locator('a[href^="tel:"]')
    await expect(telLink).toBeVisible()
  })
})

test.describe('Smoke — Sezione Servizi', () => {
  test('sezione servizi visibile con titolo "I Percorsi"', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('I Percorsi')).toBeVisible()
  })

  test('3 card con bottone "Prenota ora" (Visite di Controllo escluse)', async ({ page }) => {
    await page.goto('/')
    const prenotaButtons = page.getByRole('button', { name: /Prenota ora/i })
    await expect(prenotaButtons).toHaveCount(3)
  })

  test('banner "Non sai da dove iniziare?" visibile in fondo', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Non sai da dove iniziare?')).toBeVisible()
  })
})
