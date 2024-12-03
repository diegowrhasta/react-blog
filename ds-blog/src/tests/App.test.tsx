import { render } from '@testing-library/react'
import { App } from 'src/App'
import { useGlobalStore } from 'src/store'

const scrollToMock = vi.fn()

beforeEach(() => {
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: scrollToMock
  })
  useGlobalStore.getState().setScrollToBottom(true)
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

test('scroll to bottom event is picked up and acted upon', () => {
  expect(useGlobalStore.getState().scrollToBottom).toBeTruthy()

  render(<App />)

  expect(useGlobalStore.getState().scrollToBottom).toBeFalsy()

  vi.advanceTimersByTime(50) // On the util module we have set a 50 ms delay
  expect(scrollToMock).toHaveBeenCalled()
})
