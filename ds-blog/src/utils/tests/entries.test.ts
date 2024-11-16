import { generateUUID } from '../entries'

test('generateUUID generates a correct value', () => {
  const dictionary = new Set()
  const uuids = Array(10)
    .fill(null)
    .map(() => generateUUID())

  uuids.forEach(value => {
    expect(dictionary).not.toContain(value)
    dictionary.add(value)
    expect(value).toHaveLength(36)
  })
})
