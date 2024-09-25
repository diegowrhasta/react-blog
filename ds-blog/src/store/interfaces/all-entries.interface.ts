import { EntryInterface } from '../../data'

export interface AllEntriesInterface {
  allEntries: EntryInterface[]
  currentPageEntries: EntryInterface[]
  currentPage: number
  calculatingNewPage: boolean
  updateAllEntries: (
    entries: EntryInterface[],
    currentPageEntries: EntryInterface[],
    currentPage: number
  ) => void
  updateNewPageCalculation: (selectedPage: number) => void
  updateCurrentPageState: (
    currentPageEntries: EntryInterface[],
    currentPage: number
  ) => void
}
