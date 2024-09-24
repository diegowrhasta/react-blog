import { createStore, withProps } from '@ngneat/elf'

import { AllEntriesInterface } from './interfaces'
import { EntryInterface } from '../data'

const allEntrisInitialState: AllEntriesInterface = {
  allEntries: undefined,
  currentPageEntries: undefined,
  currentPage: undefined,
  calculatingNewPage: false
} as const

export const allEntriesStore = createStore(
  { name: 'all-entries' },
  withProps<AllEntriesInterface>(allEntrisInitialState)
)

export function updateAllEntriesStore (
  entries: EntryInterface[],
  currentPageEntries: EntryInterface[],
  currentPage: number
) {
  allEntriesStore.update(state => ({
    ...state,
    allEntries: entries,
    currentPageEntries: currentPageEntries,
    currentPage: currentPage
  }))
}

export function updateNewPageCalculation (selectedPage: number) {
  allEntriesStore.update(state => ({
    ...state,
    calculatingNewPage: true,
    currentPage: selectedPage
  }))
}

export function updateCurrentPageState (
  currentPageEntries: EntryInterface[],
  currentPage: number
) {
  allEntriesStore.update(state => ({
    ...state,
    currentPageEntries: currentPageEntries,
    currentPage: currentPage,
    calculatingNewPage: false
  }))
}
