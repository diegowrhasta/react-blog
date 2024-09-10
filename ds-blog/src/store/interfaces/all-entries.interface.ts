import { EntryInterface } from '../../data'

export interface AllEntriesInterface {
  allEntries: EntryInterface[] | undefined
  currentPageEntries: EntryInterface[] | undefined
  currentPage: number | undefined
  calculatingNewPage: boolean
}
