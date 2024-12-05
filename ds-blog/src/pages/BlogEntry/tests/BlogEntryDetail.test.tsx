import { render, screen, within } from 'testing-library-utils'

import { BlogEntryDetail } from '../BlogEntryDetail'

beforeAll(() => {
  vi.stubGlobal('scrollTo', () => {}) // Raises warning since window.scrollTo is not available
})

test('loading state and update work correctly', async () => {
  render(<BlogEntryDetail entryId='70e2c51a-f70f-4df5-9cb8-bc4b88260888' />)

  const loading = screen.getByRole('status', { name: /Post loading/i })
  expect(loading).toBeInTheDocument()

  const updatedContent = await screen.findByRole('article', {
    name: /Software, Pragmatism and Epistemology/i // Replace with expected updated content
  })
  expect(updatedContent).toBeInTheDocument()

  const tagsSection = screen.getByLabelText(/Tags/i)
  const tagElements = within(tagsSection).getAllByText(
    (_, element) => element?.tagName === 'SPAN'
  )
  expect(tagsSection).toBeInTheDocument()
  expect(tagElements).toHaveLength(2)
})
