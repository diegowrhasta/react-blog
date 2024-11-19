import { type EntryInterface } from '../data'

interface GlobalInterface {
  title: string | undefined
  scrollToBottom: boolean
  mode: modeType
  setTitle: (newTitle: string) => void
  setScrollToBottom: (scrollToBottom: boolean) => void
  setMode: (newMode: modeType) => void
}

interface AllEntriesInterface {
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

interface BlogDetailStateInterface {
  blogId: string | undefined
  routing: boolean
  detailLoading: boolean
}

interface BlogDetailActionsInterface {
  triggerRouting: (blogId: string) => void
  setEntryAsLoaded: () => void
  setDetailLoading: (isLoading: boolean) => void
  reset: () => void
}

type modeType = 'dark' | 'light'

export {
  GlobalInterface,
  AllEntriesInterface,
  BlogDetailStateInterface,
  BlogDetailActionsInterface,
  modeType
}
