import { getData } from 'src/data'
import { getConfig } from '../../services/config.service'

beforeEach(() => {
  vi.mock('../../services/config.service', () => ({
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
})
