import { getData } from 'src/data'
import { getConfig } from '../../services'

beforeEach(() => {
  vi.mock('../../services', () => ({
    getConfig: vi.fn()
  }))
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('mock data flag executes random data generation', async () => {
  vi.mocked(getConfig).mockReturnValue({ mockMode: true, initialized: true })

  const result = getData()
  const flagEntry = result?.find(x => x.previewText === 'RDR2 is the best')
  expect(flagEntry).toBeTruthy()
  expect(result?.length).toBeGreaterThan(1)
})
