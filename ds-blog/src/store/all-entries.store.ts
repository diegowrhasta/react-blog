import { create } from 'zustand'
import { type AllEntriesInterface } from './types'
import { type EntryInterface } from '../data/entry.interface'

const useAllEntriesStore = create<AllEntriesInterface>(set => {
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
    }
  }
})

export { useAllEntriesStore }
