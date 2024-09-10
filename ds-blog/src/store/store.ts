import { createStore, withProps } from '@ngneat/elf'

import { AllEntriesInterface, TitleInterface } from './interfaces'
import { EntryInterface } from '../data'

const titleInitialState: TitleInterface = {
  title: undefined
} as const

const allEntrisInitialState: AllEntriesInterface = {
  allEntries: undefined,
  currentPageEntries: undefined,
  currentPage: undefined,
  calculatingNewPage: false
} as const

export const titleStore = createStore(
  { name: 'title' },
  withProps<TitleInterface>(titleInitialState)
)

export const allEntriesStore = createStore(
  { name: 'all-entries' },
  withProps<AllEntriesInterface>(allEntrisInitialState)
)

export function updateTitle (title: string) {
  titleStore.update(state => ({
    ...state,
    title: title
  }))
}

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
