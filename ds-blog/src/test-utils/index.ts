import { DUMMY_ENTRY } from 'src/data'
import { useAllEntriesStore } from 'src/store'
import * as entriesUtils from 'src/utils/entries'

function seedStoreWithDummies (entriesNumber: number) {
  const data = Array(entriesNumber)
    .fill(null)
    .map(() => ({ ...DUMMY_ENTRY, id: entriesUtils.generateUUID() }))
  const entryData = data.sortEntriesDesc()
  const INITIAL_PAGE = 1
  const currentPageEntries = entriesUtils.getPageEntries(
    entryData,
    INITIAL_PAGE
  )
  const updateAllEntries = useAllEntriesStore.getState().updateAllEntries

  updateAllEntries(entryData, currentPageEntries, INITIAL_PAGE)
}

export { seedStoreWithDummies }
