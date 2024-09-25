import { EntryInterface } from '../../data'

export interface AllEntriesInterface {
  allEntries: EntryInterface[] | undefined
  currentPageEntries: EntryInterface[] | undefined
  currentPage: number | undefined
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
