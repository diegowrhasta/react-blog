import {
  render,
  screen,
  within,
  fireEvent,
  waitFor
} from 'testing-library-utils'
import { server } from 'src/mocks/server'
import { delay, http, HttpResponse } from 'msw'
import { readFile } from 'fs/promises'

import { BlogEntryDetail } from '../BlogEntryDetail'
import { updateBlogEntry } from 'src/data'

beforeEach(() => {
  vi.stubGlobal('scrollTo', () => {}) // Raises warning since window.scrollTo is not available
  server.resetHandlers()
})

afterEach(() => {
  server.restoreHandlers()
})

test('loading state and update work correctly', async () => {
  render(<BlogEntryDetail entryId='70e2c51a-f70f-4df5-9cb8-bc4b88260888' />)

  const loading = screen.getByRole('status', { name: /Post loading/i })
  expect(loading).toBeInTheDocument()

  const updatedContent = await screen.findByRole('article', {
    name: /Software, Pragmatism and Epistemology/i
  })
  expect(updatedContent).toBeInTheDocument()
  expect(loading).not.toBeInTheDocument()

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

test('blog entry with no images path works accordingly', async () => {
  server.use(
    http.get(
      '/blogs/2024/10/70e2c51a-f70f-4df5-9cb8-bc4b88260888.html',
      async () => {
        const filePath = 'src/test-utils/assets/no-tags.html'

        // Read the file content asynchronously
        const fileContent = await readFile(filePath, 'utf-8')

        await delay(400)
        return HttpResponse.html(fileContent)
      }
    )
  )

  render(<BlogEntryDetail entryId='70e2c51a-f70f-4df5-9cb8-bc4b88260888' />)
  const loading = screen.getByRole('status', { name: /Post loading/i })
  expect(loading).toBeInTheDocument()

  const updatedContent = await screen.findByRole('article', {
    name: /No Images Content/i
  })
  expect(updatedContent).toBeInTheDocument()
})

test('blog entry with a failing image and a valid image path works accordingly', async () => {
  server.use(
    http.get(
      '/blogs/2024/10/70e2c51a-f70f-4df5-9cb8-bc4b88260888.html',
      async () => {
        const filePath = 'src/test-utils/assets/valid-invalid-images.html'

        // Read the file content asynchronously
        const fileContent = await readFile(filePath, 'utf-8')

        await delay(400)
        return HttpResponse.html(fileContent)
      }
    )
  )

  render(<BlogEntryDetail entryId='70e2c51a-f70f-4df5-9cb8-bc4b88260888' />)
  const loading = screen.getByRole('status', { name: /Post loading/i })
  expect(loading).toBeInTheDocument()

  const updatedContent = await screen.findByRole('article', {
    name: /1 Valid, 1 Invalid Image/i
  })
  expect(updatedContent).toBeInTheDocument()

  const images = screen.getAllByRole('img') as HTMLImageElement[]
  expect(images).toHaveLength(2)

  // Mock the image load behavior manually
  images.forEach((img, index) => {
    // Mock the "complete" property of the image
    Object.defineProperty(img, 'complete', { value: index === 0 }) // 1st image loaded, 2nd image failed (for example)

    // Manually trigger the load or error event
    if (img.complete) {
      fireEvent.load(img) // Simulate successful load
    } else {
      fireEvent.error(img) // Simulate error for the failing image
    }
  })

  // Use waitFor to wait for async updates to occur after events are triggered
  await waitFor(() => expect(loading).not.toBeInTheDocument())
})

test('blog entry with two successful images path works accordingly', async () => {
  server.use(
    http.get(
      '/blogs/2024/10/70e2c51a-f70f-4df5-9cb8-bc4b88260888.html',
      async () => {
        const filePath = 'src/test-utils/assets/valid-invalid-images.html'

        // Read the file content asynchronously
        const fileContent = await readFile(filePath, 'utf-8')

        await delay(400)
        return HttpResponse.html(fileContent)
      }
    )
  )

  render(<BlogEntryDetail entryId='70e2c51a-f70f-4df5-9cb8-bc4b88260888' />)
  const loading = screen.getByRole('status', { name: /Post loading/i })
  expect(loading).toBeInTheDocument()

  const updatedContent = await screen.findByRole('article', {
    name: /1 Valid, 1 Invalid Image/i // Replace with expected updated content
  })
  expect(updatedContent).toBeInTheDocument()

  const images = screen.getAllByRole('img') as HTMLImageElement[]
  expect(images).toHaveLength(2)

  // Mock the image load behavior manually
  images.forEach(img => {
    // Mock the "complete" property of the image
    Object.defineProperty(img, 'complete', { value: true })

    // Manually trigger the load or error event
    if (img.complete) {
      fireEvent.load(img) // Simulate successful load
    } else {
      fireEvent.error(img) // Simulate error for the failing image
    }
  })

  // Use waitFor to wait for async updates to occur after events are triggered
  await waitFor(() => expect(loading).not.toBeInTheDocument())
})
