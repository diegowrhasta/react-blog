import { render, screen } from '@testing-library/react'

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
