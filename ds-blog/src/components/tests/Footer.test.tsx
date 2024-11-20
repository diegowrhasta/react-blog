import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Footer } from '../Footer'

test('footer on big screens has items in correct order', () => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Optional, for legacy support
    removeListener: vi.fn(), // Optional, for legacy support
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))

  render(<Footer />)

  const options = screen.getAllByRole('listitem')
  const linkOptions = screen.getAllByRole('link')
  const optionLabels = options.map(element => element.textContent)
  const linkLabels = linkOptions.map(element => element.textContent)
  expect(options).toHaveLength(3)
  expect(linkOptions).toHaveLength(2)
  expect(optionLabels).toEqual(['© 2024', 'LinkedIn', 'Email'])
  expect(linkLabels).toEqual(['LinkedIn', 'Email'])
})

test('footer on small screens has items in correct order', () => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Optional, for legacy support
    removeListener: vi.fn(), // Optional, for legacy support
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))

  render(<Footer />)

  const options = screen.getAllByRole('listitem')
  const linkOptions = screen.getAllByRole('link')
  const optionLabels = options.map(element => element.textContent)
  const linkLabels = linkOptions.map(element => element.textContent)
  expect(options).toHaveLength(3)
  expect(linkOptions).toHaveLength(2)
  expect(optionLabels).toEqual(['LinkedIn', 'Email', '© 2024'])
  expect(linkLabels).toEqual(['LinkedIn', 'Email'])
})

test('list items are navigable', async () => {
  const user = userEvent.setup()
  render(<Footer />)

  const linkedInLink = screen.getByRole('link', { name: /LinkedIn/i })
  await user.tab()
  expect(linkedInLink).toHaveFocus()

  const emailLink = screen.getByRole('link', { name: /Email/i })
  await user.tab()
  expect(emailLink).toHaveFocus()

  await user.tab()
  await user.tab({ shift: true })
  expect(emailLink).toHaveFocus()

  await user.tab({ shift: true })
  expect(linkedInLink).toHaveFocus()
})
