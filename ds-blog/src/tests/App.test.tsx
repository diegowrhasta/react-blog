import { render, waitFor } from '@testing-library/react'
import { App } from 'src/App'
import { useGlobalStore } from 'src/store'

beforeEach(() => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: vi.fn()
  })
  useGlobalStore.getState().setScrollToBottom(true)
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('scroll to bottom event is picked up and acted upon', async () => {
  expect(useGlobalStore.getState().scrollToBottom).toBeTruthy()

  render(<App />)

  await waitFor(() => {
    expect(useGlobalStore.getState().scrollToBottom).toBeFalsy()
  })
})
