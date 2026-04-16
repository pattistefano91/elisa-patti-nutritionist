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

test.describe('Smoke — Footer e Pagine Legali', () => {
  test('footer visibile in pagina', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toBeVisible()
  })

  test('link Privacy Policy nel footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer a[href="/privacy"]')).toBeVisible()
  })

  test('link Cookie Policy nel footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer a[href="/cookie-policy"]')).toBeVisible()
  })

  test('pagina /privacy risponde con titolo corretto', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page).toHaveTitle(/Privacy Policy/)
  })

  test('pagina /cookie-policy risponde con titolo corretto', async ({ page }) => {
    await page.goto('/cookie-policy')
    await expect(page).toHaveTitle(/Cookie Policy/)
  })

  // Nota: la presenza dello script Plausible (plausible.io/js/script.js) nel DOM
  // va verificata manualmente quando NEXT_PUBLIC_PLAUSIBLE_DOMAIN è impostata in Vercel
  // (non testabile in CI senza account reale)
})

test.describe('Smoke — Navbar', () => {
  test('navbar presente con aria-label corretto', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.locator('nav[aria-label="Navigazione principale"]'),
    ).toBeVisible()
  })

  test('link Chi sono visibile su desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav a[href="/about"]')).toBeVisible()
  })

  test('link Servizi visibile su desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav a[href="/servizi"]')).toBeVisible()
  })

  test('link Blog visibile su desktop', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav a[href="/blog"]')).toBeVisible()
  })

  test('pagina /about risponde con titolo corretto', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/Chi sono/)
  })

  test('pagina /servizi risponde con titolo corretto', async ({ page }) => {
    await page.goto('/servizi')
    await expect(page).toHaveTitle(/Servizi/)
  })

  test('pagina /blog risponde con titolo corretto', async ({ page }) => {
    await page.goto('/blog')
    await expect(page).toHaveTitle(/Blog/)
  })
})

test.describe('Smoke — Pagina Chi sono', () => {
  test('title corretto', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/Chi sono/)
  })

  test('foto Dott.ssa visibile', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('img[alt*="Elisa Patti"]')).toBeVisible()
  })

  test('nome Dott.ssa Elisa Patti visibile', async ({ page }) => {
    await page.goto('/about')
    await expect(
      page.getByRole('heading', { name: /Dott\.ssa Elisa Patti/ }),
    ).toBeVisible()
  })

  test('sezione filosofia visibile', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByText('La mia filosofia')).toBeVisible()
  })

  test('sezione formazione visibile', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByText('Formazione')).toBeVisible()
  })

  test('CTA "Prenota ora" presente', async ({ page }) => {
    await page.goto('/about')
    await expect(
      page.getByRole('button', { name: /Prenota ora/i }).first(),
    ).toBeVisible()
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
