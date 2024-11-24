import { type EntryInterface } from '../data'

interface GlobalInterface {
  title: string | undefined
  scrollToBottom: boolean
  mode: modeType
  setTitle: (newTitle: string) => void
  setScrollToBottom: (scrollToBottom: boolean) => void
  setMode: (newMode: modeType) => void
}

interface AllEntriesStateInterface {
  allEntries: EntryInterface[]
  currentPageEntries: EntryInterface[]
  currentPage: number
  calculatingNewPage: boolean
}

interface AllEntriesActionsInterface {
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
  reset: () => void
}

interface BlogDetailStateInterface {
  blogId: string | undefined
  routing: boolean
}

interface BlogDetailActionsInterface {
  triggerRouting: (blogId: string) => void
  setEntryAsLoaded: () => void
  reset: () => void
}

type modeType = 'dark' | 'light'

export {
  GlobalInterface,
  AllEntriesStateInterface,
  AllEntriesActionsInterface,
  BlogDetailStateInterface,
  BlogDetailActionsInterface,
  modeType
}
