import { createStore, withProps } from '@ngneat/elf'

import { AllEntriesInterface, TitleInterface } from './interfaces'
import { EntryInterface } from '../data'
import { BlogsInterface } from './interfaces/blogs.interface'

const titleInitialState: TitleInterface = {
  title: undefined
} as const

const allEntrisInitialState: AllEntriesInterface = {
  allEntries: undefined,
  currentPageEntries: undefined,
  currentPage: undefined,
  calculatingNewPage: false
} as const

const blogsInitialState: BlogsInterface = {
  blogId: undefined,
  routing: false
} as const

export const titleStore = createStore(
  { name: 'title' },
  withProps<TitleInterface>(titleInitialState)
)

export const allEntriesStore = createStore(
  { name: 'all-entries' },
  withProps<AllEntriesInterface>(allEntrisInitialState)
)

export const blogStore = createStore(
  { name: 'blogs' },
  withProps<BlogsInterface>(blogsInitialState)
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

export function triggerEntryRouting (blogId: string) {
  blogStore.update(state => ({
    ...state,
    routing: true,
    blogId: blogId
  }))
}

export function updateEntryLoaded () {
  blogStore.update(state => ({
    ...state,
    routing: false
  }))
}
