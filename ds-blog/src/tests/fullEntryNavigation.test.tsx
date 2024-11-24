import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from 'src/App'

beforeAll(() => {
  vi.stubGlobal('scrollTo', () => {}) // Raises warning since window.scrollTo is not available
})

test('full navigation to specific entry works and has accesibility', async () => {
  const user = userEvent.setup()
  render(<App />)

  let firstEntryElements = screen.getAllByRole('article', {
    name: /Software, Pragmatism and Epistemology/i
  })
  expect(firstEntryElements).toHaveLength(2)

  const [recentBlogsElement] = firstEntryElements

  await user.click(recentBlogsElement)
  let loading = screen.getByRole('status', { name: /Post loading/i })
  expect(loading).toBeInTheDocument()

  let loadedEntry = await screen.findByRole('article', {
    name: /Software, Pragmatism and Epistemology/i
  })
  expect(loadedEntry).toBeInTheDocument()

  let imageEntries = screen.getAllByRole('img')
  expect(imageEntries).toHaveLength(3)

  const homeButton = screen.getByRole('link', { name: /Home/i })
  await user.click(homeButton)

  firstEntryElements = screen.getAllByRole('article', {
    name: /Software, Pragmatism and Epistemology/i
  })
  expect(firstEntryElements).toHaveLength(2)

  const [, allBlogsElement] = firstEntryElements
  await user.click(allBlogsElement)
  loading = screen.getByRole('status', { name: /Post Loading/i })
  expect(loading).toBeInTheDocument()

  loadedEntry = await screen.findByRole('article', {
    name: /Software, Pragmatism and Epistemology/i
  })
  expect(loadedEntry).toBeInTheDocument()

  imageEntries = screen.getAllByRole('img')
  expect(imageEntries).toHaveLength(3)
})
