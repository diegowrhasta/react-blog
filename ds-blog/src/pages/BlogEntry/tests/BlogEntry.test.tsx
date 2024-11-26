import { screen, render } from 'testing-library-utils'

import { BlogEntry } from '../BlogEntry'
import { useBlogDetailStore } from 'src/store'
import { Route, Routes } from 'react-router-dom'

beforeEach(() => {
  useBlogDetailStore
    .getState()
    .triggerRouting('70e2c51a-f70f-4df5-9cb8-bc4b88260888')
})

beforeEach(() => {
  vi.stubGlobal('scrollTo', () => {}) // Raises warning since window.scrollTo is not available
})

test('page has accesible and navigable properties', () => {
  render(<BlogEntry />)

  const sidebarRegion = screen.getByRole('region', {
    name: /Recent entries sidebar/i
  })
  const postContentRegion = screen.getByRole('region', {
    name: /Post Content/i
  })
  expect(sidebarRegion).toBeInTheDocument()
  expect(postContentRegion).toBeInTheDocument()
})

test('uninitialized store fallsback to route param', async () => {
  useBlogDetailStore.getState().reset()
  const mockedParam = '70e2c51a-f70f-4df5-9cb8-bc4b88260888'

  render(
    <Routes>
      <Route path='/entry/:id' element={<BlogEntry />}></Route>
    </Routes>,
    {
      routerProps: { initialEntries: [`/entry/${mockedParam}`] }
    }
  )

  const sidebarRegion = screen.getByRole('region', {
    name: /Recent entries sidebar/i
  })
  const postContentRegion = screen.getByRole('region', {
    name: /Post Content/i
  })
  expect(sidebarRegion).toBeInTheDocument()
  expect(postContentRegion).toBeInTheDocument()

  const loadedPost = await screen.findByRole('article', {
    name: /Software, Pragmatism and Epistemology/i
  })
  expect(loadedPost).toBeInTheDocument()
})
