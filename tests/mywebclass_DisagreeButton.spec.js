// @ts-check
const { test, expect } = require('@playwright/test')

test('Website should not use cookies after user disagrees', async ({ page }) => {
  // Navigate to your website
  await page.goto('http://localhost:3000')

  // Check if popup exists
  const popup = await page.$('.modal-content')
  expect(popup).not.toBeNull()

  // Click on the Disagree button
  const disagreeButton = await popup.$('#disagreeButton')
  expect(disagreeButton).not.toBeNull()
  await disagreeButton.click()

  // Wait for the cookie to be removed
  await page.waitForTimeout(1000)

  // Check if non-Google Analytics cookies are being used
  const cookies = await page.context().cookies()
  const nonGACookies = cookies.filter(cookie => !cookie.name.startsWith('_ga'))
  expect(nonGACookies.length).toBe(0)
})
