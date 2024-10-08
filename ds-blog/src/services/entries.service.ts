import { EntryInterface, getData } from '../data'
import * as entriesUtils from '../utils/entries'

const INITIAL_PAGE = 1

function loadEntries (
  updateAllEntries: (
    entries: EntryInterface[],
    currentPageEntries: EntryInterface[],
    currentPage: number
  ) => void
) {
  const entryData = getData()!.sortEntriesDesc()
  const currentPageEntries = entriesUtils.getPageEntries(entryData, INITIAL_PAGE)

  updateAllEntries(entryData, currentPageEntries, INITIAL_PAGE)
}

export { loadEntries }
