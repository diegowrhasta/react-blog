import '@testing-library/jest-dom/vitest'

import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'

// Establishing API mocking before all tests
beforeAll(() => server.listen())

beforeEach(() => {
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
})

// Reset any request handlers that we may add during the tests,
// so that they don't affect other tests
afterEach(() => server.resetHandlers())
afterEach(() => {
  vi.unstubAllGlobals()
})

// Clean up after the tests are finished
afterAll(() => server.close())
