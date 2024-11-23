import { create } from 'zustand'
import {
  type AllEntriesStateInterface,
  type AllEntriesActionsInterface
} from './types'
import { type EntryInterface } from '../data/entry.interface'

const initialState: AllEntriesStateInterface = {
  allEntries: [],
  currentPageEntries: [],
  currentPage: 1,
  calculatingNewPage: false
} as const

const useAllEntriesStore = create<
  AllEntriesStateInterface & AllEntriesActionsInterface
>(set => {
  return {
    allEntries: [],
    currentPageEntries: [],
    currentPage: 1,
    calculatingNewPage: false,
    updateAllEntries: (
      entries: EntryInterface[],
      currentPageEntries: EntryInterface[],
      currentPage: number
    ) => {
      set({ allEntries: entries, currentPageEntries, currentPage })
    },
    updateNewPageCalculation: (selectedPage: number) => {
      set({ calculatingNewPage: true, currentPage: selectedPage })
    },
    updateCurrentPageState: (
      currentPageEntries: EntryInterface[],
      currentPage: number
    ) => {
      set({ currentPageEntries, currentPage, calculatingNewPage: false })
    },
    reset: () => {
      set(initialState)
    }
  }
})

export { useAllEntriesStore }
