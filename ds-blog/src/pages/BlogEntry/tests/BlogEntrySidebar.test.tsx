import { screen, render } from 'testing-library-utils'

import { BlogEntrySidebar } from '../BlogEntrySidebar'
import { seedStoreWithDummies } from 'src/test-utils'
import { useAllEntriesStore } from 'src/store'

afterEach(() => {
  useAllEntriesStore.getState().reset()
})

test('shows only 5 entries tops filtering focused post', () => {
  seedStoreWithDummies(10)
  const focusedId = useAllEntriesStore.getState().allEntries[0].id

  const { unmount } = render(<BlogEntrySidebar entryId={focusedId} />)

  const sidebarRegion = screen.getByRole('region', {
    name: /Recent blog posts/i
  })
  expect(sidebarRegion).toBeInTheDocument()

  const posts = screen.getAllByRole('article')
  expect(posts).toHaveLength(5)

  posts.forEach(element => {
    const labelledBy = element.getAttribute('aria-labelledby')
    expect(labelledBy).not.toContain(focusedId)
  })
  unmount()
})

test('no entries at all shows placeholder text', () => {
  const { unmount } = render(<BlogEntrySidebar entryId='DUMMY-1' />)

  const sidebarRegion = screen.getByRole('region', {
    name: /Recent blog posts/i
  })
  expect(sidebarRegion).toBeInTheDocument()

  const placeholderText = screen.getByRole('status')
  const posts = screen.queryAllByRole('article')
  expect(posts).toHaveLength(0)
  expect(placeholderText).toBeInTheDocument()
  expect(placeholderText.textContent).toContain('No more entries available...')
  unmount()
})

test('one entry store should show placeholder text', () => {
  seedStoreWithDummies(1)
  const focusedId = useAllEntriesStore.getState().allEntries[0].id

  const { unmount } = render(<BlogEntrySidebar entryId={focusedId} />)

  const sidebarRegion = screen.getByRole('region', {
    name: /Recent blog posts/i
  })
  expect(sidebarRegion).toBeInTheDocument()

  const placeholderText = screen.getByRole('status')
  const posts = screen.queryAllByRole('article')
  expect(posts).toHaveLength(0)
  expect(placeholderText).toBeInTheDocument()
  expect(placeholderText.textContent).toContain('No more entries available...')
  unmount()
})
