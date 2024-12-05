import { render, screen, within } from 'testing-library-utils'

import { BlogEntryDetail } from '../BlogEntryDetail'
import { updateBlogEntry } from 'src/data'

beforeEach(() => {
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

test('no labels are coalesced correctly', async () => {
  const testId = '70e2c51a-f70f-4df5-9cb8-bc4b88260888'
  updateBlogEntry(testId, 'labels', undefined)

  render(<BlogEntryDetail entryId={testId} />)

  const tagsSection = await screen.findByLabelText(/Tags/i)
  const tagElements = within(tagsSection).queryAllByText(
    (_, element) => element?.tagName === 'SPAN'
  )
  expect(tagsSection).toBeInTheDocument()
  expect(tagElements).toHaveLength(0)
})
